import NewsCarouselServer from "@/components/news/NewsCarousel/NewsCarousel.server";
import SportsNewsLayout from "@/components/sports/SportsNewsLayout";
import ProgrammiSection from "@/components/programmi/ProgrammiSection";
import SectionTitle from "@/components/ui/sectionTitle";
import LatestNewsSlider from "@/components/news/LatestNewsSlider";
import News3RowsSection from "@/components/news/News3RowsSection";
import WebRadioList from "@/components/webRadios/WebRadioList";

export default function Home() {
  return (
    <div className="w-100vw min-h-screen bg-primary-background lg:mt-0 text-black pt-[167px] lg:pt-[246px] flex justify-center">
      <section className="w-full lg:max-w-250 max-w-81.5 ">
        <NewsCarouselServer />
        <SportsNewsLayout/>
        <ProgrammiSection />
        <SectionTitle title="ULTIMISSIME" />
        <LatestNewsSlider />
        <News3RowsSection />
        <div className="w-full mb-16 lg:mb-20">
          <WebRadioList />
        </div>
        
      </section>
    </div>
  );
}
