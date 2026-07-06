"use client";

import { useState } from "react";
import type { Publication, PublicationType } from "@/lib/content/types";
import { PublicationItem } from "@/components/primitives";

const typeLabels: Record<PublicationType, string> = {
  journal: "Journal articles",
  conference: "Conference papers",
  book: "Books & chapters",
  report: "Reports",
};

export function PublicationList({
  publications,
}: {
  publications: Publication[];
}) {
  const [filter, setFilter] = useState<PublicationType | "all">("all");

  const presentTypes = (
    Object.keys(typeLabels) as PublicationType[]
  ).filter((t) => publications.some((p) => p.type === t));

  const visible =
    filter === "all"
      ? publications
      : publications.filter((p) => p.type === filter);

  const years = [...new Set(visible.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by type"
        className="flex flex-wrap gap-2"
      >
        {(["all", ...presentTypes] as const).map((t) => {
          const active = filter === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(t)}
              className={`font-mono text-sm px-3.5 py-2 rounded-sm border transition-colors ${
                active
                  ? "bg-ink text-paper border-ink"
                  : "border-line text-stone hover:border-ink hover:text-ink"
              }`}
            >
              {t === "all" ? "All" : typeLabels[t]}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {years.map((year) => (
          <section key={year} aria-label={`Publications from ${year}`}>
            {visible
              .filter((p) => p.year === year)
              .map((pub) => (
                <div key={pub.id} data-depth>
                  <PublicationItem pub={pub} />
                </div>
              ))}
          </section>
        ))}
        {visible.length === 0 && (
          <p className="py-10 text-stone">
            Nothing in this category yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
