import ClassificaSerieA from "@/components/widgets/ClassificaSerieA/ClassificaSerieA";
import NewsCarouselServer from "@/components/news/NewsCarousel/NewsCarousel.server";
import SportsNewsLayout from "@/components/sports/SportsNewsLayout";

export default function Home() {
  return (
    <div className="w-100vw min-h-screen bg-primary-background lg:mt-0 text-black pt-[167px] lg:pt-[246px] flex justify-center">
      <section className="w-full lg:max-w-250 max-w-81.5 ">
        <NewsCarouselServer />
        <SportsNewsLayout/>
      </section>
    </div>
  );
}
