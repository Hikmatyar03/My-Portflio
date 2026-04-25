"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { SplitText, gsap } from "@/lib/gsap";

type CaseStudyHeroProps = {
  title: string;
  category: string;
  year: string;
  image: string;
};

export function CaseStudyHero({ title, category, year, image }: CaseStudyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = titleRef.current;
    const imageElement = imageRef.current;

    if (!section || !heading || !imageElement) {
      return;
    }

    const context = gsap.context(() => {
      const split = SplitText.create(heading, {
        type: "chars",
        charsClass: "case-study-char"
      });

      gsap.set(split.chars, { y: 90, opacity: 0 });
      gsap.set(imageElement, { scale: 1.1 });

      gsap
        .timeline({ delay: 0.5 })
        .to(imageElement, {
          scale: 1,
          duration: 1.4,
          ease: "power3.out"
        })
        .to(
          split.chars,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.025,
            ease: "power4.out"
          },
          0.15
        );

      return () => split.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden bg-bg">
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(14,14,14,0.28)] to-[rgba(14,14,14,0.88)]" />
      </div>

      <div className="page-shell relative flex min-h-[100svh] items-end pb-16 pt-32">
        <div className="max-w-4xl">
          <p className="mb-4 text-[13px] uppercase tracking-[0.1em] text-muted">
            {category} / {year}
          </p>
          <h1
            ref={titleRef}
            className="font-display text-[clamp(3.5rem,9vw,6rem)] leading-[0.95] tracking-hero text-text"
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}

