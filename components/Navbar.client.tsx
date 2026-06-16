"use client";
import { useState } from "react";
import { useOnAirPolling, type OnAirResponse } from "@/hooks/useOnAirPolling";
import OnAirWidget from "@/components/OnAirWidget";
import Image from "next/image";

export default function NavbarClient({
  initialOnAir,
}: {
  initialOnAir: OnAirResponse;
}) {
  const onAir = useOnAirPolling(initialOnAir);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    console.log("Hamburger menu clicked. Current state:", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full border-b border-[var(--border-color-primary)] flex lg:justify-start justify-between items-center px-[27px] lg:px-6 h-[92px] lg:h-[99px] bg-[var(--color-primary)] fixed top-0 left-0 text-white z-50">
        <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <Image
            src="/navLogo.png"
            alt="Kiss Kiss Napoli Logo"
            width={68}
            height={68}
            className="w-[52px] lg:w-[68px] aspect-square"
          />
        </div>
        <div className="lg:text-left">
          <OnAirWidget onAir={onAir} />
        </div>
        <div
          className="cursor-pointer lg:hidden"
          onClick={handleHamburgerClick}
        >
          <Image src="/Group.svg" alt="Menu Icon" width={24} height={24} />
        </div>
      </div>
      <div className={`w-full fixed min-w-screen lg:bg-[var(--color-primary)] bg-[#274B6A] lg:h-[57px] lg:mt-[99px] mt-[91px] lg:block transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} lg:translate-y-0 `}>
        <div className="flex h-full flex-col items-start justify-center gap-0 p-0 m-0 lg:flex-row lg:items-center lg:gap-9">
          {["HOME", "RADIO", "NEWS", "FREQUENZE", "KISSKISS NAPOLI TV"].map(
            (item) => (
              <div key={item} className="w-full border-b border-white/20 py-4 lg:w-auto lg:border-b-0 lg:py-0 h-14 flex items-center lg:pl-0 pl-6 ">
                <a href="#" className="block text-sm font-medium tracking-wide hover:opacity-80 transition-opacity font-bold text-xl">
                  {item}
                </a>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
