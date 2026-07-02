import Image from "next/image";

type ProgrammaCardType = {
  cover: string;
  title: string;
};

export default function ProgrammaCard({ cover, title }: ProgrammaCardType) {
  return (
    <article
      className="lg:min-w-56 lg:max-w-56 lg:h-72 w-81.5 h-106 bg-white rounded-xl lg:px-2.5 lg:py-4 px-5 pt-7 hover:scale-102 hover:shadow-lg transition-all duration-300 ease-in-out shadow-sm"
      aria-label={`Programma radio ${title}`}
    >
      <div className="w-full lg:h-48 h-68.25 relative bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={cover}
          alt={`Copertina del programma radio ${title}`}
          fill
          sizes="(max-width: 1024px) 326px, 224px"
          className="object-cover rounded-lg"
        />
      </div>

      <div className="w-full flex items-center justify-center mt-3" aria-hidden="true">
        <div className="w-8 border border-[var(--color-primary)]" />
      </div>

      <div className="w-full mt-3 flex justify-center">
        <h3 className="text-[#1A1A1A] font-bold lg:text-sm text-lg text-center">
          {title}
        </h3>
      </div>
    </article>
  );
}