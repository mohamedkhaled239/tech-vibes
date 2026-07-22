// components/casestudy/OverviewSection.tsx
// The story setup — client problem, business goals and key challenges,
// laid out on an asymmetric editorial grid.

import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { rgba } from './lib'
import { Reveal, SectionHeader } from './primitives'

export default function OverviewSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const { accent } = study
  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-24 md:py-32" aria-labelledby="overview-heading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sticky narrative column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeader eyebrow={t('caseStudy.overview.eyebrow')} title={t('caseStudy.overview.title')} accent={accent} />
            <Reveal delay={0.15}>
              <p className="font-['Inter'] text-[17px] leading-[1.8] text-[#c9c5d0] mt-6">{study.problem}</p>
            </Reveal>
          </div>
        </div>

        {/* Goals + challenges */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={0.1}>
            <div
              className="rounded-3xl p-8 md:p-10 border backdrop-blur-md relative overflow-hidden"
              style={{ borderColor: rgba(accent.primary, 0.18), background: `linear-gradient(140deg, ${rgba(accent.primary, 0.07)}, rgba(31,29,87,0.35))` }}
            >
              <h3 id="overview-heading" className="font-['Sora'] text-[20px] font-bold text-[#e2dfff] mb-6 flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: rgba(accent.primary, 0.12), color: accent.primary }}
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[20px]">flag</span>
                </span>
                {t('caseStudy.overview.goalsHeading')}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {study.goals.map((goal, i) => (
                  <li key={goal} className="flex items-start gap-3 font-['Inter'] text-[15px] leading-[1.6] text-[#e2dfff]/90">
                    <span className="font-['Geist'] text-[12px] font-bold mt-0.5 shrink-0" style={{ color: accent.primary }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {study.challenges.map((challenge, i) => (
              <Reveal key={challenge} delay={0.15 + i * 0.1}>
                <div
                  className="h-full rounded-2xl p-6 border bg-[#15124d]/40 backdrop-blur-md transition-colors duration-300 hover:bg-[#15124d]/70"
                  style={{ borderColor: rgba(accent.primary, 0.12) }}
                >
                  <span className="material-symbols-outlined text-[22px] mb-4 block" style={{ color: accent.secondary }} aria-hidden="true">
                    warning
                  </span>
                  <p className="font-['Inter'] text-[14px] leading-[1.6] text-[#c9c5d0]">{challenge}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
