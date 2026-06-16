"use client";

import Image from "next/image";
import { OnAirResponse } from "@/hooks/useOnAirPolling";

export default function OnAirWidget( { onAir }: { onAir: OnAirResponse } ) {
    return (
        <div className="flex gap-[7px]">
            <div className="lg:w-[68px] w-[51px] lg:max-w-[68px] max-w-[51px] overflow-hidden aspect-square rounded-full border-[3.24px] border-[#fff]">
                <Image 
                    src={ onAir.data.speakers[0]?.image || "/defaultSpeaker.png" }
                    alt="Speaker Image"
                    width={68}
                    height={68}
                    priority
                />
            </div>
            <div className=" flex flex-col gap-0.5">
                <div>
                    <p className="lg:text-[16px] text-[12px] font-bold text-[#fff]">ON AIR</p>
                </div>
                <div>
                    <p className="lg:text-[16px] text-[12px] font-bold text-[#fff]">{onAir.data.program.title || "-"}</p>
                </div>
                <div>
                    <p className="lg:text-[12px] text-[9px] text-[#fff]">{onAir.data.speakers[0].name || "-"}</p>
                </div>
            </div>
        </div>
      
    )
}
