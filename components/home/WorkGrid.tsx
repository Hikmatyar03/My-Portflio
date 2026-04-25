"use client";

import { useEffect, useRef, useState } from "react";
import { WorkCard } from "./WorkCard";
import { gsap } from "@/lib/gsap";
import { projects as staticProjects, type Project } from "@/lib/site-content";
import Link from "next/link";

const FILTERS = ["All", "Branding", "Identity", "Strategy", "Campaign"] as const;
type Filter = (typeof FILTERS)[number];

interface WorkGridProps {
  /** Pass Sanity projects when available; falls back to static */
  sanityProjects?: Project[];
}

export function WorkGrid({ sanityProjects }: WorkGridProps) {
  const allProjects = sanityProjects ?? staticProjects;
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "All"
      ? allProjects.slice(0, 6)
      : allProjects.filter((p) => p.category === activeFilter).slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-grid-card", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 90%",
          once: true
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      ref={gridRef}
      className="px-8 py-xl md:px-16"
      aria-label="Work grid"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header row */}
        <div className="mb-8 flex items-center justify-between">
          <span className="text-[13px] uppercase tracking-[0.1em] text-muted">All Work</span>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.1em] text-muted transition-colors hover:text-text"
            aria-label="See all work"
          >
            See all ↗
          </Link>
        </div>

        {/* Filter toggles */}
        <div className="mb-10 flex flex-wrap gap-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-[13px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                activeFilter === filter
                  ? "border-b border-accent text-text"
                  : "text-muted hover:text-text"
              }`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <div key={project.slug} className="work-grid-card">
              <WorkCard
                project={project}
                className="h-[52vh]"
                sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
