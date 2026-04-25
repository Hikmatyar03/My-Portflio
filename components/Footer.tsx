import Link from "next/link";
import { socialLinks } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="page-shell flex flex-col gap-4 py-md text-[13px] text-muted md:flex-row md:items-center md:justify-between">
        <p>&copy; 2025 Hikmatyar</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-text"
              data-cursor="hover"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
