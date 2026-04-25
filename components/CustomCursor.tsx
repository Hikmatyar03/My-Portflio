"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const query = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(query.matches);

    updateEnabled();
    query.addEventListener("change", updateEnabled);

    return () => query.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) {
      document.body.classList.remove("cursor-active");
      return;
    }

    document.body.classList.add("cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const follower = { x: pointer.x, y: pointer.y };
    let hovering = false;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { x: pointer.x, y: pointer.y });
    gsap.set(ring, { x: pointer.x, y: pointer.y });

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      gsap.set(dot, { x: pointer.x, y: pointer.y });
    };

    const onPointerOver = (event: PointerEvent) => {
      hovering = Boolean((event.target as HTMLElement | null)?.closest('[data-cursor="hover"]'));

      gsap.to(ring, {
        scale: hovering ? 1.5 : 1,
        opacity: hovering ? 0.5 : 1,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    const tick = () => {
      follower.x += (pointer.x - follower.x) * 0.1;
      follower.y += (pointer.y - follower.y) * 0.1;
      gsap.set(ring, { x: follower.x, y: follower.y });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOver);
    gsap.ticker.add(tick);

    return () => {
      document.body.classList.remove("cursor-active");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOver);
      gsap.ticker.remove(tick);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-text"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-text"
      />
    </>
  );
}
