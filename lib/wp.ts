import { OnAirResponse } from "@/hooks/useOnAirPolling";
const BASE_URL = (process.env.NEXT_PUBLIC_WP_API_URL || 'https://kisskissnapoli.it').replace(/\/$/, '');

async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      next: { revalidate: 86400 },
    });

    const contentType = res.headers.get("content-type");

    return res.ok && !!contentType && contentType.startsWith("image/");
  } catch {
    return false;
  }
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim();
}

function extractProgramma(programma: any): ProgrammaData {
  const graph = programma?.yoast_head_json?.schema?.["@graph"] || [];

  const webPage = graph.find((item: any) => item["@type"] === "WebPage");
  const imageObject = graph.find((item: any) => item["@type"] === "ImageObject");
  const organization = graph.find((item: any) => item["@type"] === "Organization");

  return {
    id: programma.id,
    title: programma.title?.rendered || "",
    slug: programma.slug || "",
    link: programma.link || "",
    description:
      stripHtml(programma.excerpt?.rendered) ||
      stripHtml(programma.content?.rendered) ||
      programma.yoast_head_json?.og_description ||
      "",
    caption:
      imageObject?.caption ||
      organization?.logo?.caption ||
      undefined,
    images: {
      featuredMediaId: programma.featured_media || undefined,
      featured: programma._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
      og: programma.yoast_head_json?.og_image?.[0]?.url,
      thumbnail: webPage?.thumbnailUrl,
      imageObject: imageObject?.url,
      imageObjectContent: imageObject?.contentUrl,
      logo: organization?.logo?.url,
    },
  };
}

export function normalizeWebRadios(
  data: WordpressWebRadio[]
): WebRadio[] {
  return data.map((item) => ({
    name: item.title.rendered,
    image:
      item.yoast_head_json?.og_image?.[0]?.url ??
      item.yoast_head_json?.schema?.["@graph"]?.find(
        (el) => el["@type"] === "ImageObject"
      )?.url ??
      null,
  }));
}

export type WpCategory = {
  id: number;
  name: string;
  slug: string;
  taxonomy: "category" | string;
};

export type NewsData = {
  id: number;
  date: string;
  slug: string;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  yoast_head_json?: {
    og_image?: {
      url: string;
      width?: number;
      height?: number;
      type?: string;
    }[];

    schema?: {
      "@graph"?: {
        "@type": string;
        url?: string;
        contentUrl?: string;
        thumbnailUrl?: string;
      }[];
    };
  };

  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];

    "wp:term"?: WpCategory[][];
  };
};

export type FeaturedMedia = {
  source_url?: string;

  media_details?: {
    sizes?: {
      full?: MediaSize;
      medium?: MediaSize;
      thumbnail?: MediaSize;
      audioigniter_cover?: MediaSize;
      "voting-image"?: MediaSize;

      // nel caso WordPress aggiunga altri formati
      [key: string]: MediaSize | undefined;
    };
  };
};

export type MediaSize = {
  source_url?: string;
  width?: number;
  height?: number;
  mime_type?: string;
};

export type ProgrammaData = {
  id: number;
  title: string;
  slug: string;
  link: string;
  description: string;
  caption?: string;
  images: {
    featuredMediaId?: number;
    featured?: string;
    og?: string;
    thumbnail?: string;
    imageObject?: string;
    imageObjectContent?: string;
    logo?: string;
  };
};

export interface WordpressWebRadio {
  id: number;
  title: {
    rendered: string;
  };
  yoast_head_json?: {
    og_image?: Array<{
      url: string;
    }>;
    schema?: {
      "@graph"?: Array<{
        "@type": string;
        url?: string;
      }>;
    };
  };
}

export interface WebRadio {
  name: string;
  image: string | null;
}

export async function getOnAirData(): Promise<OnAirResponse> {
  const response = await fetch(`${BASE_URL}/wp-json/customApi/v1/on-air`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Errore API on-air: ${response.status}`);
  }

  return response.json();
}

export async function getNewsData(newsForPage: number = 6, offset: number = 0): Promise<NewsData[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=${newsForPage}&offset=${offset}&orderby=date&order=desc`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error(`Errore API WordPress: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getAllProgrammiData(): Promise<ProgrammaData[]> {
  const baseUrl = `${BASE_URL}/wp-json/wp/v2/programmi`;
  const perPage = 100;

  const firstRes = await fetch(
    `${baseUrl}?per_page=${perPage}&page=1&_embed=1`,
    { next: { revalidate: 3600 } }
  );

  if (!firstRes.ok) {
    throw new Error(`Errore programmi page 1: ${firstRes.status}`);
  }

  const totalPages = Number(firstRes.headers.get("X-WP-TotalPages") || 1);
  const firstPage = await firstRes.json();

  const otherPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, async (_, index) => {
      const page = index + 2;

      const res = await fetch(
        `${baseUrl}?per_page=${perPage}&page=${page}&_embed=1`,
        { next: { revalidate: 3600 } }
      );

      if (!res.ok) {
        throw new Error(`Errore programmi page ${page}: ${res.status}`);
      }

      return res.json();
    })
  );

  return [...firstPage, ...otherPages.flat()].map(extractProgramma);
}

export async function getBestProgrammaCover(
  programma: ProgrammaData
): Promise<string | undefined> {
  const candidates = [
    programma.images.featured,
    programma.images.og,
    programma.images.imageObjectContent,
    programma.images.imageObject,
    programma.images.thumbnail,
    programma.images.logo,
  ].filter(Boolean) as string[];

  const results = await Promise.all(candidates.map(isValidImageUrl));
  return candidates.find((_, i) => results[i]);
}

export async function getBestNewsCover(
  news: NewsData
): Promise<string | undefined> {
  const media =
    typeof news._embedded === "object"
      ? news._embedded?.["wp:featuredmedia"]?.[0]
      : undefined;

  const yoast =
    typeof news.yoast_head_json === "object"
      ? news.yoast_head_json
      : undefined;

  const candidates = [
    media?.media_details?.sizes?.large?.source_url,
    media?.media_details?.sizes?.medium_large?.source_url,
    media?.source_url,
    yoast?.og_image?.[0]?.url,
  ].filter((url): url is string => Boolean(url));

  const results = await Promise.all(candidates.map(isValidImageUrl));
  return candidates.find((_, i) => results[i]);
}

export async function getWebRadioList(
  perPage: number = 100,
  page: number = 1
): Promise<WebRadio[]> {
  const baseUrl = `${BASE_URL}/wp-json/wp/v2/webradio?per_page=${perPage}&page=${page}`;

  const response = await fetch(baseUrl, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(`Errore API WordPress: ${response.status}`);
  }

  return normalizeWebRadios(await response.json());

}