"use client";

import { useLayoutEffect, useRef } from "react";
import { WorkCard } from "@/components/home/WorkCard";
import { gsap } from "@/lib/gsap";
import { projects } from "@/lib/site-content";

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-reveal-card]");

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%"
          }
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-xl">
      <div className="page-shell">
        <p className="mb-12 text-[12px] uppercase tracking-[0.1em] text-muted">Selected Work</p>

        <div className="space-y-4">
          <WorkCard
            project={projects[0]}
            priority
            className="h-[60vh]"
            sizes="(min-width: 1024px) 90vw, 100vw"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <WorkCard
              project={projects[1]}
              className="h-[45vh]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <WorkCard
              project={projects[2]}
              className="h-[45vh]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
