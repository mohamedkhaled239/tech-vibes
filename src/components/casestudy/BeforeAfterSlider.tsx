import type React from 'react'
// components/casestudy/BeforeAfterSlider.tsx
// Draggable before/after comparison — pointer, touch and keyboard driven
// (the whole slider is a labelled range input for accessibility).

import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CaseStudy, BeforeAfter } from '../../types/caseStudy'
import { rgba } from './lib'
import { Reveal, SectionHeader } from './primitives'

export default function BeforeAfterSlider({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const data = study.beforeAfter as BeforeAfter
  const { accent } = study
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updateFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-24 md:py-32" aria-label="Before and after comparison">
      <SectionHeader
        eyebrow={t('caseStudy.beforeAfter.eyebrow')}
        title={t('caseStudy.beforeAfter.title')}
        accent={accent}
        align="center"
        lead={data.caption}
      />

      <Reveal delay={0.1} className="mt-14">
        <div
          ref={containerRef}
          className="relative aspect-[16/9] rounded-3xl overflow-hidden border select-none touch-none cursor-ew-resize"
          style={{ borderColor: rgba(accent.primary, 0.2), boxShadow: `0 30px 80px -30px rgba(0,0,0,0.8)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* After (base layer) */}
          <img src={data.afterSrc} alt={data.afterLabel} className="absolute inset-0 w-full h-full object-cover" draggable={false} />

          {/* Before (clipped layer) */}
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
            <img
              src={data.beforeSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover grayscale-[60%] brightness-75"
              draggable={false}
            />
          </div>

          {/* Divider + handle */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-[2px] -translate-x-1/2 z-10"
            style={{ left: `${pos}%`, background: accent.primary, boxShadow: `0 0 20px ${rgba(accent.primary, 0.8)}` }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border-2"
              style={{ background: 'rgba(10,9,26,0.7)', borderColor: accent.primary }}
            >
              <span className="material-symbols-outlined text-[20px]" style={{ color: accent.primary }}>
                sync_alt
              </span>
            </div>
          </div>

          {/* Labels */}
          <span className="absolute top-4 left-4 z-10 font-['Geist'] text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-black/50 backdrop-blur text-[#e2dfff]/90 pointer-events-none">
            {data.beforeLabel}
          </span>
          <span
            className="absolute top-4 right-4 z-10 font-['Geist'] text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur pointer-events-none"
            style={{ background: rgba(accent.primary, 0.85), color: '#0A091A' }}
          >
            {data.afterLabel}
          </span>

          {/* Invisible range input — keyboard & screen-reader control */}
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(pos)}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`${data.beforeLabel} / ${data.afterLabel}`}
            className="absolute inset-x-0 bottom-0 w-full h-10 opacity-0 cursor-ew-resize z-20"
          />
        </div>
      </Reveal>
    </section>
  )
}
