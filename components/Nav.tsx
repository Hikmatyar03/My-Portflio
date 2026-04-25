"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-[rgba(14,14,14,0.92)] backdrop-blur-md" : "bg-transparent"
        ].join(" ")}
      >
        <div className="page-shell flex h-20 items-center justify-between">
          <MagneticButton>
            <Link
              href="/"
              className="font-display text-[18px] tracking-[-0.03em] text-text"
              data-cursor="hover"
            >
              Hikmatyar
            </Link>
          </MagneticButton>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <MagneticButton key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      "group relative inline-flex flex-col text-[13px] uppercase tracking-[0.1em] transition-colors duration-300",
                      active ? "text-text" : "text-muted hover:text-text"
                    ].join(" ")}
                    data-cursor="hover"
                  >
                    <span>{link.label}</span>
                    <motion.span
                      initial={{ scaleX: active ? 1 : 0 }}
                      animate={{ scaleX: active ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-2 h-px origin-left bg-accent"
                    />
                  </Link>
                </MagneticButton>
              );
            })}
          </nav>

          <button
            type="button"
            className="text-[12px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-text md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex min-h-screen flex-col justify-center bg-bg px-8 pt-24 md:hidden"
          >
            <div className="space-y-6">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.05 * index,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <MagneticButton>
                    <Link
                      href={link.href}
                      className="font-display text-5xl tracking-[-0.03em] text-text"
                      data-cursor="hover"
                    >
                      {link.label}
                    </Link>
                  </MagneticButton>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
