import fs from "node:fs";
import path from "node:path";

export function generateStaticParams() {
  return fs
    .readdirSync(path.join(process.cwd(), "content/blog"))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function Post({ params }) {
  const { slug } = await params;
  const { default: Body, frontmatter } = await import(`../../../content/blog/${slug}.mdx`);
  return (
    <article>
      <h1 data-editable="text" data-type="span" data-prop="title">
        {frontmatter.title}
      </h1>
      <div data-editable="text" data-type="block" data-prop="@content">
        <Body />
      </div>
    </article>
  );
}
