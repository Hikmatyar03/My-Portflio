"use client";

import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/PageTransition";

type TransitionShellProps = {
  children: ReactNode;
};

export function TransitionShell({ children }: TransitionShellProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
}

