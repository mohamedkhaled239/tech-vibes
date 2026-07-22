// components/casestudy/ShowcaseGallery.tsx
// Category-aware UI showcase: phones for mobile projects, wide browser
// frames for web, tablets sprinkled in. Every frame opens the lightbox.

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, GalleryItem } from '../../types/caseStudy'
import { rgba } from './lib'
import { Reveal, SectionHeader } from './primitives'
import { PhoneFrame, BrowserFrame, TabletFrame } from './DeviceFrames'
import Lightbox from './Lightbox'

function Frame({
  item,
  study,
  onOpen,
  className,
}: {
  item: GalleryItem
  study: CaseStudy
  onOpen: () => void
  className?: string
}) {
  const props = { src: item.src, alt: item.alt, accent: study.accent, onClick: onOpen, className }
  if (item.device === 'phone') return <PhoneFrame {...props} />
  if (item.device === 'tablet') return <TabletFrame {...props} />
  return <BrowserFrame {...props} />
}

export default function ShowcaseGallery({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const { accent, gallery, category } = study

  const phones = gallery.filter((g) => g.device === 'phone')
  const others = gallery.filter((g) => g.device !== 'phone')
  const idx = (item: GalleryItem) => gallery.indexOf(item)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Interface showcase">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(70% 50% at 50% 50%, ${rgba(accent.primary, 0.05)}, transparent 75%)` }}
      />
      <div className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <SectionHeader
          eyebrow={t('caseStudy.showcase.eyebrow')}
          title={category === 'mobile' ? t('caseStudy.showcase.titleMobile') : t('caseStudy.showcase.titleDefault')}
          accent={accent}
          align="center"
          lead={t('caseStudy.showcase.lead')}
        />

        {/* Mobile-first layout: staggered phone lineup */}
        {phones.length > 0 && (
          <div className="flex flex-wrap justify-center items-end gap-8 md:gap-12 mt-16">
            {phones.map((item, i) => (
              <Reveal key={item.src + i} delay={i * 0.12} className={i % 2 === 1 ? 'md:mb-14' : ''}>
                <Frame item={item} study={study} onOpen={() => setLightbox(idx(item))} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Wide layout: browsers and tablets */}
        {others.length > 0 && (
          <div className={`grid gap-8 mt-16 ${others.length > 1 ? 'lg:grid-cols-12' : ''}`}>
            {others.map((item, i) => {
              const wide = item.device === 'desktop'
              return (
                <Reveal
                  key={item.src + i}
                  delay={i * 0.1}
                  className={others.length > 1 ? (wide ? 'lg:col-span-7' : 'lg:col-span-5 self-end') : ''}
                >
                  <Frame item={item} study={study} onOpen={() => setLightbox(idx(item))} />
                </Reveal>
              )
            })}
          </div>
        )}
      </div>

      <Lightbox items={gallery} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </section>
  )
}
