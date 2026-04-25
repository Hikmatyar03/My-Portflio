import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ProjectInfoStrip } from "@/components/case-study/ProjectInfoStrip";
import { StrategySection } from "@/components/case-study/StrategySection";
import { ImageGallery } from "@/components/case-study/ImageGallery";
import { getNextProject, getProjectBySlug, getProjectSlugs, siteConfig } from "@/lib/site-content";

type CaseStudyPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description: project.excerpt,
      images: [`/og?slug=${project.slug}`]
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${siteConfig.name}`,
      description: project.excerpt,
      images: [`/og?slug=${project.slug}`]
    }
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) notFound();

  const nextProject = getNextProject(project.slug);

  // Map approach strings → strategy items
  const strategyItems = project.approach.map((text, i) => ({
    number: `0${i + 1}`,
    title: text.split(".")[0],            // first sentence as title
    description: text.split(".").slice(1).join(".").trim() || text
  }));

  return (
    <main>
      {/* Cover */}
      <CaseStudyHero
        title={project.title}
        category={project.category}
        year={project.year}
        image={project.image}
      />

      {/* Info Strip */}
      <ProjectInfoStrip
        client={project.client}
        industry={project.industry}
        year={project.year}
        scope={project.scope}
      />

      {/* Problem */}
      <section className="px-8 py-xl md:px-16">
        <div className="mx-auto max-w-[900px]">
          <p className="mb-8 text-[12px] uppercase tracking-[0.1em] text-muted">The Problem</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.15] tracking-hero text-text">
            {project.problem}
          </h2>
          {project.excerpt && (
            <p className="mt-6 max-w-[640px] text-[17px] leading-8 text-muted">
              {project.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Strategy */}
      <StrategySection items={strategyItems} />

      {/* Identity Images (placeholder section — will be real Sanity images) */}
      <div className="pt-8">
        <div className="px-8 pb-8 md:px-16">
          <p className="text-[12px] uppercase tracking-[0.1em] text-muted">The Identity</p>
        </div>
        <div className="relative h-[60vh] overflow-hidden bg-surface">
          <Image
            src={project.image}
            alt={`${project.title} — identity`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Results */}
      <section className="bg-surface px-8 py-xl md:px-16" aria-label="Results">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-8 text-[12px] uppercase tracking-[0.1em] text-muted">What Shifted</p>
          <div>
            {project.results.map((result, i) => (
              <div
                key={result}
                className={`flex items-start gap-4 py-5 ${
                  i < project.results.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="mt-0.5 shrink-0 text-[18px] text-accent">→</span>
                <p className="text-[18px] leading-7 text-text">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      {nextProject ? (
        <section className="px-8 py-xl md:px-16" aria-label="Next project">
          <div className="mx-auto max-w-[1400px]">
            <Link
              href={`/work/${nextProject.slug}`}
              className="group grid gap-8 border-t border-line pt-10 transition-colors md:grid-cols-[1fr_320px]"
              data-cursor="hover"
            >
              <div>
                <p className="mb-3 text-[12px] uppercase tracking-[0.1em] text-muted">
                  Next Project
                </p>
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-hero text-text transition-colors duration-300 group-hover:text-accent">
                  {nextProject.title}
                </h2>
              </div>
              <div className="relative h-[180px] overflow-hidden bg-surface">
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  sizes="320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
