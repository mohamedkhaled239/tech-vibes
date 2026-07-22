// components/casestudy/web/DeviceMorph.tsx
// Responsive showcase — one frame morphs between desktop, laptop, tablet
// and phone. Auto-advances; the device tabs are real, focusable controls.

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, WebShowcaseData } from '../../../types/caseStudy'
import { accentGradient, rgba, EASE } from '../lib'
import { Reveal, SectionHeader } from '../primitives'

interface Device {
  id: 'desktop' | 'laptop' | 'tablet' | 'mobile'
  icon: string
  viewport: string
  /** frame width as % of the stage */
  width: string
  /** frame height as % of the stage height */
  height: string
  radius: string
}

const DEVICES: Device[] = [
  { id: 'desktop', icon: 'desktop_windows', viewport: '1920 px', width: '100%', height: '92%', radius: '16px' },
  { id: 'laptop', icon: 'laptop_mac', viewport: '1440 px', width: '78%', height: '84%', radius: '14px' },
  { id: 'tablet', icon: 'tablet_mac', viewport: '834 px', width: '46%', height: '88%', radius: '22px' },
  { id: 'mobile', icon: 'smartphone', viewport: '390 px', width: '24%', height: '96%', radius: '28px' },
]

const DWELL_MS = 3200

export default function DeviceMorph({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const web = study.web as WebShowcaseData
  const { accent } = study
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused) return
    const timer = setInterval(() => setActive((a) => (a + 1) % DEVICES.length), DWELL_MS)
    return () => clearInterval(timer)
  }, [reduced, paused])

  const device = DEVICES[active]
  const deviceLabel = (id: Device['id']) => t(`caseStudy.web.deviceMorph.devices.${id}`)

  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-24 md:py-32" aria-label="Responsive design showcase">
      <SectionHeader
        eyebrow={t('caseStudy.web.deviceMorph.eyebrow')}
        title={t('caseStudy.web.deviceMorph.title')}
        accent={accent}
        align="center"
      />

      {/* Device tabs */}
      <Reveal delay={0.1} className="mt-10">
        <div
          role="tablist"
          aria-label={t('caseStudy.web.deviceMorph.chooseDevice')}
          className="flex justify-center gap-2 flex-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {DEVICES.map((d, i) => {
            const selected = i === active
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={selected}
                onClick={() => { setActive(i); setPaused(true) }}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                className="inline-flex items-center gap-2 font-['Geist'] text-[13px] font-semibold px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                style={
                  selected
                    ? { background: accentGradient(accent), color: '#0A091A', borderColor: 'transparent', boxShadow: `0 8px 24px -8px ${rgba(accent.primary, 0.5)}` }
                    : { background: 'rgba(255,255,255,0.04)', color: '#c9c5d0', borderColor: 'rgba(255,255,255,0.1)' }
                }
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">{d.icon}</span>
                {deviceLabel(d.id)}
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Morphing stage */}
      <Reveal delay={0.15} className="mt-12">
        <div
          className="relative h-[340px] sm:h-[420px] md:h-[520px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Stage floor glow */}
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-16 rounded-full blur-[60px]"
            style={{ background: rgba(accent.primary, 0.15) }}
          />

          <motion.div
            className="relative overflow-hidden border"
            animate={{ width: device.width, height: device.height, borderRadius: device.radius }}
            transition={reduced ? { duration: 0 } : { duration: 0.9, ease: EASE }}
            style={{
              // Floor so the phone step never shrinks below legibility on
              // narrow stages (24% of a 290px container is ~70px otherwise).
              minWidth: 110,
              borderColor: rgba(accent.primary, 0.3),
              background: '#0d0b33',
              boxShadow: `0 40px 90px -24px rgba(0,0,0,0.8), 0 0 60px -14px ${rgba(accent.primary, 0.3)}`,
            }}
          >
            <img
              src={web.sections[0].src}
              alt={`${study.title} — ${deviceLabel(device.id)} (${device.viewport})`}
              className="w-full h-full object-cover object-top"
            />
            {/* Phone notch for the mobile step */}
            <motion.div
              aria-hidden="true"
              className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full"
              animate={{ opacity: device.id === 'mobile' ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Viewport readout */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-4">
            <span className="font-['Geist'] text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9c5d0]/70" role="status">
              {deviceLabel(device.id)} · <span dir="ltr" style={{ color: accent.primary }}>{device.viewport}</span>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
