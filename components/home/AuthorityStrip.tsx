"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type NumericStat = { value: number; suffix: string; label: string; isText?: false };
type TextStat = { value: string; suffix: ""; label: string; isText: true };
type Stat = NumericStat | TextStat;

const stats: Stat[] = [
  { value: 4, suffix: "+", label: "Years" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 3, suffix: "", label: "Industries" },
  { value: "PK", suffix: "", label: "Based in", isText: true }
];

export function AuthorityStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        if (stat.isText) return;
        const el = counterRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value as number,
          duration: 1.5,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + stat.suffix;
          }
        });
      });

      // Reveal text
      gsap.from(".authority-text", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-surface px-8 py-xl md:px-16"
      aria-label="About strip"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Main copy */}
        <p className="authority-text font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] text-text">
          Selected work across brand identity,
          <br />
          visual systems, and growth-focused design.
        </p>
        <p className="authority-text mt-6 max-w-xl text-[17px] leading-8 text-muted">
          Based in Peshawar, PK. Working globally.
        </p>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 gap-y-8 border-t border-line pt-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-0 md:px-8 ${i > 0 ? "md:border-l md:border-line" : ""}`}
            >
              {stat.isText ? (
                <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-text">
                  {stat.value}
                </p>
              ) : (
                <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-text">
                  <span
                    ref={(el) => {
                      counterRefs.current[i] = el;
                    }}
                  >
                    0{stat.suffix}
                  </span>
                </p>
              )}
              <p className="mt-2 text-[12px] uppercase tracking-[0.1em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
