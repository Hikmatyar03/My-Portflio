import type { Metadata } from "next";
import Link from "next/link";
import { MagneticButton } from "@/components/MagneticButton";
import { siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Hikmatyar — brand identity designer based in Peshawar, PK."
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 pb-xl pt-40 md:px-16">
      <div className="w-full max-w-[720px]">
        {/* Red dot */}
        <span
          className="mb-8 block h-2 w-2 animate-[ping_2s_ease-in-out_infinite] rounded-full bg-accent"
          aria-hidden="true"
        />

        {/* Headline */}
        <h1 className="font-display text-[clamp(3rem,8vw,5rem)] leading-[1.0] tracking-hero text-text">
          Have a project?
        </h1>
        <p className="font-display text-[clamp(3rem,8vw,5rem)] leading-[1.0] tracking-hero text-muted">
          I&apos;d like to hear about it.
        </p>

        {/* Divider */}
        <hr className="my-12 border-line" />

        {/* Contact block */}
        <div className="space-y-10">
          <div>
            <p className="mb-2 text-[12px] uppercase tracking-[0.1em] text-muted">Email</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex flex-col text-[20px] text-text transition-colors hover:text-accent"
            >
              <span>{siteConfig.email}</span>
              <span className="mt-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </div>

          <div>
            <p className="mb-2 text-[12px] uppercase tracking-[0.1em] text-muted">Instagram</p>
            <a
              href={`https://instagram.com/${siteConfig.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col text-[20px] text-text transition-colors hover:text-accent"
            >
              <span>{siteConfig.instagram}</span>
              <span className="mt-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <MagneticButton>
            <Link
              href="/"
              className="group inline-flex flex-col text-[16px] text-muted transition-colors hover:text-text"
              data-cursor="hover"
            >
              <span>← Back home</span>
            </Link>
          </MagneticButton>
        </div>

        <p className="mt-12 text-[13px] text-muted">Response within 48 hours.</p>
      </div>
    </main>
  );
}
