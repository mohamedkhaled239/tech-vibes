// components/casestudy/RelatedProjects.tsx
// Scroll-snap carousel of other case studies, each tinted by its own accent.

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { getRelated } from '../../data/caseStudies'
import { accentGradient, rgba } from './lib'
import { Reveal, SectionHeader } from './primitives'

export default function RelatedProjects({ study }: { study: CaseStudy }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  const related = getRelated(study, lang)
  if (related.length === 0) return null

  return (
    <section className="relative py-24 md:py-28 overflow-hidden" aria-label="Related projects">
      <div className="max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow={t('caseStudy.related.eyebrow')} title={t('caseStudy.related.title')} accent={study.accent} />
          <Reveal delay={0.1}>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-2 font-['Geist'] text-[13px] font-semibold text-[#c9c5d0] hover:text-[#e2dfff] transition-colors mb-2"
            >
              {t('caseStudy.related.allProjects')}
              <span className="material-symbols-outlined i18n-flip text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto mt-12">
        <ul
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-[16px] md:px-[64px] pb-6 list-none scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {related.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1} className="snap-start shrink-0 w-[85%] sm:w-[420px]">
              <li className="h-full">
                <Link
                  to={`/portfolio/${project.id}`}
                  className="group block h-full rounded-3xl border overflow-hidden transition-transform duration-500 hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={{ borderColor: rgba(project.accent.primary, 0.18), background: 'rgba(31, 29, 87, 0.35)' }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={project.heroImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to top, ${rgba(project.accent.surface, 0.85)}, transparent 65%)` }}
                    />
                    <span
                      className="absolute bottom-3 start-4 font-['Geist'] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur"
                      style={{ color: project.accent.primary, background: 'rgba(10,9,26,0.6)', border: `1px solid ${rgba(project.accent.primary, 0.3)}` }}
                    >
                      {project.categoryLabel}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Sora'] text-[20px] font-bold text-[#e2dfff] mb-1.5 flex items-center justify-between gap-3">
                      {project.title}
                      <span
                        className="material-symbols-outlined i18n-flip text-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        style={{ color: project.accent.primary }}
                        aria-hidden="true"
                      >
                        arrow_forward
                      </span>
                    </h3>
                    <p className="font-['Inter'] text-[13.5px] leading-[1.6] text-[#c9c5d0] line-clamp-2">{project.tagline}</p>
                    <div
                      className="mt-4 h-[2px] w-10 rounded-full transition-all duration-500 group-hover:w-20"
                      style={{ background: accentGradient(project.accent) }}
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
