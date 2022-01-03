import fs from 'fs/promises';
import globby from 'globby';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import readingTime from 'reading-time';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

import rehypeHighlightCode from './rehype-highlight-code';
import rehypeMetaAttribute from './rehype-meta-attribute';

import type { Frontmatter } from '@/types/frontmatter';

const MDX_PATH = 'content/blog';

async function getMdxBySlug(slug) {
  return getMdxByPath(path.join(MDX_PATH, `${slug}.mdx`));
}

async function getMdxByPath(mdxPath) {
  const slug = path.basename(mdxPath).replace(path.extname(mdxPath), '');
  const source = await fs.readFile(path.join(process.cwd(), mdxPath), 'utf8');
  const { code, frontmatter } = await bundleMDX({
    source,
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeMetaAttribute,
        // rehypeHighlightCode,
        rehypeAccessibleEmojis,
        rehypeSlug,
        rehypePrism,
        [rehypeHeadings, { behavior: 'append' }],
      ];
      return options;
    },
  });
  console.log(code);
  return {
    code,
    frontmatter: {
      ...(frontmatter as Frontmatter),
      slug,
      readingTime: readingTime(code),
    } as Frontmatter,
  };
}

async function getAllFrontMatters(): Promise<Frontmatter[]> {
  const paths = await globby([`${MDX_PATH}/**/*.mdx`]);
  const matters = await Promise.all(
    paths.map(async (filePath) => {
      const source = await fs.readFile(filePath, 'utf8');
      const { code, frontmatter } = await bundleMDX({ source });
      return {
        ...(frontmatter as Frontmatter),
        slug: path.basename(filePath).replace('.mdx', ''),
        readingTime: readingTime(code, { wordsPerMinute: 300 }),
      };
    })
  );

  return matters
    .filter(Boolean)
    .filter((post) => post.isPublished)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export { getAllFrontMatters, getMdxByPath, getMdxBySlug };
