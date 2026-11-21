import Image from 'next/image'
import React from 'react'
import type { MomentPhotoItem } from '@/content/types'

export interface MomentsWallBlockProps {
  hashtag: string
  heading: string
  intro: string
  topRow: MomentPhotoItem[]
  bottomRow: MomentPhotoItem[]
}

export function MomentsWallBlock({
  hashtag,
  heading,
  intro,
  topRow,
  bottomRow,
}: MomentsWallBlockProps) {
  const rows = [
    { items: [...topRow, ...topRow], rev: false },
    { items: [...bottomRow, ...bottomRow], rev: true },
  ]

  return (
    <section className="pad-s">
      <div className="wrap">
        <div className="head rv">
          <div>
            <span className="eyebrow">{hashtag}</span>
            <h2>{heading}</h2>
            <p>{intro}</p>
          </div>
        </div>
      </div>
      <div className="moments">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`row${row.rev ? ' rev' : ''}`}>
            {row.items.map((item, idx) => (
              <figure key={`${rowIndex}-${item.caption}-${idx}`}>
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  sizes="320px"
                  style={{ objectFit: 'cover' }}
                />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
