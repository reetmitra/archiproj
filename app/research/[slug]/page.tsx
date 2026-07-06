import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  getProjects,
  getPublication,
  getTheme,
} from "@/lib/content";
import { PublicationItem } from "@/components/primitives";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const theme = getTheme(project.themeSlug);
  const pubs =
    project.publicationIds
      ?.map(getPublication)
      .filter((p) => p !== undefined) ?? [];

  return (
    <article className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 sm:pt-24 pb-8">
      <header data-parallax="0.1">
        <p data-anim="intro" className="font-mono text-sm text-stone">
          <Link
            href={`/research#${theme?.slug}`}
            className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
          >
            {theme?.code} {theme?.title}
          </Link>
        </p>
        <h1
          data-anim="intro"
          className="mt-4 font-display font-bold tracking-tight text-4xl sm:text-6xl max-w-3xl"
        >
          {project.title}
        </h1>
        <p
          data-anim="intro"
          className="mt-6 text-xl text-stone leading-relaxed max-w-2xl"
        >
          {project.summary}
        </p>
      </header>

      {/* Timetable-style meta */}
      <dl
        data-depth
        className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 border-y border-line py-6 font-mono text-sm"
      >
        <div>
          <dt className="uppercase tracking-widest text-stone">Years</dt>
          <dd className="mt-1">{project.years}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-widest text-stone">Status</dt>
          <dd className="mt-1 capitalize">{project.status}</dd>
        </div>
        {project.funding && (
          <div>
            <dt className="uppercase tracking-widest text-stone">Funding</dt>
            <dd className="mt-1">{project.funding}</dd>
          </div>
        )}
        {project.collaborators && (
          <div>
            <dt className="uppercase tracking-widest text-stone">With</dt>
            <dd className="mt-1">{project.collaborators.join(" · ")}</dd>
          </div>
        )}
      </dl>

      <div data-depth className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed">
        {project.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {pubs.length > 0 && (
        <section data-depth aria-labelledby="project-pubs" className="mt-16">
          <h2
            id="project-pubs"
            className="font-display font-bold text-2xl tracking-tight"
          >
            From this project
          </h2>
          <div className="mt-2 max-w-3xl">
            {pubs.map((pub) => (
              <PublicationItem key={pub.id} pub={pub} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
