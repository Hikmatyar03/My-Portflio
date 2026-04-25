import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MagneticButton } from "@/components/MagneticButton";
import MeImg from "@/assets/Me.png";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-shell min-h-screen pb-xl pt-40">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-6 text-[12px] uppercase tracking-[0.1em] text-muted">About</p>
          <h1 className="max-w-3xl font-display text-[clamp(3rem,7vw,4.5rem)] leading-[1.02] tracking-hero text-text">
            I design brands that do more than look good. They do actual work in the market.
          </h1>
          <p className="mt-8 max-w-2xl text-[18px] leading-8 text-muted">
            I am Hikmatyar, a brand identity designer and growth thinker based in Peshawar,
            Pakistan. I work with founders and businesses that need sharper positioning, stronger
            recall, and a visual system that earns attention instead of asking for it.
          </p>
          <div className="mt-10 space-y-3 text-[16px] text-text">
            <p>Brand Identity</p>
            <p>Visual Systems</p>
            <p>Brand Strategy</p>
            <p>Campaign Design</p>
          </div>
          <MagneticButton className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex flex-col text-[16px] text-text"
              data-cursor="hover"
            >
              <span>Start a project -&gt;</span>
              <span className="mt-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-snappy group-hover:scale-x-100" />
            </Link>
          </MagneticButton>
        </div>

        <div className="relative min-h-[540px] overflow-hidden bg-surface">
          <Image
            src={MeImg}
            alt="Hikmatyar"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </main>
  );
}
