import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { Ornament } from '@/components/Ornament'
import { PageHero } from '@/components/PageHero'
import { getBlogPost, getBlogPosts } from '@/content'

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ post: p.slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ post: string }>
}) {
  const { post: slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <>
      <PageHero
        image={post.cardImage}
        eyebrow={`${post.date} · ${post.category}`}
        title={post.title}
        lead={post.summary}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Blog', href: '/resources/blog' },
          { label: post.title },
        ]}
      />

      <section className="pad">
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <div className="rv">
            <Ornament />
            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '12px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginTop: '18px',
                marginBottom: '20px',
              }}
            >
              {post.date} · {post.category}
            </p>
            {post.bodyParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                style={{ color: '#3C4A66', fontSize: '16.5px', marginBottom: '18px' }}
              >
                {paragraph}
              </p>
            ))}
            <p style={{ marginTop: '32px' }}>
              <Link className="link" href="/resources/blog">
                Back to blog <ArrowIcon />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
