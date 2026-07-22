// components/casestudy/ResultsSection.tsx
// The payoff — oversized animated statistics on a glowing band.

import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { accentGradient, rgba } from './lib'
import { Counter, Reveal, SectionHeader, NoiseOverlay } from './primitives'

export default function ResultsSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const { accent } = study
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Project results">
      <div className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <SectionHeader eyebrow={t('caseStudy.results.eyebrow')} title={t('caseStudy.results.title')} accent={accent} align="center" />

        <Reveal delay={0.1} className="mt-16">
          <div
            className="relative rounded-[2.5rem] border overflow-hidden"
            style={{
              borderColor: rgba(accent.primary, 0.2),
              background: `linear-gradient(140deg, ${rgba(accent.surface, 0.85)}, rgba(21,18,77,0.5))`,
            }}
          >
            <NoiseOverlay opacity={0.05} />
            <div
              aria-hidden="true"
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60%] h-64 rounded-full blur-[100px]"
              style={{ background: rgba(accent.primary, 0.15) }}
            />
            <dl className="relative grid grid-cols-2 lg:grid-cols-4">
              {study.results.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-8 md:p-12 text-center ${i % 2 === 1 ? 'border-s border-white/5' : ''} ${
                    i >= 2 ? 'border-t lg:border-t-0 border-white/5' : ''
                  } ${i > 0 ? 'lg:border-s lg:border-white/5' : ''}`}
                >
                  <dd
                    dir="ltr"
                    className="font-['Sora'] text-[clamp(34px,4.5vw,56px)] font-extrabold tracking-tight bg-clip-text text-transparent"
                    style={{ backgroundImage: accentGradient(accent) }}
                  >
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
                  </dd>
                  <dt className="mt-3">
                    <span className="block font-['Geist'] text-[13px] font-bold uppercase tracking-[0.15em] text-[#e2dfff]">
                      {stat.label}
                    </span>
                    {stat.sublabel && (
                      <span className="block font-['Inter'] text-[12.5px] text-[#c9c5d0]/70 mt-1">{stat.sublabel}</span>
                    )}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
