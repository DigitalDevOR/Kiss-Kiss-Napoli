import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full min-h-23 lg:min-h-[156px] px-4 bg-[var(--color-primary)] flex items-center justify-between text-white">
      <div className="flex gap-2.5 items-center justify-center">
        <Link href="/" aria-label="Vai alla homepage di Kiss Kiss Napoli">
          <Image
            src="/navLogo.png"
            alt="Kiss Kiss Napoli"
            width={68}
            height={68}
            className="w-[52px] lg:w-[68px] aspect-square"
          />
        </Link>

        <Link href="/" aria-label="Vai alla homepage di Media Radio">
          <Image
            src="/mediaRadioLogo.svg"
            alt="Media Radio"
            width={261}
            height={70}
            className="w-[126px] h-[33px] lg:w-[261px] lg:h-[70px]"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-1 text-[9px] lg:text-[20px] font-normal text-white">
        <p>Only Radio S.R.L - P.IVA 05295650633</p>

        <nav aria-label="Link legali">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <span aria-hidden="true"> | </span>
          <Link href="/cookie-policy" className="hover:underline">
            Cookie Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}