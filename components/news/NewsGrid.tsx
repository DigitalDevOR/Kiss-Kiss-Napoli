import NewsCard from "./NewsCard";
import { getNewsData } from "@/lib/wp";
import {NewsData} from "@/lib/wp";            

export default async function NewsGrid() {

    const newsData: NewsData[] = await getNewsData();
    
    return (
        <div className="w-full grid lg:grid-cols-3 justify-between  gap-x-2.5 gap-y-2.5 h-fit">
            {newsData.map((news, index) => (
                <NewsCard key={news.id} newsTitle={news.title.rendered} imageUrl={news._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.png"} slug={news.slug} />
            ))}
        </div>
    );
}
