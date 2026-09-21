import type { MetadataRoute } from "next";

import { site } from "@/content/business";

const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/training", priority: 0.95, changeFrequency: "monthly" },
  { path: "/gym", priority: 0.95, changeFrequency: "monthly" },
  { path: "/function-health", priority: 0.8, changeFrequency: "monthly" },
  { path: "/visit", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${site.url.replace(/\/$/, "")}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
