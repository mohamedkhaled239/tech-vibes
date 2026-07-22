// components/casestudy/web/SectionJourney.tsx
// The website told section by section — alternating floating cards
// connected by a drawn line, each one a chapter of the site.

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, WebShowcaseData } from '../../../types/caseStudy'
import { accentGradient, rgba, EASE } from '../lib'
import { Reveal, SectionHeader } from '../primitives'
import BrowserChrome from './BrowserChrome'

export default function SectionJourney({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const web = study.web as WebShowcaseData
  const { accent } = study
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 65%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-24 md:py-32" aria-label="Website sections, one by one">
      <SectionHeader
        eyebrow={t('caseStudy.web.journey.eyebrow')}
        title={t('caseStudy.web.journey.title')}
        accent={accent}
        lead={t('caseStudy.web.journey.lead')}
      />

      <ol ref={ref} className="relative mt-16 space-y-16 md:space-y-24 list-none">
        {/* Connecting spine */}
        <div aria-hidden="true" className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/8" />
        <motion.div
          aria-hidden="true"
          className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] origin-top"
          style={{ scaleY: reduced ? 1 : scaleY, background: accentGradient(accent), boxShadow: `0 0 10px ${rgba(accent.primary, 0.5)}` }}
        />

        {web.sections.map((section, i) => {
          const left = i % 2 === 0
          return (
            <li key={section.name} className="relative md:grid md:grid-cols-2 md:gap-16 items-center">
              {/* Node */}
              <div
                aria-hidden="true"
                className="absolute left-[14px] md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-9 h-9 rounded-full border bg-[#0A091A] z-10 flex items-center justify-center"
                style={{ borderColor: rgba(accent.primary, 0.5), boxShadow: `0 0 18px ${rgba(accent.primary, 0.4)}` }}
              >
                <span className="material-symbols-outlined text-[16px]" style={{ color: accent.primary }}>{section.icon}</span>
              </div>

              {/* Browser card */}
              <motion.div
                className={`pl-12 md:pl-0 ${left ? 'md:col-start-1' : 'md:col-start-2'}`}
                initial={reduced ? false : { opacity: 0, y: 50, rotate: left ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: left ? -1 : 1 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                transition={{ duration: 1, ease: EASE }}
                whileHover={reduced ? undefined : { rotate: 0, scale: 1.02 }}
              >
                <BrowserChrome url={`${web.url}/${section.name.toLowerCase().replace(/\s/g, '-')}`} accent={accent}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={section.src} alt={`${section.name} section of ${study.title}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                </BrowserChrome>
              </motion.div>

              {/* Caption */}
              <Reveal
                delay={0.15}
                className={`pl-12 md:pl-0 mt-6 md:mt-0 ${left ? 'md:col-start-2 md:row-start-1 md:ps-4' : 'md:col-start-1 md:row-start-1 md:text-end md:pe-4'}`}
              >
                <span
                  className="font-['Sora'] text-[13px] font-extrabold uppercase tracking-[0.3em] bg-clip-text text-transparent"
                  style={{ backgroundImage: accentGradient(accent) }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-['Sora'] text-[26px] md:text-[32px] font-bold text-[#e2dfff] mt-2 tracking-tight">{section.name}</h3>
                <p className={`font-['Inter'] text-[15px] leading-[1.7] text-[#c9c5d0] mt-3 max-w-md ${left ? '' : 'md:ms-auto'}`}>
                  {section.description}
                </p>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
