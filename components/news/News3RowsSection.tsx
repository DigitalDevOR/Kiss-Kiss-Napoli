import { getNewsData } from "@/lib/wp";
import NewsCarouselClient from "./NewsCarousel/NewsCarousel.client";

export default async function News3RowsSection() {

    const newsData = await getNewsData(3, 12);

    return (
       <div className="w-full flex flex-col gap-2 mt-5">
            {newsData.map((news, index) => (
                <NewsCarouselClient
                key={news.id}
                newsData={[news]}
                reverse={index % 2 === 1}
                />
            ))}
        </div>
    )


}