"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { WebRadio } from "@/lib/wp";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type CarouselApi = UseEmblaCarouselType[1];

export default function WebRadioSlider({ radios }: { radios: WebRadio[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSetApi = useCallback((apiInstance: CarouselApi) => {
    if (!apiInstance) return;
    setApi(apiInstance);

    const update = () => {
      setCount(apiInstance.scrollSnapList().length);
      setCurrent(apiInstance.selectedScrollSnap());
    };

    update();
    apiInstance.on("reInit", update);
    apiInstance.on("select", () => {
      setCurrent(apiInstance.selectedScrollSnap());
    });
  }, []);

  return (
    <section
      className="w-full mt-20 lg:mt-8 bg-white rounded-2xl shadow-sm p-5"
      aria-labelledby="webradio-title"
    >
      <h2 id="webradio-title" className="text-2xl font-bold text-black mb-10 mt-2 ml-4">
        Radio
      </h2>

      <Carousel
        setApi={onSetApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
        aria-label="Slider delle web radio"
      >
        <CarouselContent className="-ml-5">
          {radios.map((radio) => (
            <CarouselItem
              key={radio.name}
              aria-label={radio.name}
              className="pl-5 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="flex flex-col items-center">
                <div className="w-[220px] h-[220px] sm:w-[166px] sm:h-[166px] rounded-full overflow-hidden bg-gray-200 shrink-0">
                  {radio.image && (
                    <Image
                      src={radio.image}
                      alt={radio.name}
                      width={220}
                      height={220}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 640px) 220px, 166px"
                    />
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {count > 1 && (
        <div className="flex justify-center gap-1.5 mt-10">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Vai alla pagina ${i + 1}`}
              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-colors ${
                i === current ? " bg-[var(--color-primary)]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}