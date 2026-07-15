import type { Metadata } from "next";
import { getProfile, getPublications } from "@/lib/content";
import { PageIntro } from "@/components/primitives";
import { PublicationList } from "./publication-list";

export const metadata: Metadata = {
  title: "Publications",
};

export default async function PublicationsPage() {
  const publications = await getPublications();
  const profile = await getProfile();
  const cv = profile.links.find((link) => link.label === "CV");

  return (
    <>
      <PageIntro
        title="Peer-reviewed journal publications since 2020"
        centerLede
        lede={
          <>
            Journal articles since 2020, with students and collaborators.
            {cv && (
              <>
                {" "}
                For a full list of publications, see my{" "}
                <a
                  href={cv.url}
                  className="text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
                >
                  CV
                </a>
                .
              </>
            )}
          </>
        }
      />
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-8">
        <PublicationList publications={publications} />
      </div>
    </>
  );
}
