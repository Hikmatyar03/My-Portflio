import type { Metadata } from "next";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { WorkGrid } from "@/components/home/WorkGrid";
import { AuthorityStrip } from "@/components/home/AuthorityStrip";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Hikmatyar — Brand Identity Designer & Growth Thinker",
  description:
    "Brand identity designer based in Peshawar, PK. I build visual systems and strategies that help businesses grow."
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <WorkGrid />
      <AuthorityStrip />
      <CTASection />
    </main>
  );
}
