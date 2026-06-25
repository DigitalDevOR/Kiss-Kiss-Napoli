import NewsCarouselClient from "./NewsCarousel.client";
import { getNewsData } from "@/lib/wp";

export default async function NewsCarouselServer(){
   
    const newsDataResponse = await getNewsData();

    return <NewsCarouselClient newsData={newsDataResponse} />;
}