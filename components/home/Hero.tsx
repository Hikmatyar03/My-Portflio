"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { SplitText, gsap } from "@/lib/gsap";

const noiseDataUri =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const rule = ruleRef.current;
    const meta = metaRef.current;

    if (!section || !headline || !rule || !meta) {
      return;
    }

    const context = gsap.context(() => {
      const split = SplitText.create(headline, {
        type: "chars",
        charsClass: "hero-char"
      });

      gsap.set(split.chars, { y: 120, opacity: 0 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(meta.children, { y: 20, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(split.chars, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.035,
          delay: 0.2,
          ease: "power4.out"
        })
        .to(
          rule,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out"
          },
          0.9
        )
        .to(
          meta.children,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out"
          },
          1.1
        );

      return () => split.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-bg"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: noiseDataUri, backgroundSize: "180px 180px" }}
      />

      <div className="page-shell relative w-full pb-20 pt-32 md:pb-[80px]">
        <div className="max-w-[980px]">
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(3.8rem,10vw,7.5rem)] font-medium leading-[0.95] tracking-hero text-text"
          >
            <span className="block">I build brands</span>
            <span className="block">people don&apos;t forget.</span>
          </h1>

          <div ref={ruleRef} className="mt-10 h-px w-full bg-line" />

          <div
            ref={metaRef}
            className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="text-[13px] uppercase tracking-[0.1em] text-muted">
              Brand Identity / Growth Thinking / Peshawar, PK
            </p>

            <MagneticButton>
              <Link
                href="/work"
                className="group inline-flex w-fit flex-col text-[14px] text-text"
                data-cursor="hover"
              >
                <span>View Work -&gt;</span>
                <span className="mt-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-snappy group-hover:scale-x-100" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
