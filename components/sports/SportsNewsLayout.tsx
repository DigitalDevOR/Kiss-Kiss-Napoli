import ClassificaSerieA from "../widgets/ClassificaSerieA/ClassificaSerieA";
import NewsCard from "../news/NewsCard";
import NewsGrid from "../news/NewsGrid";

export default function SportsNewsLayout({ children }: { children?: React.ReactNode }) {
    return (
        <div className="w-full flex lg:flex-row flex-col lg:gap-6.5 gap-14.5 lg:mt-5.75 mt-14.5">
            <NewsGrid />
            <ClassificaSerieA />
        </div>
    )
}