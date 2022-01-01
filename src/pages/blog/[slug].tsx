import classNames from 'classnames';
import { format, parseISO } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment, useMemo } from 'react';

import { getAllFrontMatters, getMdxBySlug } from '@/lib/mdx';

import { components } from '@/components/MdxComponents';
import { QuickNav } from '@/components/QuickNav';

import type { Frontmatter } from '@/types/frontmatter';

type Post = {
  frontmatter: Frontmatter;
  code: string;
};

export default function BlogPost({
  post: { code, frontmatter },
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const publishedAt = parseISO(frontmatter.publishedAt);
  const updatedAt = frontmatter.updatedAt
    ? parseISO(frontmatter.updatedAt)
    : undefined;

  return (
    <Fragment>
      <div
        className={classNames(
          'flex relative justify-between mt-12 mb-12 xl:-mr-52',
          {
            'flex-row-reverse': Boolean(frontmatter.toc),
          }
        )}
      >
        {frontmatter.toc && (
          <aside className='hidden sticky top-16 mt-8 ml-6 max-w-xs h-screen xl:block'>
            <QuickNav />
          </aside>
        )}
        <article className='text-fore-subtle min-w-0 max-w-3xl text-base lg:text-lg'>
          <div className='text-fore-subtle mb-2 text-sm tracking-normal'>
            <span>
              <time dateTime={publishedAt.toISOString()}>
                {format(publishedAt, 'MMMM dd yyyy')}
              </time>
            </span>
            <span> • </span>
            <span>{frontmatter.readingTime.text}</span>
            {updatedAt && (
              <Fragment>
                <span> • </span>
                <span className='italic'>
                  Last updated:{' '}
                  <time dateTime={updatedAt.toISOString()}>
                    {format(updatedAt, 'MMMM dd yyyy')}
                  </time>
                </span>
              </Fragment>
            )}
          </div>
          <h1 className='text-fore-primary mb-10 text-4xl font-extrabold lg:text-5xl'>
            {frontmatter.title}
          </h1>
          <Component components={components} />
        </article>
      </div>
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllFrontMatters();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { code, frontmatter } = await getMdxBySlug(context.params.slug);
  return {
    props: {
      post: {
        code,
        frontmatter,
      } as Post,
    },
  };
};
