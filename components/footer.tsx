import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

export function Footer() {
  const site = getSiteSettings();

  return (
    <footer className="mt-24">
      {/* platform edge */}
      <div aria-hidden className="h-2 bg-accent" />
      <div className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display font-bold text-xl">{site.labName}</p>
            <p className="mt-3 text-paper/70 leading-relaxed max-w-xs">
              {site.department}
              <br />
              {site.institution}
            </p>
          </div>
          <div className="font-mono text-sm">
            <p className="text-paper/50 uppercase tracking-widest mb-4">Visit</p>
            <p className="text-paper/80 leading-relaxed">{site.address}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block underline decoration-accent underline-offset-4 hover:text-accent"
            >
              {site.email}
            </a>
          </div>
          <div className="font-mono text-sm">
            <p className="text-paper/50 uppercase tracking-widest mb-4">Go to</p>
            <ul className="space-y-2">
              {[
                ["Research", "/research"],
                ["Publications", "/publications"],
                ["News", "/news"],
                ["Join us", "/join"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-paper/80 hover:text-accent underline-offset-4 hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-paper/15">
          <p className="mx-auto max-w-6xl px-5 sm:px-8 py-5 font-mono text-xs text-paper/50">
            © {new Date().getFullYear()} {site.labName}. Placeholder content —
            pending content from the lab.
          </p>
        </div>
      </div>
    </footer>
  );
}
