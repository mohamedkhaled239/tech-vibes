// components/casestudy/FeaturesSection.tsx
// Feature grid — floating glass cards with icon glow micro-interactions.

import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { rgba } from './lib'
import { Reveal, SectionHeader } from './primitives'

export default function FeaturesSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const { accent } = study
  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-24 md:py-32" aria-label="Key features">
      <SectionHeader eyebrow={t('caseStudy.features.eyebrow')} title={t('caseStudy.features.title')} accent={accent} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
        {study.features.map((feature, i) => (
          <Reveal key={feature.title} delay={(i % 3) * 0.1}>
            <div
              className="group h-full rounded-3xl border p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden"
              style={{ borderColor: rgba(accent.primary, 0.12), background: 'rgba(31, 29, 87, 0.3)' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${rgba(accent.primary, 0.6)}, transparent)` }}
              />
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                style={{ background: rgba(accent.primary, 0.1), color: accent.primary }}
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-[20px]">{feature.icon}</span>
              </div>
              <h3 className="font-['Sora'] text-[16px] font-bold text-[#e2dfff] mb-2">{feature.title}</h3>
              <p className="font-['Inter'] text-[14px] leading-[1.65] text-[#c9c5d0]">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
