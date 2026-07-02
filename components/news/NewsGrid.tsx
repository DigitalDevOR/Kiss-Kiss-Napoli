import NewsCard from "./NewsCard";
import { getNewsData, NewsData } from "@/lib/wp";

export default async function NewsGrid() {
  const newsData: NewsData[] = await getNewsData();

  return (
    <div className="w-full grid lg:grid-cols-3 justify-between gap-x-2.5 gap-y-2.5 h-fit">
      {newsData.map((news, index) => (
        <NewsCard
          key={news.id}
          news={news}
          newsTitle={news.title.rendered}
          slug={news.slug}
          priority={index === 0}
        />
      ))}
    </div>
  );
}