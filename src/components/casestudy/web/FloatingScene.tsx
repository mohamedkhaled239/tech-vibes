// components/casestudy/web/FloatingScene.tsx
// A depth field of browser windows — angled, overlapping, partially cropped,
// drifting on idle float loops and shifting with cursor parallax.

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, WebShowcaseData } from '../../../types/caseStudy'
import { rgba } from '../lib'
import { SectionHeader } from '../primitives'
import BrowserChrome from './BrowserChrome'
import { useMouseParallax, useParallaxLayer } from './hooks'

interface WindowSpec {
  /** index into web.sections for the screenshot */
  section: number
  className: string
  depth: number
  rotate: number
  float: number // idle float amplitude px
  z: number
  dim?: boolean
}

// Editorial composition — tuned by hand, not a grid. The two dimmed
// background windows are hidden below `sm`: on a phone-width canvas four
// overlapping browsers turn into unreadable clutter, so mobile keeps only
// the two hero windows (wider there to stay legible).
const WINDOWS: WindowSpec[] = [
  { section: 0, className: 'left-[2%] top-[6%] w-[72%] sm:left-[6%] sm:top-[10%] sm:w-[54%]', depth: 22, rotate: -4, float: 10, z: 30 },
  { section: 1, className: 'hidden sm:block right-[-4%] top-[2%] w-[42%]', depth: 46, rotate: 5, float: 14, z: 20, dim: true },
  { section: 2, className: 'hidden sm:block left-[-6%] bottom-[4%] w-[38%]', depth: 60, rotate: 6, float: 12, z: 10, dim: true },
  { section: 3, className: 'right-[2%] bottom-[4%] w-[64%] sm:right-[8%] sm:bottom-[-6%] sm:w-[46%]', depth: 34, rotate: -3, float: 16, z: 25 },
]

export default function FloatingScene({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const web = study.web as WebShowcaseData
  const { accent } = study
  const reduced = useReducedMotion()
  const { mx, my, handlers } = useMouseParallax()

  // One parallax layer per depth — hooks called at fixed count (WINDOWS is static)
  const layers = WINDOWS.map((w) => useParallaxLayer(mx, my, w.depth)) // eslint-disable-line react-hooks/rules-of-hooks

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Website at a glance">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(70% 55% at 50% 40%, ${rgba(accent.primary, 0.07)}, transparent 72%)` }}
      />
      <div className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <SectionHeader
          eyebrow={t('caseStudy.web.floating.eyebrow')}
          title={t('caseStudy.web.floating.title')}
          accent={accent}
          align="center"
          lead={t('caseStudy.web.floating.lead')}
        />

        {/* The depth field */}
        <div
          {...handlers}
          className="relative mt-16 h-[420px] sm:h-[520px] md:h-[640px]"
          style={{ perspective: '1400px' }}
          role="img"
          aria-label={`Floating browser windows previewing ${study.title} pages`}
        >
          {WINDOWS.map((spec, i) => {
            const section = web.sections[spec.section % web.sections.length]
            return (
              <motion.div
                key={section.name}
                className={`absolute ${spec.className}`}
                style={{ zIndex: spec.z, x: layers[i].x, y: layers[i].y, transformStyle: 'preserve-3d' }}
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 60, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: spec.rotate }}
                  viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                  transition={{ duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={reduced ? undefined : { y: [0, -spec.float, 0] }}
                    transition={{ repeat: Infinity, duration: 7 + i * 1.3, ease: 'easeInOut' }}
                    className={spec.dim ? 'opacity-70' : ''}
                  >
                    <BrowserChrome url={`${web.url}/${section.name.toLowerCase()}`} accent={accent}>
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={section.src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>
                    </BrowserChrome>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}

          {/* Breathing glow behind the composition */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full blur-[120px] -z-10"
            style={{ background: rgba(accent.primary, 0.12) }}
            animate={reduced ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}
