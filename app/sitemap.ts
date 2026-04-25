import type { MetadataRoute } from "next";
import { getProjectSlugs, siteConfig } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["", "/work", "/about", "/contact"].map((path) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified
  }));

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${siteConfig.siteUrl}/work/${slug}`,
    lastModified
  }));

  return [...staticRoutes, ...projectRoutes];
}

