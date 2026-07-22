// components/casestudy/web/PerformancePanel.tsx
// Engineering scorecard — Lighthouse-style gauges that sweep in on scroll.

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, WebShowcaseData } from '../../../types/caseStudy'
import { rgba, EASE } from '../lib'
import { Counter, Reveal, SectionHeader, NoiseOverlay } from '../primitives'

const R = 44
const CIRC = 2 * Math.PI * R

function Gauge({ label, value, accent, delay }: { label: string; value: number; accent: CaseStudy['accent']; delay: number }) {
  const reduced = useReducedMotion()
  const target = CIRC * (1 - value / 100)
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="relative w-28 h-28 md:w-32 md:h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(226,223,255,0.08)" strokeWidth="7" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={accent.primary}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={reduced ? { strokeDashoffset: target } : { strokeDashoffset: CIRC }}
            whileInView={{ strokeDashoffset: target }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 1.6, delay, ease: EASE }}
            style={{ filter: `drop-shadow(0 0 6px ${rgba(accent.primary, 0.6)})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-['Sora'] text-[26px] md:text-[30px] font-extrabold text-[#e2dfff]">
            <Counter value={value} />
          </span>
        </div>
      </div>
      <span className="font-['Geist'] text-[12px] font-semibold uppercase tracking-[0.15em] text-[#c9c5d0] mt-4">{label}</span>
    </div>
  )
}

export default function PerformancePanel({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const web = study.web as WebShowcaseData
  const { accent } = study
  const scores: [string, number][] = [
    [t('caseStudy.web.performance.performance'), web.lighthouse.performance],
    [t('caseStudy.web.performance.accessibility'), web.lighthouse.accessibility],
    [t('caseStudy.web.performance.bestPractices'), web.lighthouse.bestPractices],
    [t('caseStudy.web.performance.seo'), web.lighthouse.seo],
  ]

  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-20 md:py-28" aria-label="Lighthouse performance scores">
      <SectionHeader
        eyebrow={t('caseStudy.web.performance.eyebrow')}
        title={t('caseStudy.web.performance.title')}
        accent={accent}
        align="center"
        lead={t('caseStudy.web.performance.lead')}
      />

      <Reveal delay={0.1} className="mt-14">
        <div
          className="relative rounded-[2.5rem] border overflow-hidden grid grid-cols-2 md:grid-cols-4"
          style={{
            borderColor: rgba(accent.primary, 0.2),
            background: `linear-gradient(140deg, ${rgba(accent.surface, 0.8)}, rgba(21,18,77,0.45))`,
          }}
        >
          <NoiseOverlay opacity={0.04} />
          {scores.map(([label, value], i) => (
            <div key={label} className={`${i % 2 === 1 ? 'border-s border-white/5' : ''} ${i >= 2 ? 'border-t md:border-t-0 border-white/5' : ''} ${i > 0 ? 'md:border-s md:border-white/5' : ''}`}>
              <Gauge label={label} value={value} accent={accent} delay={i * 0.15} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
