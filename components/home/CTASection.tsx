"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

export function CTASection() {
  return (
    <section
      className="relative overflow-hidden bg-bg px-8 py-[120px] md:px-16"
      aria-label="Contact CTA"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Red dot */}
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 block h-2 w-2 rounded-full bg-accent"
          aria-hidden="true"
        />

        {/* Headlines */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display text-[clamp(3rem,7vw,5rem)] leading-[1.0] tracking-hero text-text"
          >
            Have a project?
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-[clamp(3rem,7vw,5rem)] leading-[1.0] tracking-hero text-muted"
          >
            Let&apos;s make it impossible to ignore.
          </motion.p>
        </div>

        {/* CTA + email */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center"
        >
          <MagneticButton>
            <Link
              href="/contact"
              className="group inline-flex flex-col text-[16px] text-text"
              data-cursor="hover"
            >
              <span>Start a project →</span>
              <span className="mt-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          </MagneticButton>

          <a
            href="mailto:hello@yourdomain.com"
            className="group inline-flex flex-col text-[14px] text-muted transition-colors duration-300 hover:text-text"
          >
            <span>hello@yourdomain.com</span>
            <span className="mt-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
