import type { Metadata } from "next";
import { getPeopleByRole, type Person } from "@/lib/content";
import { PageIntro } from "@/components/primitives";

export const metadata: Metadata = {
  title: "People",
};

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="flex gap-5">
      {/* Photo placeholder — real headshots come from the lab via the CMS */}
      <span
        aria-hidden
        className="size-16 shrink-0 rounded-full bg-ink text-paper font-display font-bold text-xl flex items-center justify-center"
      >
        {initials(person.name)}
      </span>
      <div>
        <h3 className="font-display font-bold text-xl tracking-tight">
          {person.name}
        </h3>
        <p className="mt-0.5 font-mono text-sm text-stone">{person.title}</p>
        <p className="mt-3 text-stone leading-relaxed">{person.bio}</p>
        {(person.email || person.links) && (
          <p className="mt-3 flex flex-wrap gap-4 font-mono text-sm">
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
              >
                Email
              </a>
            )}
            {person.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
              >
                {link.label}
              </a>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

function Group({ heading, members }: { heading: string; members: Person[] }) {
  if (members.length === 0) return null;
  return (
    <section aria-label={heading}>
      <h2
        data-depth
        className="font-mono text-sm uppercase tracking-[0.2em] text-stone pb-4 border-b-[3px] border-ink"
      >
        {heading}
      </h2>
      <div data-depth-group className="mt-8 grid gap-10 sm:grid-cols-2">
        {members.map((person) => (
          <PersonCard key={person.slug} person={person} />
        ))}
      </div>
    </section>
  );
}

export default async function PeoplePage() {
  const [faculty, phd, masters, alumni] = await Promise.all([
    getPeopleByRole("faculty"),
    getPeopleByRole("phd"),
    getPeopleByRole("masters"),
    getPeopleByRole("alumni"),
  ]);

  return (
    <>
      <PageIntro
        title="Who does the work"
        lede="A small group with mixed backgrounds — planning, data science, geography, design — held together by fieldwork."
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-8 space-y-16">
        <Group heading="Principal Investigator" members={faculty} />
        <Group heading="PhD researchers" members={phd} />
        <Group heading="Masters students" members={masters} />
        <Group heading="Alumni" members={alumni} />
      </div>
    </>
  );
}
