// components/casestudy/web/CinematicHotspots.tsx
// The keynote moment — oversized copy on the left, a massive tilting
// browser on the right with clickable feature hotspots on the screen.

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, WebShowcaseData } from '../../../types/caseStudy'
import { accentGradient, rgba, EASE } from '../lib'
import { Reveal } from '../primitives'
import BrowserChrome from './BrowserChrome'
import { useTilt } from './hooks'

export default function CinematicHotspots({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const web = study.web as WebShowcaseData
  const { accent } = study
  const reduced = useReducedMotion()
  const [activeSpot, setActiveSpot] = useState<number | null>(null)
  const { ref, rotateX, rotateY, handlers } = useTilt(5)

  const hero = web.sections[0]

  return (
    <section className="relative py-28 md:py-40 overflow-hidden" aria-label="Feature tour">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(70% 60% at 75% 50%, ${rgba(accent.primary, 0.09)}, transparent 70%)` }}
      />

      <div className="relative max-w-[1440px] mx-auto px-[16px] md:px-[64px] grid lg:grid-cols-12 gap-14 items-center">
        {/* Keynote copy */}
        <div className="lg:col-span-4">
          <Reveal>
            <span className="font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: accent.primary }}>
              {t('caseStudy.web.hotspots.eyebrow')}
            </span>
            <h2 className="font-['Sora'] text-[clamp(34px,4.5vw,58px)] font-bold tracking-tighter leading-[1.02] text-[#e2dfff] mt-5">
              {t('caseStudy.web.hotspots.headingLine1')}
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGradient(accent) }}>
                {t('caseStudy.web.hotspots.headingLine2')}
              </span>
              <br />
              {t('caseStudy.web.hotspots.headingLine3')}
            </h2>
            <p className="font-['Inter'] text-[16px] leading-[1.75] text-[#c9c5d0] mt-6 max-w-sm">
              {t('caseStudy.web.hotspots.lead')}
            </p>
          </Reveal>
        </div>

        {/* Massive interactive browser */}
        <div className="lg:col-span-8" style={{ perspective: '1600px' }}>
          <motion.div
            ref={ref}
            {...handlers}
            style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
            initial={reduced ? false : { opacity: 0, y: 70, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -120px 0px' }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <BrowserChrome url={web.url} accent={accent} glow>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={hero.src} alt={`${study.title} website with interactive feature hotspots`} className="w-full h-full object-cover" />

                {/* Dim layer when a hotspot is active */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#060141] pointer-events-none"
                  animate={{ opacity: activeSpot !== null ? 0.55 : 0 }}
                  transition={{ duration: 0.35 }}
                />

                {/* Hotspots */}
                {web.hotspots.map((spot, i) => {
                  const isActive = activeSpot === i
                  const openLeft = spot.x > 55
                  const openUp = spot.y > 55
                  return (
                    <div key={spot.title} className="absolute z-10" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
                      <button
                        onMouseEnter={() => setActiveSpot(i)}
                        onMouseLeave={() => setActiveSpot((s) => (s === i ? null : s))}
                        onFocus={() => setActiveSpot(i)}
                        onBlur={() => setActiveSpot((s) => (s === i ? null : s))}
                        onClick={() => setActiveSpot(isActive ? null : i)}
                        aria-expanded={isActive}
                        aria-label={`Feature: ${spot.title}`}
                        className="relative -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-9 md:h-9 rounded-full flex items-center justify-center cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{
                          background: isActive ? accent.primary : 'rgba(10,9,26,0.65)',
                          border: `1.5px solid ${rgba(accent.primary, isActive ? 1 : 0.6)}`,
                          backdropFilter: 'blur(8px)',
                          boxShadow: `0 0 20px ${rgba(accent.primary, isActive ? 0.7 : 0.35)}`,
                        }}
                      >
                        {/* Pulse ring */}
                        {!reduced && !isActive && (
                          <motion.span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full"
                            style={{ border: `1.5px solid ${rgba(accent.primary, 0.5)}` }}
                            animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                            transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.3, ease: 'easeOut' }}
                          />
                        )}
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ color: isActive ? '#0A091A' : accent.primary }}
                          aria-hidden="true"
                        >
                          {spot.icon}
                        </span>
                      </button>

                      {/* Tooltip card */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: openUp ? 8 : -8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className={`absolute z-20 w-44 sm:w-52 md:w-60 rounded-xl md:rounded-2xl border backdrop-blur-xl p-3 md:p-4 ${
                              openLeft ? 'right-6' : 'left-6'
                            } ${openUp ? 'bottom-6' : 'top-6'}`}
                            style={{
                              borderColor: rgba(accent.primary, 0.35),
                              background: 'rgba(10,9,26,0.92)',
                              boxShadow: `0 16px 50px -12px rgba(0,0,0,0.8), 0 0 30px -10px ${rgba(accent.primary, 0.4)}`,
                            }}
                            role="status"
                          >
                            <div className="font-['Sora'] text-[13.5px] font-bold text-[#e2dfff] mb-1.5">{spot.title}</div>
                            <p className="font-['Inter'] text-[12.5px] leading-[1.6] text-[#c9c5d0]">{spot.body}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </BrowserChrome>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
