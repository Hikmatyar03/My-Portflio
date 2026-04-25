"use client";

import { motion } from "framer-motion";

interface ProjectInfoStripProps {
  client: string;
  industry: string;
  year: string | number;
  scope: string[];
}

export function ProjectInfoStrip({ client, industry, year, scope }: ProjectInfoStripProps) {
  const cols = [
    { label: "Client", value: client },
    { label: "Industry", value: industry },
    { label: "Year", value: String(year) },
    { label: "Scope", value: scope.join(" · ") }
  ];

  return (
    <div className="bg-surface">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {cols.map((col, i) => (
          <motion.div
            key={col.label}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            className={`px-8 py-10 ${i > 0 ? "border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line md:border-t-0" : ""
            }`}
          >
            <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted">
              {col.label}
            </p>
            <p className="text-[16px] leading-snug text-text">{col.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
