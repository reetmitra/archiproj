import type { Metadata } from "next";
import { getProfile } from "@/lib/content";
import { PageIntro } from "@/components/primitives";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <>
      <PageIntro eyebrow="About" title={profile.name} />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-8 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 lg:items-start">
        <div>
          <div
            data-depth
            className="max-w-2xl space-y-6 text-lg leading-relaxed"
          >
            {/* ?. so a Sanity build from a not-yet-reseeded dataset
                renders empty instead of crashing */}
            {profile.about?.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <p
            data-depth
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm"
          >
            <a
              href={`mailto:${profile.email}`}
              className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
            >
              {profile.email}
            </a>
            {profile.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
              >
                {link.label}
              </a>
            ))}
          </p>
        </div>

        {profile.photo && (
          <figure data-depth className="mt-12 lg:mt-0 max-w-sm lg:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element -- next/image
                is unused site-wide; src may be a Sanity CDN URL */}
            <img
              src={profile.photo.src}
              alt={profile.photo.alt}
              loading="lazy"
              className="w-full h-auto border border-line rounded-sm"
            />
            {profile.photo.caption && (
              <figcaption className="mt-2 font-mono text-xs text-stone">
                {profile.photo.caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </>
  );
}
