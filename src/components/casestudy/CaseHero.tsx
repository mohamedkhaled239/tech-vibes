// components/casestudy/CaseHero.tsx
// Cinematic full-bleed hero — parallax imagery, oversized typography,
// project facts and the primary CTA. Each project tints it via its accent.

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy } from '../../types/caseStudy'
import { accentGradient, rgba, EASE } from './lib'
import { NoiseOverlay } from './primitives'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

export default function CaseHero({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const facts: [string, string][] = [
    [t('caseStudy.hero.factClient'), study.client],
    [t('caseStudy.hero.factIndustry'), study.industry],
    [t('caseStudy.hero.factYear'), study.year],
    [t('caseStudy.hero.factTimeline'), study.timeline],
  ]

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-end overflow-hidden" aria-label={`${study.title} case study hero`}>
      {/* Parallax backdrop */}
      <motion.div className="absolute inset-0" style={{ y: imgY }} aria-hidden="true">
        <img src={study.heroImage} alt="" className="w-full h-[115%] object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, #0A091A 8%, ${rgba(study.accent.surface, 0.75)} 55%, ${rgba('#0A091A', 0.55)} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: `radial-gradient(80% 60% at 70% 20%, ${rgba(study.accent.primary, 0.18)}, transparent 70%)` }}
        />
      </motion.div>
      <NoiseOverlay opacity={0.05} />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-[16px] md:px-[64px] pt-[160px] pb-20"
      >
        {/* Category chip */}
        <motion.div {...fadeUp(0.05)} className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{
              color: study.accent.primary,
              borderColor: rgba(study.accent.primary, 0.35),
              background: rgba(study.accent.primary, 0.08),
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: study.accent.primary }} />
            {study.categoryLabel} · {t('caseStudy.hero.caseStudySuffix')}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-['Sora'] font-bold tracking-tighter leading-[0.98] text-[#e2dfff] text-[clamp(44px,9vw,110px)] max-w-5xl"
        >
          {study.title}
        </motion.h1>

        {/* Tagline with gradient accent */}
        <motion.p
          {...fadeUp(0.28)}
          className="font-['Sora'] font-semibold text-[clamp(19px,3vw,30px)] tracking-tight mt-5 bg-clip-text text-transparent max-w-3xl"
          style={{ backgroundImage: accentGradient(study.accent) }}
        >
          {study.tagline}
        </motion.p>

        <motion.p {...fadeUp(0.38)} className="font-['Inter'] text-[17px] leading-[1.7] text-[#c9c5d0] mt-6 max-w-2xl">
          {study.description}
        </motion.p>

        {/* CTA row */}
        <motion.div {...fadeUp(0.48)} className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4 mt-10">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-2 font-['Geist'] text-[14px] font-bold px-8 py-4 min-h-[48px] rounded-full text-[#0A091A] transition-transform active:scale-95 hover:scale-[1.03]"
            style={{
              background: accentGradient(study.accent),
              boxShadow: `0 8px 32px -8px ${rgba(study.accent.primary, 0.55)}`,
            }}
          >
            {t('caseStudy.hero.ctaPrimary')}
            <span className="material-symbols-outlined i18n-flip text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-['Geist'] text-[14px] font-semibold px-8 py-4 min-h-[48px] rounded-full border border-white/15 text-[#e2dfff] backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors"
            >
              {t('caseStudy.hero.ctaLive')}
              <span className="material-symbols-outlined i18n-flip text-[16px]">open_in_new</span>
            </a>
          )}
        </motion.div>

        {/* Fact strip */}
        <motion.dl
          {...fadeUp(0.6)}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-14 pt-8 border-t"
          style={{ borderColor: rgba(study.accent.primary, 0.15) }}
        >
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="font-['Geist'] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9c5d0]/50 mb-1.5">{label}</dt>
              <dd className="font-['Inter'] text-[15px] font-medium text-[#e2dfff]">{value}</dd>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <dt className="font-['Geist'] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9c5d0]/50 mb-1.5">{t('caseStudy.hero.factServices')}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {study.services.map((s) => (
                <span
                  key={s}
                  className="font-['Geist'] text-[10px] font-medium px-2 py-0.5 rounded-full border"
                  style={{ color: study.accent.primary, borderColor: rgba(study.accent.primary, 0.3), background: rgba(study.accent.primary, 0.06) }}
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </motion.dl>
      </motion.div>

      {/* Scroll hint */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="material-symbols-outlined text-[20px]"
            style={{ color: rgba(study.accent.primary, 0.7) }}
          >
            arrow_downward
          </motion.span>
        </motion.div>
      )}
    </section>
  )
}
