import Image from "next/image";
import { NewsData, getBestNewsCover } from "@/lib/wp";
import { getInnerHTML } from "@/lib/utils";

type LatestNewsCardProps = {
  news: NewsData;
};

export default async function LatestNewsCard({
  news,
}: LatestNewsCardProps) {
  const coverUrl = await getBestNewsCover(news);

  if (!coverUrl) {
    return null;
  }

  return (
    <div className="min-w-66.5 h-72 rounded-[10px] shadow-md overflow-hidden">
      <div className="w-full flex flex-col">
        {/* NewsCover */}
        <div className="w-full h-[145px] bg-gray-200">
          <Image
            src={coverUrl}
            alt={`Copertina della news ${news.title.rendered}`}
            width={266}
            height={145}
            className="object-cover w-full h-full"
          />
        </div>

        <div
          className="w-full flex items-center justify-center mt-2"
          aria-hidden="true"
        >
          <div className="w-8 border border-[var(--color-primary)]" />
        </div>

        {/* NewsTitle */}
        <div className="w-full lg:pt-3 flex justify-start px-2">
          <span
            className="font-bold text-[15px] text-[#1A1A1A] line-clamp-4"
            dangerouslySetInnerHTML={getInnerHTML(news.title.rendered)}
          />
        </div>
      </div>
    </div>
  );
}