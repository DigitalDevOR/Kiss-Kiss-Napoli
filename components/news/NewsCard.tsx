import Image from "next/image";
import { NewsData } from "@/lib/wp";

type NewsCardProps = {
  newsTitle?: string;
  news?: NewsData;
  slug?: string;
  priority?: boolean;
};

async function imageExists(url?: string) {
  if (!url || url === "#") return false;

  try {
    const res = await fetch(url, {
      method: "HEAD",
      cache: "force-cache",
    });

    return res.ok;
  } catch {
    return false;
  }
}

async function getBestImageUrl(news?: NewsData) {
  const media = news?._embedded?.["wp:featuredmedia"]?.[0];
  const graph = news?.yoast_head_json?.schema?.["@graph"] || [];

  const article = graph.find((x) => x["@type"] === "Article");
  const imageObject = graph.find((x) => x["@type"] === "ImageObject");

  const candidates = [
    media?.media_details?.sizes?.full?.source_url,
    media?.source_url,
    media?.media_details?.sizes?.audioigniter_cover?.source_url,
    media?.media_details?.sizes?.medium?.source_url,
    media?.media_details?.sizes?.thumbnail?.source_url,
    media?.media_details?.sizes?.["voting-image"]?.source_url,
    news?.yoast_head_json?.og_image?.[0]?.url,
    article?.thumbnailUrl,
    imageObject?.url,
    imageObject?.contentUrl,
  ].filter(Boolean) as string[];

  const unique = [...new Set(candidates)];
  const results = await Promise.all(unique.map(imageExists));
  return unique.find((_, i) => results[i]) ?? null;
}

export default async function NewsCard({
  newsTitle = "title",
  news,
  slug = "",
  priority = false,
}: NewsCardProps) {
  const imageUrl = await getBestImageUrl(news);

  return (
    <div className="lg:w-56.75 lg:h-61.75 w-[326px] h-[355px] lg:py-3.5 lg:px-2.5 px-5 py-2.5 bg-white rounded-[10px] flex flex-col gap-2.5 justify-start items-center hover:scale-102 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm">
      {imageUrl && (
        <div className="relative w-full h-full lg:max-w-51.25 lg:max-h-28.75 max-w-73.5 max-h-41.25 overflow-hidden rounded-[10px] bg-gray-300">
          <Image
            src={imageUrl}
            alt={slug || "News Image"}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 326px, 228px"
            className="object-cover"
          />
        </div>
      )}

      <div className="w-full flex items-center">
        <h3
          className="text-[15px] font-bold lg:line-clamp-4"
          dangerouslySetInnerHTML={{ __html: newsTitle }}
        />
      </div>
    </div>
  );
}