import type React from 'react'
// components/casestudy/MarketingSection.tsx
// Rendered only for marketing projects — KPI tiles, a single-series
// performance trend with hover tooltip, and a labelled channel split.

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, MarketingData } from '../../types/caseStudy'
import { accentGradient, rgba, EASE } from './lib'
import { Counter, Reveal, SectionHeader } from './primitives'

// Chart geometry (SVG user units)
const W = 640
const H = 240
const PAD = { top: 24, right: 56, bottom: 30, left: 12 }

function TrendChart({ data, accent }: { data: MarketingData; accent: CaseStudy['accent'] }) {
  const { t } = useTranslation()
  const [hover, setHover] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const points = data.monthly

  const x = (i: number) => PAD.left + (i / (points.length - 1)) * (W - PAD.left - PAD.right)
  const y = (v: number) => PAD.top + (1 - v / 100) * (H - PAD.top - PAD.bottom)

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${x(points.length - 1).toFixed(1)},${H - PAD.bottom} L${x(0).toFixed(1)},${H - PAD.bottom} Z`
  const last = points[points.length - 1]

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = ((e.clientX - rect.left) / rect.width) * W
    const i = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (points.length - 1))
    setHover(Math.min(points.length - 1, Math.max(0, i)))
  }

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`${t('caseStudy.marketing.trendHeading')}: ${points[0].value} → ${last.value}`}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent.primary} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Recessive gridlines */}
        {[25, 50, 75, 100].map((v) => (
          <line key={v} x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="rgba(226,223,255,0.07)" strokeWidth="1" />
        ))}

        {/* Area + line */}
        <path d={areaPath} fill="url(#trend-fill)" />
        <motion.path
          d={linePath}
          fill="none"
          stroke={accent.primary}
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        />

        {/* Hover crosshair */}
        {hover !== null && (
          <g aria-hidden="true">
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(226,223,255,0.2)" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(points[hover].value)} r="5" fill={accent.primary} stroke="#0A091A" strokeWidth="2" />
          </g>
        )}

        {/* Direct label — final point only */}
        <circle cx={x(points.length - 1)} cy={y(last.value)} r="4" fill={accent.primary} stroke="#0A091A" strokeWidth="2" />
        <text
          x={x(points.length - 1) + 10}
          y={y(last.value) + 4}
          fill="#e2dfff"
          fontSize="12"
          fontFamily="Geist, sans-serif"
          fontWeight="600"
        >
          {last.value}
        </text>

        {/* Month labels */}
        {points.map((p, i) => (
          <text
            key={p.month}
            x={x(i)}
            y={H - 8}
            textAnchor="middle"
            fill="rgba(201,197,208,0.55)"
            fontSize="10.5"
            fontFamily="Geist, sans-serif"
          >
            {p.month}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {hover !== null && (
        <div
          dir="ltr"
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-full rounded-lg border border-white/10 bg-[#0A091A]/95 backdrop-blur px-3 py-1.5 font-['Geist'] text-[11px] text-[#e2dfff] whitespace-nowrap"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            top: `${(y(points[hover].value) / H) * 100}%`,
            marginTop: -8,
          }}
          role="status"
        >
          {t('caseStudy.marketing.tooltipFormat', { month: points[hover].month, value: points[hover].value })}
        </div>
      )}
    </div>
  )
}

export default function MarketingSection({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const marketing = study.marketing as MarketingData
  const { accent } = study
  const reduced = useReducedMotion()

  const kpis = [
    { label: t('caseStudy.marketing.kpiRoas'), value: `${marketing.roas}x` },
    { label: t('caseStudy.marketing.kpiCtr'), value: `${marketing.ctr}%` },
    { label: t('caseStudy.marketing.kpiCpa'), value: marketing.cpa },
    { label: t('caseStudy.marketing.kpiImpressions'), value: marketing.impressions },
  ]

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" aria-label="Campaign performance">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(60% 50% at 80% 30%, ${rgba(accent.primary, 0.06)}, transparent 70%)` }}
      />
      <div className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <SectionHeader
          eyebrow={t('caseStudy.marketing.eyebrow')}
          title={t('caseStudy.marketing.title')}
          accent={accent}
        />

        {/* KPI tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {kpis.map((kpi, i) => (
            <Reveal key={kpi.label} delay={i * 0.08}>
              <div
                className="rounded-2xl border p-6 backdrop-blur-md"
                style={{ borderColor: rgba(accent.primary, 0.15), background: 'rgba(31, 29, 87, 0.35)' }}
              >
                <div
                  dir="ltr"
                  className="text-end font-['Sora'] text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight bg-clip-text text-transparent"
                  style={{ backgroundImage: accentGradient(accent) }}
                >
                  {kpi.value}
                </div>
                <div className="font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#c9c5d0]/70 mt-2">
                  {kpi.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mt-6">
          {/* Trend chart */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              className="h-full rounded-3xl border p-7 md:p-8 backdrop-blur-md"
              style={{ borderColor: rgba(accent.primary, 0.15), background: 'rgba(31, 29, 87, 0.35)' }}
            >
              <h3 className="font-['Sora'] text-[16px] font-bold text-[#e2dfff]">{t('caseStudy.marketing.trendHeading')}</h3>
              <p className="font-['Inter'] text-[12.5px] text-[#c9c5d0]/70 mt-1 mb-6">
                {t('caseStudy.marketing.trendLead')}
              </p>
              <TrendChart data={marketing} accent={accent} />
            </div>
          </Reveal>

          {/* Channel split */}
          <Reveal delay={0.18} className="lg:col-span-5">
            <div
              className="h-full rounded-3xl border p-7 md:p-8 backdrop-blur-md"
              style={{ borderColor: rgba(accent.primary, 0.15), background: 'rgba(31, 29, 87, 0.35)' }}
            >
              <h3 className="font-['Sora'] text-[16px] font-bold text-[#e2dfff]">{t('caseStudy.marketing.channelsHeading')}</h3>
              <p className="font-['Inter'] text-[12.5px] text-[#c9c5d0]/70 mt-1 mb-7">{t('caseStudy.marketing.channelsLead')}</p>
              <ul className="space-y-6 list-none">
                {marketing.channels.map((channel, i) => (
                  <li key={channel.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-2 font-['Inter'] text-[14px] font-medium text-[#e2dfff]">
                        <span className="material-symbols-outlined text-[16px] text-[#c9c5d0]/60" aria-hidden="true">
                          {channel.icon}
                        </span>
                        {channel.name}
                      </span>
                      <span className="font-['Geist'] text-[12px] text-[#c9c5d0]" dir="ltr">
                        {channel.spendShare}% · <span style={{ color: accent.primary }}>{channel.roas}x ROAS</span>
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/5 overflow-hidden" role="presentation">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: accentGradient(accent) }}
                        initial={reduced ? { width: `${channel.spendShare}%` } : { width: 0 }}
                        whileInView={{ width: `${channel.spendShare}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.15, ease: EASE }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
