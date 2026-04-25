"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface ImageFollowerProps {
  containerRef: React.RefObject<HTMLElement>;
  images: { src: string; alt: string; id: string }[];
  activeId: string | null;
}

export function ImageFollower({ containerRef, images, activeId }: ImageFollowerProps) {
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const follower = followerRef.current;
    if (!container || !follower) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(follower, {
        x: x - 140,
        y: y - 90,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, [containerRef]);

  const activeImage = images.find((img) => img.id === activeId);

  return (
    <div
      ref={followerRef}
      className={`pointer-events-none absolute top-0 left-0 z-20 h-[180px] w-[280px] overflow-hidden transition-opacity duration-300 ${
        activeId ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {activeImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
