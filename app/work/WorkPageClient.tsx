"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { WorkCard } from "@/components/home/WorkCard";
import { ImageFollower } from "@/components/work/ImageFollower";
import type { Project } from "@/lib/site-content";

const FILTERS = ["All", "Branding", "Identity", "Strategy", "Campaign"] as const;
type Filter = (typeof FILTERS)[number];

interface WorkPageClientProps {
  projects: Project[];
}

export default function WorkPageClient({ projects }: WorkPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const gridRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const followerImages = projects.map((p) => ({
    id: p.slug,
    src: p.image,
    alt: p.title
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1
        });
      }

      gsap.from(".work-card-item", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.2
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <main
      ref={gridRef}
      className="relative min-h-screen overflow-hidden px-8 pb-xl pt-40 md:px-16"
      aria-label="Work portfolio"
    >
      <ImageFollower
        containerRef={gridRef as React.RefObject<HTMLElement>}
        images={followerImages}
        activeId={hoveredId}
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Page header */}
        <header className="border-b border-line pb-8">
          <p className="mb-4 text-[12px] uppercase tracking-[0.1em] text-muted">
            Selected Projects
          </p>
          <h1
            ref={titleRef}
            className="font-display text-[clamp(3.5rem,8vw,5rem)] leading-none tracking-hero text-text"
          >
            Work
          </h1>
        </header>

        {/* Sticky filter */}
        <div className="sticky top-16 z-10 -mx-8 flex gap-6 bg-bg/90 px-8 py-4 backdrop-blur-sm md:-mx-16 md:px-16">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-[13px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                activeFilter === filter
                  ? "border-b border-accent pb-0.5 text-text"
                  : "text-muted hover:text-text"
              }`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <section
          className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-3"
          aria-label="Project grid"
        >
          {filtered.length === 0 ? (
            <p className="col-span-3 py-16 text-center text-muted">
              No projects in this category yet.
            </p>
          ) : (
            filtered.map((project) => (
              <div
                key={project.slug}
                className="work-card-item"
                onMouseEnter={() => setHoveredId(project.slug)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <WorkCard
                  project={project}
                  className="h-[52vh]"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
