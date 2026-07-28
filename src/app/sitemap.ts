import type { MetadataRoute } from "next";
import { getPublishedJobs } from "@/lib/jobs";

const siteUrl = "https://debageri.se";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await getPublishedJobs();

  return [
    { url: siteUrl },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/team` },
    { url: `${siteUrl}/careers` },
    { url: `${siteUrl}/contact` },
    { url: `${siteUrl}/privacy` },
    ...jobs.map((job) => ({
      url: `${siteUrl}/careers/${encodeURIComponent(job.id)}`,
      lastModified: job.updatedAt,
    })),
  ];
}
