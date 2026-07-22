// components/casestudy/web/WorkspaceScene.tsx
// The designer's desk — laptop, palette, type sheet, grid, code and a
// sticky note arranged as an editorial composition with cursor parallax.

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, WebShowcaseData } from '../../../types/caseStudy'
import { rgba } from '../lib'
import { Reveal, SectionHeader, NoiseOverlay } from '../primitives'
import BrowserChrome from './BrowserChrome'
import { useMouseParallax, useParallaxLayer } from './hooks'

const CARD = 'rounded-2xl border backdrop-blur-md overflow-hidden'

export default function WorkspaceScene({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const web = study.web as WebShowcaseData
  const { accent } = study
  const reduced = useReducedMotion()
  const { mx, my, handlers } = useMouseParallax()

  const deskLayer = useParallaxLayer(mx, my, 10)
  const midLayer = useParallaxLayer(mx, my, 26)
  const topLayer = useParallaxLayer(mx, my, 44)

  const palette = [
    { hex: accent.primary, name: 'Accent' },
    { hex: accent.secondary, name: 'Support' },
    { hex: accent.surface, name: 'Surface' },
    { hex: '#e2dfff', name: 'Ink' },
    { hex: '#0A091A', name: 'Base' },
  ]

  const cardStyle = { borderColor: rgba(accent.primary, 0.15), background: 'rgba(21, 18, 77, 0.55)' }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Design workspace">
      <div className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <SectionHeader
          eyebrow={t('caseStudy.web.workspace.eyebrow')}
          title={t('caseStudy.web.workspace.title')}
          accent={accent}
          align="center"
          lead={t('caseStudy.web.workspace.lead')}
        />

        <div {...handlers} className="relative mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-start">
          {/* Laptop — the centerpiece */}
          <motion.div className="sm:col-span-2 lg:col-span-7 lg:row-span-2 relative z-10" style={{ x: deskLayer.x, y: deskLayer.y }}>
            <Reveal>
              <div className="lg:rotate-[-1.2deg]">
                <BrowserChrome url={web.url} accent={accent}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={web.sections[0].src} alt={`${study.title} open in the browser`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                </BrowserChrome>
                {/* Laptop base */}
                <div aria-hidden="true" className="mx-auto w-[88%] h-3 rounded-b-2xl bg-gradient-to-b from-[#2a2857] to-[#12103a]" />
                <div aria-hidden="true" className="mx-auto w-[30%] h-1 rounded-b-xl bg-[#12103a]" />
              </div>
            </Reveal>
          </motion.div>

          {/* Color palette */}
          <motion.div className="lg:col-span-5 relative z-20" style={{ x: midLayer.x, y: midLayer.y }}>
            <Reveal delay={0.1}>
              <div className={`${CARD} p-5 lg:rotate-[1.5deg]`} style={cardStyle}>
                <div className="font-['Geist'] text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9c5d0]/60 mb-4">{t('caseStudy.web.workspace.colorSystem')}</div>
                <div className="flex gap-2">
                  {palette.map((c) => (
                    <div key={c.name} className="flex-1 min-w-0">
                      <div className="h-14 rounded-lg border border-white/10" style={{ background: c.hex }} />
                      <div dir="ltr" className="font-['Geist'] text-[9px] text-[#c9c5d0]/60 uppercase mt-1.5 truncate">{c.hex}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Typography sheet */}
          <motion.div className="lg:col-span-5 relative z-20" style={{ x: midLayer.x, y: midLayer.y }}>
            <Reveal delay={0.16}>
              <div className={`${CARD} p-5 lg:rotate-[-1deg]`} style={cardStyle}>
                <div className="font-['Geist'] text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9c5d0]/60 mb-3">{t('caseStudy.web.workspace.typography')}</div>
                <div className="flex items-end gap-5" dir="ltr">
                  <span className="font-['Sora'] text-[44px] font-extrabold leading-none text-[#e2dfff]">Aa</span>
                  <div className="min-w-0 pb-1">
                    <div className="font-['Sora'] text-[13px] font-bold text-[#e2dfff]">Sora — display</div>
                    <div className="font-['Inter'] text-[12px] text-[#c9c5d0]/80">Inter — body · <span className="font-['Geist']">Geist — data</span></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Code snippet */}
          <motion.div className="sm:col-span-2 lg:col-span-4 relative z-20" style={{ x: midLayer.x, y: midLayer.y }}>
            <Reveal delay={0.12}>
              <div className={`${CARD} lg:rotate-[1deg]`} style={cardStyle}>
                <div className="flex items-center gap-1.5 px-4 h-8 border-b border-white/5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="w-2 h-2 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="ms-2 font-['Geist'] text-[10px] text-[#c9c5d0]/50">production.tsx</span>
                </div>
                <pre className="p-4 font-mono text-[11px] leading-[1.7] overflow-x-auto" style={{ color: rgba(accent.primary, 0.9) }}>
                  <code>{web.codeSnippet}</code>
                </pre>
              </div>
            </Reveal>
          </motion.div>

          {/* Grid system */}
          <motion.div className="lg:col-span-4 relative z-20" style={{ x: midLayer.x, y: midLayer.y }}>
            <Reveal delay={0.2}>
              <div className={`${CARD} p-5 lg:rotate-[-1.5deg]`} style={cardStyle}>
                <div className="font-['Geist'] text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9c5d0]/60 mb-4">{t('caseStudy.web.workspace.grid')}</div>
                <div className="grid grid-cols-12 gap-1 h-16" aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="rounded-sm" style={{ background: rgba(accent.primary, i % 3 === 0 ? 0.25 : 0.1) }} />
                  ))}
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Sticky note — floats above everything */}
          <motion.div className="lg:col-span-4 relative z-30" style={{ x: topLayer.x, y: topLayer.y }}>
            <Reveal delay={0.24}>
              <motion.div
                animate={reduced ? undefined : { rotate: [3, 4.5, 3] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                className="rounded-lg p-5 rotate-3 max-w-[260px] mx-auto lg:mx-0"
                style={{
                  background: 'linear-gradient(160deg, #ffe98a, #f7d354)',
                  boxShadow: '0 16px 40px -12px rgba(0,0,0,0.6)',
                }}
              >
                <NoiseOverlay opacity={0.08} />
                <p className="relative font-['Inter'] italic text-[13.5px] leading-[1.6] text-[#3b3320] font-medium">
                  “{web.stickyNote}”
                </p>
              </motion.div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
