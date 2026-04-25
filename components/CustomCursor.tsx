"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
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
    if (!enabled || !cursorRef.current) {
      document.body.classList.remove("cursor-active");
      return;
    }

    document.body.classList.add("cursor-active");

    const cursor = cursorRef.current;
    
    // State for cursor animation
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const vel = { x: 0, y: 0 };
    
    let hovering = false;

    // Center the cursor exactly on the pointer
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");
    const setScaleX = gsap.quickSetter(cursor, "scaleX");
    const setScaleY = gsap.quickSetter(cursor, "scaleY");
    const setRotation = gsap.quickSetter(cursor, "rotation", "deg");

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onPointerOver = (e: PointerEvent) => {
      hovering = Boolean((e.target as HTMLElement | null)?.closest('[data-cursor="hover"]'));
      gsap.to(cursor, {
        scale: hovering ? 2.5 : 1,
        backgroundColor: hovering ? "#FF4A4A" : "#FFFFFF", // accent color when hovering
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const tick = () => {
      // Calculate velocity
      const dt = 1.0 - Math.pow(1.0 - 0.25, gsap.ticker.deltaRatio()); 
      
      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;
      
      vel.x = mouse.x - pos.x;
      vel.y = mouse.y - pos.y;
      
      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
      const angle = Math.atan2(vel.y, vel.x) * (180 / Math.PI);
      
      // Calculate squash and stretch
      // Limit speed so it doesn't stretch too much
      const maxStretch = 1.8;
      const stretch = Math.min(1 + speed * 0.02, maxStretch);
      const squash = 1 / stretch;
      
      setX(pos.x);
      setY(pos.y);
      
      // Apply stretch only if not hovering (to avoid weird ellipses when hover scale is active)
      if (!hovering) {
        setScaleX(stretch);
        setScaleY(squash);
        setRotation(angle);
      } else {
        setRotation(0);
      }
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
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 -ml-2.5 -mt-2.5 rounded-full bg-white mix-blend-difference will-change-transform"
    />
  );
}
