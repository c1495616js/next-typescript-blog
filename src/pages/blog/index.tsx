import { GetStaticProps } from 'next'
import { Fragment } from 'react'

import { getAllFrontMatters } from '@/lib/mdx'

import { Contact } from '@/components/Contact'
import { Blog24 } from '@/components/Icons'
import { PostList } from '@/components/PostList'
import SEO  from '@/components/Seo'

import { Frontmatter } from '@/types/frontmatter'

export default function Blog({ posts }: { posts: Frontmatter[] }) {
  return (
    <Fragment>
      <SEO title="Blog" />
      <span className="inline-flex p-3 rounded-full bg-back-subtle">
        <Blog24 />
      </span>
      <h1 className="mt-3 mb-2 text-2xl font-bold tracking-tight text-accent">
        Blog
      </h1>

      <p className="max-w-md mb-12 text-fore-subtle">
        I <em className="italic">sometimes</em> write about things I learn in
        web development and also stuff that I find interesting
      </p>
      <PostList posts={posts} />
      <Contact />
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const posts = await getAllFrontMatters()
  return { props: { posts } }
}
