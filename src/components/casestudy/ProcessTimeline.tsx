// components/casestudy/ProcessTimeline.tsx
// Scroll-driven vertical timeline — the spine draws itself as you read,
// steps alternate sides on desktop.

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { accentGradient, rgba } from './lib'
import { Reveal, SectionHeader } from './primitives'

export default function ProcessTimeline({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const { accent } = study
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-24 md:py-32" aria-label="Design and development process">
      <SectionHeader
        eyebrow={t('caseStudy.process.eyebrow')}
        title={t('caseStudy.process.title')}
        accent={accent}
        align="center"
        lead={t('caseStudy.process.lead')}
      />

      <ol ref={ref} className="relative mt-20 space-y-14 md:space-y-20 list-none">
        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/8"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] origin-top"
          style={{ scaleY: reduced ? 1 : scaleY, background: accentGradient(accent), boxShadow: `0 0 12px ${rgba(accent.primary, 0.5)}` }}
        />

        {study.process.map((step, i) => {
          const left = i % 2 === 0
          return (
            <li key={step.phase} className="relative md:grid md:grid-cols-2 md:gap-20 items-start">
              {/* Node */}
              <div
                aria-hidden="true"
                className="absolute left-[19px] md:left-1/2 top-1 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-[#0A091A] z-10"
                style={{ borderColor: accent.primary, boxShadow: `0 0 16px ${rgba(accent.primary, 0.6)}` }}
              />
              <Reveal
                y={30}
                className={`pl-14 md:pl-0 ${left ? 'md:col-start-1 md:text-end md:pe-4' : 'md:col-start-2 md:ps-4'}`}
              >
                <div
                  className={`inline-block rounded-3xl border p-7 md:p-8 backdrop-blur-md text-start transition-transform duration-500 hover:-translate-y-1.5 max-w-md ${
                    left ? 'md:ms-auto' : ''
                  }`}
                  style={{ borderColor: rgba(accent.primary, 0.15), background: 'rgba(31, 29, 87, 0.35)' }}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="font-['Sora'] text-[26px] font-extrabold bg-clip-text text-transparent"
                      style={{ backgroundImage: accentGradient(accent) }}
                    >
                      {step.phase}
                    </span>
                    <h3 className="font-['Sora'] text-[19px] font-bold text-[#e2dfff]">{step.title}</h3>
                  </div>
                  <p className="font-['Inter'] text-[14.5px] leading-[1.7] text-[#c9c5d0] mb-4">{step.description}</p>
                  <span
                    className="inline-flex items-center gap-1.5 font-['Geist'] text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ color: accent.primary, background: rgba(accent.primary, 0.1) }}
                  >
                    <span className="material-symbols-outlined text-[13px]" aria-hidden="true">schedule</span>
                    {step.duration}
                  </span>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
