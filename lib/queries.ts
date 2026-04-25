import { sanityClient } from "./sanity";
import type { SanityProject, SanityProjectCard } from "@/types/sanity";

const projectCardFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  thumbnailImage,
  excerpt,
  featured,
  featuredOrder,
  order
`;

const projectFullFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  year,
  coverImage,
  thumbnailImage,
  excerpt,
  client,
  industry,
  scope,
  problemStatement,
  problemBody,
  strategyItems,
  identityImages,
  applicationImages,
  results,
  featured,
  featuredOrder,
  order
`;

/** All projects ordered by grid order */
export async function getAllProjects(): Promise<SanityProjectCard[]> {
  return sanityClient.fetch(
    `*[_type == "caseStudy"] | order(order asc) { ${projectCardFields} }`
  );
}

/** Featured projects for home page, ordered by featuredOrder */
export async function getFeaturedProjects(): Promise<SanityProjectCard[]> {
  return sanityClient.fetch(
    `*[_type == "caseStudy" && featured == true] | order(featuredOrder asc) { ${projectCardFields} }`
  );
}

/** Single project by slug with all fields */
export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  const results = await sanityClient.fetch<SanityProject[]>(
    `*[_type == "caseStudy" && slug.current == $slug][0..0] { ${projectFullFields} }`,
    { slug }
  );
  return results[0] ?? null;
}

/** All slugs — for generateStaticParams */
export async function getProjectSlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<Array<{ slug: string }>>(
    `*[_type == "caseStudy"] { "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}

/** All projects for navigation (next/prev), ordered */
export async function getAllProjectsOrdered(): Promise<
  Array<{ slug: string; title: string; thumbnailImage?: unknown }>
> {
  return sanityClient.fetch(
    `*[_type == "caseStudy"] | order(order asc) { "slug": slug.current, title, thumbnailImage }`
  );
}
