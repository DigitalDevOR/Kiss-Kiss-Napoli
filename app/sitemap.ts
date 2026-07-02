import type { MetadataRoute } from "next";
import { getNewsData } from "@/lib/wp";

const SITE_URL = "https://kisskissnapoli.it";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNewsData(100, 0);

  const newsEntries: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${SITE_URL}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...newsEntries,
  ];
}
