import Image from "next/image";

type NewsCardProps = {
  newsTitle?: string;
  imageUrl?: string;
  slug?: string;
};

async function imageExists(url?: string) {
  if (!url || url === "#") return false;

  try {
    const res = await fetch(url, {
      method: "HEAD",
      cache: "force-cache",
    });

    return res.ok;
  } catch {
    return false;
  }
}

export default async function NewsCard({
  newsTitle = "title",
  imageUrl,
  slug = "",
}: NewsCardProps) {
  const hasImage = await imageExists(imageUrl);

  return (
    <div className="lg:w-56.75 lg:h-61.75 w-[326px] h-[355px] lg:py-3.5 lg:px-2.5 py-2.5 bg-white rounded-[10px] flex flex-col gap-2.5 justify-start items-center hover:scale-102 hover:shadow-lg transition-all duration-300 ease-in-out">
      {hasImage && (
        <div className="w-full h-full lg:max-w-51.25 lg:max-h-28.75 max-w-73.5 max-h-41.25 overflow-hidden rounded-[10px] flex justify-center items-center bg-gray-300">
          <Image
            src={imageUrl!}
            alt={slug || "News Image"}
            width={449}
            height={313}
            placeholder="empty"
            className="w-full h-full lg:min-h-[313px] lg:max-h-[313px] object-scale-down"
          />
        </div>
      )}

      <div className="w-full flex items-center">
        <h3
          className="text-[15px] font-bold"
          dangerouslySetInnerHTML={{ __html: newsTitle }}
        />
      </div>
    </div>
  );
}