"use client";

import { ProgrammaData } from "@/lib/wp";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProgrammaCard from "./ProgrammaCard";

type ProgrammiSliderProps = {
  programmi: (ProgrammaData & {
    cover: string;
  })[];
};

export default function ProgrammiSlider({ programmi }: ProgrammiSliderProps) {
  return (
    <section
      className="w-full flex justify-center mt-8"
      aria-labelledby="programmi-slider-title"
    >
      <div className="relative w-full lg:w-[95%]">
        <h2 id="programmi-slider-title" className="sr-only">
          Programmi radio
        </h2>

        <Carousel
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            dragFree: true,
          }}
          className="w-full"
          aria-label="Slider dei programmi radio"
        >
          <CarouselContent className="-ml-4" role="list">
            {programmi.map((programma) => (
              <CarouselItem
                key={programma.id}
                role="listitem"
                aria-label={programma.title}
                className="
                  pl-4
                  basis-full
                  lg:basis-1/3
                  xl:basis-1/4
                "
              >
                <ProgrammaCard
                  cover={programma.cover}
                  title={programma.title}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Programmi precedenti"
            className="hidden lg:flex -left-14 bg-[var(--color-primary)] border-0 text-white"
          />

          <CarouselNext
            aria-label="Programmi successivi"
            className="hidden lg:flex -right-14 bg-[var(--color-primary)] border-0 text-white"
          />
        </Carousel>
      </div>
    </section>
  );
}