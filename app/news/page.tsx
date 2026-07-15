import type { Metadata } from "next";
import { getNews } from "@/lib/content";
import { CategoryTag, PageIntro, formatDate } from "@/components/primitives";

export const metadata: Metadata = {
  title: "News",
};

export default async function NewsPage() {
  const posts = await getNews();

  return (
    <>
      <PageIntro
        title="Lab notebook"
        lede="Papers, talks, grants, coverage, and arrivals — newest first."
      />
      <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-8">
        {posts.map((post) => (
          <article
            key={post.id}
            data-depth
            className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-8 py-8 border-b border-line"
          >
            <div className="flex sm:flex-col gap-3 items-baseline sm:items-start">
              <time dateTime={post.date} className="font-mono text-sm text-stone">
                {formatDate(post.date)}
              </time>
              <CategoryTag category={post.category} />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight leading-snug">
                {post.title}
              </h2>
              <p className="mt-3 text-lg text-stone leading-relaxed">
                {post.body}
              </p>
              {post.link && (
                <a
                  href={post.link.url}
                  className="mt-3 inline-block font-mono text-sm text-moss underline underline-offset-4 decoration-line hover:decoration-moss"
                >
                  {post.link.label}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
