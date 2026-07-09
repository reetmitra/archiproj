import type { Metadata } from "next";
import { getPublications } from "@/lib/content";
import { PageIntro } from "@/components/primitives";
import { PublicationList } from "./publication-list";

export const metadata: Metadata = {
  title: "Publications",
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <>
      <PageIntro
        eyebrow="Publications"
        title="What I've written"
        lede="Journal articles, conference papers, and reports — with students and collaborators. Where I can, I link an open-access version."
      />
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-8">
        <PublicationList publications={publications} />
      </div>
    </>
  );
}
