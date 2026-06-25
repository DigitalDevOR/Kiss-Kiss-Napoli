"use client";

import { NewsData } from "@/lib/wp";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ANIMATION_DURATION = 300;
const AUTO_ADVANCE_INTERVAL = 5000;

export default function NewsCarouselClient({
  newsData,
  reverse = false,
}: {
  newsData?: NewsData[];
  reverse?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageValid, setImageValid] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const touchStartXRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const newsContainerRef = useRef<HTMLDivElement>(null);

  const currentNews = newsData?.[currentNewsIndex];

  const imageUrl =
    currentNews?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  const hasImage = Boolean(imageUrl && imageValid);

  useEffect(() => {
    setImageLoaded(false);
    setImageValid(true);
  }, [currentNewsIndex]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!newsData?.length) return;

      const nextIndex =
        currentNewsIndex === newsData.length - 1 ? 0 : currentNewsIndex + 1;

      handleIndexChange(nextIndex);
    }, AUTO_ADVANCE_INTERVAL);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentNewsIndex, newsData]);

  useEffect(() => {
    if (!newsData?.length) return;

    const nextIndex =
      currentNewsIndex === newsData.length - 1 ? 0 : currentNewsIndex + 1;

    const src =
      newsData[nextIndex]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

    if (!src) return;

    const img = new window.Image();
    img.src = src;
  }, [currentNewsIndex, newsData]);

  const handleIndexChange = (index: number) => {
    const el = newsContainerRef.current;
    if (!el || index === currentNewsIndex) return;

    const isNext = index > currentNewsIndex;
    const exitX = isNext ? "-105%" : "105%";
    const enterX = isNext ? "105%" : "-105%";

    el.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
    el.style.transform = `translateX(${exitX})`;

    setTimeout(() => {
      el.style.visibility = "hidden";
      el.style.transition = "none";
      el.style.transform = `translateX(${enterX})`;

      setImageLoaded(false);
      setImageValid(true);
      setCurrentNewsIndex(index);

      void el.offsetHeight;

      el.style.visibility = "visible";
      el.style.transition = `transform ${ANIMATION_DURATION}ms ease-in-out`;
      el.style.transform = "translateX(0)";
    }, ANIMATION_DURATION);
  };

  const newsTypeTag = () => {
    const tagNews = currentNews?._embedded?.["wp:term"]?.[0]?.[0]?.name;

    if (!tagNews) return null;

    return (
      <div className="absolute top-4 left-3 bg-[var(--color-primary)] text-white text-[8px] font-bold py-1.5 px-2.25 rounded-md shadow-2xl z-10">
        {tagNews}
      </div>
    );
  };

  const handleNewsDragOnMobile = (e: React.TouchEvent) => {
    if (!newsContainerRef.current) return;
    if (window.innerWidth > 768) return;
    if (!newsData?.length) return;

    const SWIPE_THRESHOLD = 50;

    if (e.type === "touchstart") {
      touchStartXRef.current = e.touches[0].clientX;
      return;
    }

    if (e.type === "touchend") {
      if (touchStartXRef.current === null) return;

      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - touchStartXRef.current;

      if (deltaX > SWIPE_THRESHOLD) {
        const prevIndex =
          currentNewsIndex === 0 ? newsData.length - 1 : currentNewsIndex - 1;

        handleIndexChange(prevIndex);
      }

      if (deltaX < -SWIPE_THRESHOLD) {
        const nextIndex = (currentNewsIndex + 1) % newsData.length;
        handleIndexChange(nextIndex);
      }

      touchStartXRef.current = null;
    }
  };

  return (
    <div
      className={`
        relative w-full max-w-[326px] lg:max-w-[1000px]
        min-h-[413px] lg:min-h-[377px]
        rounded-[10px] bg-white shadow-sm overflow-hidden
        px-3 pt-3 pb-10
        lg:px-3.25 lg:pt-6 lg:pb-10
        ${reverse && hasImage ? "lg:pl-14" : ""}
      `}
    >
      <div
        ref={newsContainerRef}
        className={`
          w-full h-full overflow-hidden
          flex flex-col
          ${hasImage ? "lg:flex-row lg:gap-16.25" : ""}
          ${reverse && hasImage ? "lg:flex-row-reverse" : ""}
        `}
        onTouchStart={handleNewsDragOnMobile}
        onTouchEnd={handleNewsDragOnMobile}
      >
        {hasImage && (
          <div className="w-full lg:min-w-[449px] flex items-center justify-center">
            <div className="relative w-full h-[210px] lg:h-auto rounded-[10px] overflow-hidden bg-gray-300">
              {newsTypeTag()}

              <Image
                key={currentNews?.id || currentNewsIndex}
                src={imageUrl!}
                alt={currentNews?.slug || "News Image"}
                width={449}
                height={313}
                priority={currentNewsIndex === 0}
                placeholder="empty"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageLoaded(false);
                  setImageValid(false);
                }}
                className={`
                  w-full h-full
                  lg:min-h-[313px] lg:max-h-[313px]
                  object-cover
                  transition-opacity duration-500 ease-in-out
                  ${imageLoaded ? "opacity-100" : "opacity-0"}
                `}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center gap-6 pt-5 lg:pt-0">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start justify-start">
              <span className="text-[var(--color-primary)] text-[15px] font-bold">
                {currentNews?.date
                  ? new Date(currentNews.date).toLocaleDateString("it-IT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "-"}
              </span>
            </div>

            <div className="flex items-start justify-start">
              <span
                className="text-black font-bold text-[18px] leading-[24px] lg:text-[24px] lg:leading-8"
                dangerouslySetInnerHTML={{
                  __html: currentNews?.title?.rendered || "-",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-5">
            <div className="hidden lg:block">
              <span
                className="text-[var(--color-secondary)] text-[16px] font-normal line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: currentNews?.excerpt?.rendered || "",
                }}
              />
            </div>

            <div className="relative mt-6 lg:mt-0">
              <button className="bg-[var(--color-primary)] text-white text-[15px] font-normal py-2.5 px-7 rounded-[10px]">
                Leggi l'articolo
              </button>
            </div>
          </div>
        </div>
      </div>

      {newsData && newsData.length > 1 && (
        <div className="absolute flex bottom-0 pb-3.5 left-1/2 -translate-x-1/2 gap-1">
          {newsData.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full ${
                index === currentNewsIndex
                  ? "bg-[var(--color-primary)]"
                  : "bg-gray-300"
              }`}
              onClick={() => handleIndexChange(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}