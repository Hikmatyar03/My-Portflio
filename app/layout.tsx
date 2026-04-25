import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TransitionShell } from "@/components/TransitionShell";
import { siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s - Hikmatyar"
  },
  description: siteConfig.description,
  keywords: [
    "brand identity designer",
    "visual identity designer",
    "logo designer Pakistan",
    "brand strategy",
    "Peshawar designer"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/og", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og"]
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/degular-display-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/degular-display-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/satoshi-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/satoshi-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg text-text antialiased" suppressHydrationWarning>
        <SmoothScroll />
        <CustomCursor />
        <Nav />
        <TransitionShell>{children}</TransitionShell>
        <Footer />
      </body>
    </html>
  );
}
