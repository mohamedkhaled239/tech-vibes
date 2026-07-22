import type React from 'react'
// components/casestudy/primitives.tsx
// Small reusable building blocks: reveals, section headers, animated counters.

import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import type { AccentTheme } from '../../types/caseStudy'
import { accentGradient, rgba, EASE } from './lib'

// ─── Reveal — fade/slide/blur in on scroll ──────────────────────────
interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function Reveal({ children, className, delay = 0, y = 40, once = true }: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// ─── Section header with accent eyebrow ─────────────────────────────
interface SectionHeaderProps {
  eyebrow: string
  title: string
  accent: AccentTheme
  align?: 'left' | 'center'
  lead?: string
}

export function SectionHeader({ eyebrow, title, accent, align = 'left', lead }: SectionHeaderProps) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-5 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        style={{
          borderColor: rgba(accent.primary, 0.25),
          background: rgba(accent.primary, 0.08),
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent.primary }} />
        <span
          className="font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: accent.primary }}
        >
          {eyebrow}
        </span>
      </div>
      <h2 className="font-['Sora'] text-[32px] md:text-[44px] font-bold leading-[1.15] tracking-tight text-[#e2dfff]">
        {title}
      </h2>
      {lead && (
        <p
          className={`font-['Inter'] text-[17px] leading-[1.7] text-[#c9c5d0] mt-4 max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  )
}

// ─── Gradient text helper ───────────────────────────────────────────
export function GradientText({ accent, children }: { accent: AccentTheme; children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: accentGradient(accent) }}
    >
      {children}
    </span>
  )
}

// ─── Animated counter — springs up when scrolled into view ─────────
interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function Counter({ value, prefix = '', suffix = '', decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const reduced = useReducedMotion()
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
      return
    }
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`
    })
  }, [spring, prefix, suffix, decimals, reduced, value])

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}0{suffix}
    </span>
  )
}

// ─── Noise overlay — film-grain texture on dark panels ──────────────
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export function NoiseOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      style={{ backgroundImage: NOISE_SVG, opacity }}
    />
  )
}
