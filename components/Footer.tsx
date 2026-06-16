import Image from "next/image";

export default function Footer() {
    return (
        <div className="absolute bottom-0 w-full h-23 lg:h-[156px] px-4 left-0 bg-[var(--color-primary)] flex items-center justify-between text-white font-family-">
            <div className="flex gap-2.5 items-center justify-center">
                {/* Logo Kiss Kiss Napoli */}
                <div>
                    <Image src="/navLogo.png" alt="Kiss Kiss Napoli Logo" width={68} height={68} className="w-[52px] lg:w-[68px] aspect-square" />
                </div>
                {/* Logo Media Radio */}
                <div>
                    <Image src="/mediaRadioLogo.svg" alt="Media Radio Logo" width={261} height={70} className="w-[126px] h-[33px] lg:w-[261px] lg:h-[70px] lg:w-[68px]" />
                </div>
            </div>
            {/* Dati aziendali */}
            <div className="flex flex-col gap-1">
                <p className="text-[9px] lg:text-[20px] font-normal text-[#fff]">
                    Only Radio S.R.L - P.IVA 05295650633
                </p>
                <p className="text-[9px] lg:text-[20px] font-normal text-[#fff]">
                    Privacy Policy | Cookie Policy
                </p>
            </div>
        </div>    
    )
}