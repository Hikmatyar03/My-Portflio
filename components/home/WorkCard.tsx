"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/site-content";

type WorkCardProps = {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function WorkCard({
  project,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 80vw, 100vw"
}: WorkCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={[
        "group relative block overflow-hidden bg-surface",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        className
      ].join(" ")}
      data-cursor="hover"
      data-reveal-card
    >
      <motion.div className="absolute inset-0" initial="rest" whileHover="hover" animate="rest">
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 }
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,14,14,0.92)] via-[rgba(14,14,14,0.4)] to-transparent" />

        <motion.div
          variants={{
            rest: { opacity: 0, y: 10 },
            hover: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-display text-[24px] tracking-hero text-text">{project.title}</span>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:px-8 md:py-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[18px] text-text">{project.title}</span>
            <span className="text-[13px] text-muted">{project.category}</span>
            <span className="font-mono text-[13px] text-muted">{project.year}</span>
          </div>
          <span className="text-[20px] text-accent">-&gt;</span>
        </div>
      </motion.div>
    </Link>
  );
}
