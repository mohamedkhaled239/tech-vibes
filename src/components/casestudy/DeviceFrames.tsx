import type React from 'react'
// components/casestudy/DeviceFrames.tsx
// Handcrafted CSS device mockups — phone, browser and tablet frames.

import i18n from '../../i18n'
import type { AccentTheme } from '../../types/caseStudy'
import { rgba } from './lib'

interface FrameProps {
  src: string
  alt: string
  accent: AccentTheme
  onClick?: () => void
  className?: string
}

function frameButtonProps(alt: string, onClick?: () => void) {
  if (!onClick) return {}
  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': i18n.t('caseStudy.gallery.openFullscreen', { alt, ns: 'common' }),
    onClick,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    },
  }
}

// ─── Phone — iPhone-style frame with notch ──────────────────────────
export function PhoneFrame({ src, alt, accent, onClick, className = '' }: FrameProps) {
  return (
    <div
      {...frameButtonProps(alt, onClick)}
      className={`group relative aspect-[9/19] w-full max-w-[280px] rounded-[2.6rem] p-[10px] transition-transform duration-500 hover:-translate-y-2 ${
        onClick ? 'cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4' : ''
      } ${className}`}
      style={{
        background: 'linear-gradient(160deg, #2a2857, #12103a)',
        boxShadow: `0 24px 60px -20px rgba(0,0,0,0.7), 0 0 40px -10px ${rgba(accent.primary, 0.25)}, inset 0 1px 1px rgba(255,255,255,0.15)`,
      }}
    >
      {/* Screen */}
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#060141]">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" aria-hidden="true" />
        {/* Screen glare */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)' }}
        />
      </div>
    </div>
  )
}

// ─── Browser — macOS-style chrome ───────────────────────────────────
export function BrowserFrame({ src, alt, accent, onClick, className = '' }: FrameProps) {
  return (
    <div
      {...frameButtonProps(alt, onClick)}
      className={`group relative w-full rounded-2xl overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${
        onClick ? 'cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4' : ''
      } ${className}`}
      style={{
        boxShadow: `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 50px -12px ${rgba(accent.primary, 0.2)}`,
        border: `1px solid ${rgba(accent.primary, 0.18)}`,
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 h-10 bg-[#191751]/90 backdrop-blur border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <div className="ml-4 flex-1 max-w-sm h-5 rounded-md bg-white/5 flex items-center px-3">
          <span className="material-symbols-outlined text-[12px] text-[#c9c5d0]/40 mr-2">lock</span>
          <span className="font-['Geist'] text-[10px] text-[#c9c5d0]/40 truncate">{alt}</span>
        </div>
      </div>
      <div className="relative aspect-[16/10] bg-[#060141] overflow-hidden">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
    </div>
  )
}

// ─── Tablet — slim bezel frame ──────────────────────────────────────
export function TabletFrame({ src, alt, accent, onClick, className = '' }: FrameProps) {
  return (
    <div
      {...frameButtonProps(alt, onClick)}
      className={`group relative aspect-[4/3] w-full rounded-[1.8rem] p-[12px] transition-transform duration-500 hover:-translate-y-2 ${
        onClick ? 'cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4' : ''
      } ${className}`}
      style={{
        background: 'linear-gradient(160deg, #2a2857, #12103a)',
        boxShadow: `0 24px 60px -20px rgba(0,0,0,0.7), 0 0 40px -10px ${rgba(accent.primary, 0.2)}, inset 0 1px 1px rgba(255,255,255,0.12)`,
      }}
    >
      <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden bg-[#060141]">
        <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
    </div>
  )
}
