import Link from "next/link";
import { getProfile, getSiteSettings } from "@/lib/content";

export async function Footer() {
  const site = await getSiteSettings();
  const profile = await getProfile();

  return (
    <footer className="mt-24">
      {/* platform edge */}
      <div aria-hidden className="h-2 bg-accent" />
      <div className="bg-ink text-paper">
        {/* content drifts inside the ink block; the platform-edge strip
            above stays put — the floor doesn't move, you do */}
        <div
          data-parallax="0.08"
          className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-3"
        >
          <div>
            <p className="font-display font-bold text-xl">{profile.name}</p>
            <p className="mt-3 text-paper/70 leading-relaxed max-w-xs">
              {profile.title}
              <br />
              {profile.affiliation}
            </p>
          </div>
          <div className="font-mono text-sm">
            <p className="text-paper/50 uppercase tracking-widest mb-4">Visit</p>
            <p className="text-paper/80 leading-relaxed">{site.address}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block underline decoration-accent underline-offset-4 hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
          <div className="font-mono text-sm">
            <p className="text-paper/50 uppercase tracking-widest mb-4">Go to</p>
            <ul className="space-y-2">
              {[
                ["About", "/about"],
                ["Research", "/research"],
                ["Publications", "/publications"],
                ["News", "/news"],
                ["Work with me", "/work-with-me"],
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
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
