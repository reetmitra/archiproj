"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/news", label: "News" },
  { href: "/teaching", label: "Teaching" },
  { href: "/join", label: "Join us" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between gap-6 h-16">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span aria-hidden className="size-3 rounded-full bg-accent ring-2 ring-ink" />
          Ageing Mobility Lab
        </Link>

        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 text-[0.95rem] rounded-sm transition-colors ${
                  active
                    ? "font-semibold text-ink underline decoration-accent decoration-[3px] underline-offset-8"
                    : "text-stone hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="md:hidden px-3 py-2 font-mono text-sm border border-line rounded-sm"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="md:hidden border-t border-line bg-paper"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-4 text-lg border-b border-line last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
