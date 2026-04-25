"use client";

import { motion } from "framer-motion";

interface StrategyItem {
  number?: string;
  title: string;
  description: string;
}

interface StrategySectionProps {
  items: StrategyItem[];
}

export function StrategySection({ items }: StrategySectionProps) {
  return (
    <section className="px-8 py-xl md:px-16" aria-label="Strategy approach">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-10 text-[12px] uppercase tracking-[0.1em] text-muted">The Approach</p>

        <div className="divide-y divide-line">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              className="group grid gap-4 py-8 md:grid-cols-[80px_1fr_1fr]"
            >
              {/* Number */}
              <span className="font-mono text-[13px] text-muted">
                {item.number ?? `0${i + 1}`}
              </span>

              {/* Title */}
              <p className="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight text-text transition-colors duration-300 group-hover:text-accent">
                {item.title}
              </p>

              {/* Description */}
              <p className="text-[16px] leading-7 text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
