import fs from "node:fs";
import path from "node:path";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { mdxComponents } from "../../components/mdx-components";

const dir = path.join(process.cwd(), "content/notes");

export function getStaticPaths() {
  const paths = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ params: { slug: file.replace(/\.mdx$/, "") } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const raw = fs.readFileSync(path.join(dir, `${params.slug}.mdx`), "utf8");
  const source = await serialize(raw, { parseFrontmatter: true });
  return { props: { source } };
}

export default function Note({ source }) {
  return (
    <article>
      <h1 data-editable="text" data-type="span" data-prop="title">
        {source.frontmatter.title}
      </h1>
      <div data-editable="text" data-type="block" data-prop="@content">
        <MDXRemote {...source} components={mdxComponents} />
      </div>
    </article>
  );
}
