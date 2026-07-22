// components/casestudy/web/ScrollThroughSite.tsx
// A pinned browser that scrolls through the actual website while the
// visitor scrolls the page — with highlight labels per section.

import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, WebShowcaseData } from '../../../types/caseStudy'
import { accentGradient, rgba, EASE } from '../lib'
import BrowserChrome from './BrowserChrome'

export default function ScrollThroughSite({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const web = study.web as WebShowcaseData
  const { accent } = study
  const reduced = useReducedMotion()
  const outerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const count = web.sections.length
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

  // The inner "page" is `count` screens tall; slide it up as we scroll.
  const pageY = useTransform(smooth, [0, 1], ['0%', `-${((count - 1) / count) * 100}%`])
  // Mini scrollbar inside the browser
  const thumbTop = useTransform(smooth, [0, 1], ['2%', '78%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count))))
  })

  return (
    <section ref={outerRef} className="relative" style={{ height: `${count * 90}vh` }} aria-label="Scroll through the live website">
      <div className="sticky top-0 min-h-screen flex items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(60% 50% at 30% 50%, ${rgba(accent.primary, 0.07)}, transparent 70%)` }}
        />
        <div className="relative w-full max-w-[1280px] mx-auto px-[16px] md:px-[64px] grid lg:grid-cols-12 gap-8 lg:gap-10 items-center py-16 lg:py-20">
          {/* Narrative column */}
          <div className="lg:col-span-4">
            <span
              className="font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.25em]"
              style={{ color: accent.primary }}
            >
              {t('caseStudy.web.scroll.eyebrow')}
            </span>
            <h2 className="font-['Sora'] text-[clamp(28px,3.6vw,42px)] font-bold tracking-tight leading-[1.12] text-[#e2dfff] mt-4">
              {t('caseStudy.web.scroll.headingLine1')}<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGradient(accent) }}>
                {t('caseStudy.web.scroll.headingLine2')}
              </span>
            </h2>

            {/* Section index — desktop only; on mobile the sticky viewport can't
                fit heading + index + browser, and the in-browser highlight chip
                already announces the active section */}
            <ol className="mt-10 space-y-1 list-none hidden lg:block" aria-label="Website sections">
              {web.sections.map((section, i) => (
                <li key={section.name}>
                  <div
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 border-s-2 transition-all duration-500 ${
                      i === active ? 'bg-white/5' : 'opacity-40'
                    }`}
                    style={{ borderInlineStartColor: i === active ? accent.primary : 'transparent' }}
                    aria-current={i === active ? 'step' : undefined}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ color: i === active ? accent.primary : '#c9c5d0' }}
                      aria-hidden="true"
                    >
                      {section.icon}
                    </span>
                    <span className="font-['Sora'] text-[14px] font-semibold text-[#e2dfff]">{section.name}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Pinned browser */}
          <div className="lg:col-span-8">
            <div className="relative">
              <BrowserChrome url={`${web.url}`} accent={accent} glow>
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* The tall page: stacked sections sliding upward */}
                  <motion.div className="absolute inset-x-0 top-0" style={{ y: reduced ? undefined : pageY }}>
                    {web.sections.map((section) => (
                      <div key={section.name} className="aspect-[16/10] w-full overflow-hidden">
                        <img src={section.src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </motion.div>

                  {/* Browser scrollbar */}
                  <div aria-hidden="true" className="absolute right-1 top-1 bottom-1 w-1.5 rounded-full bg-white/5">
                    <motion.div
                      className="absolute right-0 w-1.5 h-[20%] rounded-full"
                      style={{ top: thumbTop, background: rgba(accent.primary, 0.6) }}
                    />
                  </div>

                  {/* Highlight label — one per section */}
                  <div className="absolute left-4 bottom-4 z-20">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="inline-flex items-center gap-2.5 rounded-full border backdrop-blur-xl ps-2 pe-4 py-1.5"
                        style={{ borderColor: rgba(accent.primary, 0.35), background: 'rgba(10,9,26,0.75)' }}
                        role="status"
                      >
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: rgba(accent.primary, 0.15) }}
                          aria-hidden="true"
                        >
                          <span className="material-symbols-outlined text-[13px]" style={{ color: accent.primary }}>
                            {web.sections[active].icon}
                          </span>
                        </span>
                        <span className="font-['Geist'] text-[12px] font-semibold text-[#e2dfff]">
                          {web.highlights[active] ?? web.sections[active].name}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </BrowserChrome>

              {/* Ambient glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[3rem] blur-[80px]"
                style={{ background: rgba(accent.primary, 0.1) }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
