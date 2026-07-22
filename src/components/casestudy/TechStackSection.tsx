// components/casestudy/TechStackSection.tsx
// The engineering toolkit — staggered badges with hover lift and glow.

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { rgba, EASE } from './lib'
import { SectionHeader } from './primitives'

export default function TechStackSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const { accent } = study
  const reduced = useReducedMotion()

  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-20 md:py-24" aria-label="Technology stack">
      <SectionHeader eyebrow={t('caseStudy.techStack.eyebrow')} title={t('caseStudy.techStack.title')} accent={accent} />

      <ul className="flex flex-wrap gap-3 mt-10 list-none" dir="ltr">
        {study.techStack.map((tech, i) => (
          <motion.li
            key={tech}
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
          >
            <span
              className="inline-flex items-center gap-2 font-['Geist'] text-[13px] font-semibold px-5 py-2.5 rounded-full border bg-[#15124d]/60 text-[#e2dfff] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ borderColor: rgba(accent.primary, 0.2) }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 24px -8px ${rgba(accent.primary, 0.5)}`
                e.currentTarget.style.borderColor = rgba(accent.primary, 0.55)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = rgba(accent.primary, 0.2)
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent.primary }} aria-hidden="true" />
              {tech}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
