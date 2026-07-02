import LatestNewsCard from "./LatestNewsCard";
import { getNewsData } from "@/lib/wp";

export default async function LatestNewsSlider() {

    const newsDataResponse = await getNewsData(6, 6);

    return (
        <div className="w-full flex gap-3 justify-start mt-8 overflow-x-scroll">
            {newsDataResponse.map((news) => (
                <LatestNewsCard key={news.id} news={news} />
            ))}
        </div>
        
    )
}