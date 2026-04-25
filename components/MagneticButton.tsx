"use client";

import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
};

export function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLSpanElement>) => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    gsap.to(element, {
      x: offsetX * 0.3,
      y: offsetY * 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) {
      return;
    }

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <span
      ref={ref}
      className={["inline-flex will-change-transform", className].join(" ")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
}
