// components/casestudy/SolutionSection.tsx
// How we solved it — a wide statement paragraph and three pillar cards.

import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { rgba } from './lib'
import { Reveal, SectionHeader, NoiseOverlay } from './primitives'

export default function SolutionSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const { accent } = study
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Our solution">
      {/* Ambient wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(60% 50% at 50% 0%, ${rgba(accent.primary, 0.07)}, transparent 70%)` }}
      />
      <div className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <SectionHeader eyebrow={t('caseStudy.solution.eyebrow')} title={t('caseStudy.solution.title')} accent={accent} align="center" />

        <Reveal delay={0.15} className="mt-8">
          <p className="font-['Sora'] text-[clamp(20px,2.6vw,30px)] font-semibold leading-[1.5] tracking-tight text-[#e2dfff]/95 text-center max-w-4xl mx-auto">
            {study.solution.intro}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {study.solution.points.map((point, i) => (
            <Reveal key={point.title} delay={0.1 + i * 0.12}>
              <div
                className="group relative h-full rounded-3xl p-8 border backdrop-blur-md overflow-hidden transition-transform duration-500 hover:-translate-y-2"
                style={{
                  borderColor: rgba(accent.primary, 0.15),
                  background: 'rgba(31, 29, 87, 0.35)',
                }}
              >
                <NoiseOverlay opacity={0.03} />
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: rgba(accent.primary, 0.2) }}
                />
                <div
                  className="relative w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: rgba(accent.primary, 0.12), color: accent.primary, boxShadow: `0 0 24px -6px ${rgba(accent.primary, 0.4)}` }}
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[22px]">{point.icon}</span>
                </div>
                <h3 className="relative font-['Sora'] text-[18px] font-bold text-[#e2dfff] mb-3">{point.title}</h3>
                <p className="relative font-['Inter'] text-[14.5px] leading-[1.7] text-[#c9c5d0]">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
