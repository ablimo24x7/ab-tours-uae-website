import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ArrowIcon } from '@/components/ArrowIcon'
import { PlainHero } from '@/components/PlainHero'
import { getBlogPosts } from '@/content'

export default function BlogListPage() {
  const posts = getBlogPosts()

  return (
    <>
      <PlainHero
        eyebrow="Resources"
        title="Blog"
        lead="Stories and news from the AB Tours UAE team."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Blog' },
        ]}
      />

      <section className="pad">
        <div className="wrap">
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="jrow rv"
              href={`/resources/blog/${post.slug}`}
            >
              <div className="img" style={{ position: 'relative' }}>
                <Image
                  src={post.cardImage.url}
                  alt={post.cardImage.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <span className="eyebrow">
                  {post.date} · {post.category}
                </span>
                <h3>{post.title}</h3>
                <p style={{ color: '#3C4A66', marginBottom: '20px' }}>{post.summary}</p>
                <span className="link">
                  Read more <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
