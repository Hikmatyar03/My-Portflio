"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  label?: string;
  /** If true, first image is full-bleed width */
  firstFullBleed?: boolean;
}

export function ImageGallery({ images, label, firstFullBleed = true }: ImageGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = galleryRef.current?.querySelectorAll(".gallery-image-inner");
      if (!imgs) return;

      imgs.forEach((img) => {
        gsap.to(img, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  if (images.length === 0) return null;

  const [first, ...rest] = images;

  // Group remaining images into pairs for 2-col layout
  const pairs: GalleryImage[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    pairs.push(rest.slice(i, i + 2));
  }

  return (
    <div ref={galleryRef}>
      {label && (
        <div className="px-8 pb-10 md:px-16">
          <p className="text-[12px] uppercase tracking-[0.1em] text-muted">{label}</p>
        </div>
      )}

      {/* First image — full bleed if firstFullBleed */}
      {firstFullBleed ? (
        <div className="relative h-[70vh] overflow-hidden">
          <div className="gallery-image-inner absolute inset-0 scale-110">
            <Image
              src={first.src}
              alt={first.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      ) : (
        <div className="px-8 md:px-16">
          <div className="relative h-[50vh] overflow-hidden">
            <div className="gallery-image-inner absolute inset-0 scale-110">
              <Image
                src={first.src}
                alt={first.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Remaining images — alternating full-bleed and 2-col */}
      <div className="mt-4 space-y-4">
        {pairs.map((pair, pi) =>
          pair.length === 2 ? (
            <div key={pi} className="grid gap-4 md:grid-cols-2">
              {pair.map((img) => (
                <div key={img.src} className="relative h-[55vh] overflow-hidden">
                  <div className="gallery-image-inner absolute inset-0 scale-110">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div key={pi} className="relative h-[65vh] overflow-hidden">
              <div className="gallery-image-inner absolute inset-0 scale-110">
                <Image
                  src={pair[0].src}
                  alt={pair[0].alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
