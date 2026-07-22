// components/casestudy/BrandingSection.tsx
// Rendered only for branding projects — logo presentation, color system
// with click-to-copy swatches, type specimens and guideline rules.

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, BrandingData } from '../../types/caseStudy'
import { accentGradient, rgba } from './lib'
import { Reveal, SectionHeader, NoiseOverlay } from './primitives'

function Swatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }
  return (
    <button
      onClick={copy}
      aria-label={t('caseStudy.branding.swatchAria', { name, hex })}
      className="group w-full text-start rounded-2xl overflow-hidden border border-white/10 bg-[#15124d]/40 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
    >
      <div className="h-28 relative" style={{ background: hex }}>
        <span className="absolute bottom-2 end-3 font-['Geist'] text-[11px] font-bold uppercase tracking-wider text-black/40 mix-blend-luminosity opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? t('caseStudy.branding.copied') : t('caseStudy.branding.copy')}
        </span>
      </div>
      <div className="p-4">
        <div className="font-['Sora'] text-[14px] font-bold text-[#e2dfff]">{name}</div>
        <div className="flex items-center justify-between mt-1">
          <span className="font-['Geist'] text-[12px] text-[#c9c5d0]/70 uppercase" dir="ltr">{hex}</span>
          <span className="font-['Geist'] text-[10px] text-[#c9c5d0]/50 uppercase tracking-wider">{role}</span>
        </div>
      </div>
    </button>
  )
}

export default function BrandingSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const branding = study.branding as BrandingData
  const { accent } = study

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Brand identity system">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(50% 40% at 20% 20%, ${rgba(accent.primary, 0.06)}, transparent 70%)` }}
      />
      <div className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <SectionHeader
          eyebrow={t('caseStudy.branding.eyebrow')}
          title={t('caseStudy.branding.title')}
          accent={accent}
          lead={t('caseStudy.branding.lead')}
        />

        <div className="grid lg:grid-cols-12 gap-6 mt-14">
          {/* Logo presentation */}
          <Reveal className="lg:col-span-5">
            <div
              className="relative h-full min-h-[320px] rounded-3xl border overflow-hidden flex flex-col items-center justify-center p-10"
              style={{ borderColor: rgba(accent.primary, 0.18), background: `linear-gradient(150deg, ${rgba(accent.surface, 0.9)}, rgba(10,9,26,0.9))` }}
            >
              <NoiseOverlay opacity={0.05} />
              {/* Construction grid backdrop */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `radial-gradient(circle at center, ${accent.primary} 1px, transparent 1px)`,
                  backgroundSize: '28px 28px',
                }}
              />
              <div
                className="relative w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
                style={{ background: accentGradient(accent), boxShadow: `0 20px 60px -12px ${rgba(accent.primary, 0.6)}` }}
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-[48px] text-[#0A091A]">{branding.logoMark}</span>
              </div>
              <div className="relative font-['Sora'] text-[36px] font-extrabold tracking-tight text-[#e2dfff]">{branding.logoName}</div>
              <div className="relative font-['Geist'] text-[12px] uppercase tracking-[0.3em] text-[#c9c5d0]/60 mt-2">{branding.tagline}</div>
            </div>
          </Reveal>

          {/* Typography specimens */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <div
              className="h-full rounded-3xl border backdrop-blur-md p-8 md:p-10"
              style={{ borderColor: rgba(accent.primary, 0.15), background: 'rgba(31, 29, 87, 0.35)' }}
            >
              <h3 className="font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.25em] mb-8" style={{ color: accent.primary }}>
                {t('caseStudy.branding.typography')}
              </h3>
              <div className="space-y-8">
                {branding.fonts.map((font) => (
                  <div key={font.name} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <div className="sm:w-40 shrink-0">
                      <div className="font-['Sora'] text-[15px] font-bold text-[#e2dfff]">{font.name}</div>
                      <div className="font-['Geist'] text-[11px] text-[#c9c5d0]/60 uppercase tracking-wider mt-1">{font.usage}</div>
                    </div>
                    <div
                      className="text-[clamp(18px,3vw,28px)] leading-tight text-[#e2dfff]/90 truncate"
                      style={{ fontFamily: `'${font.name}', sans-serif`, fontWeight: font.weight }}
                    >
                      {font.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Color system */}
        <Reveal delay={0.1} className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {branding.colors.map((color) => (
              <Swatch key={color.hex} {...color} />
            ))}
          </div>
        </Reveal>

        {/* Guidelines */}
        <Reveal delay={0.15} className="mt-6">
          <div
            className="rounded-3xl border backdrop-blur-md p-8 md:p-10"
            style={{ borderColor: rgba(accent.primary, 0.15), background: 'rgba(31, 29, 87, 0.35)' }}
          >
            <h3 className="font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: accent.primary }}>
              {t('caseStudy.branding.guidelinesHeading')}
            </h3>
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
              {branding.guidelines.map((rule) => (
                <li key={rule} className="flex items-start gap-3 font-['Inter'] text-[15px] leading-[1.7] text-[#c9c5d0]">
                  <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0" style={{ color: accent.primary }} aria-hidden="true">
                    check_circle
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
