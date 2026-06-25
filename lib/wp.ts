import { OnAirResponse } from "@/hooks/useOnAirPolling";
const BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://kisskissnapoli.it/';

export async function getOnAirData(): Promise<OnAirResponse> {
  const response = await fetch(`${BASE_URL}/wp-json/customApi/v1/on-air`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Errore API on-air: ${response.status}`);
  }

  return response.json();
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
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
    "wp:term"?: WpCategory[][];
  };
};


export async function getNewsData(newsForPage: number = 6, offset: number = 0) {
  try {
    const response = await fetch(`${BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=${newsForPage}&offset=${offset}&orderby=date&order=desc`);
    if (!response.ok) {
      throw new Error(`Errore API WordPress: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
  
}