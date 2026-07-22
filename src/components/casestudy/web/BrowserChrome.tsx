import type React from 'react'
// components/casestudy/web/BrowserChrome.tsx
// Glass browser shell used across the web showcase scenes — traffic lights,
// address bar and a diagonal light reflection sweep.

import type { AccentTheme } from '../../../types/caseStudy'
import { rgba } from '../lib'

interface BrowserChromeProps {
  url: string
  accent: AccentTheme
  children: React.ReactNode
  className?: string
  /** deepen shadows / glow, used by interactive frames on hover */
  glow?: boolean
  reflection?: boolean
}

export default function BrowserChrome({ url, accent, children, className = '', glow = false, reflection = true }: BrowserChromeProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-shadow duration-500 ${className}`}
      style={{
        border: `1px solid ${rgba(accent.primary, glow ? 0.4 : 0.18)}`,
        background: '#0d0b33',
        boxShadow: glow
          ? `0 40px 100px -20px rgba(0,0,0,0.85), 0 0 80px -16px ${rgba(accent.primary, 0.4)}`
          : `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 50px -14px ${rgba(accent.primary, 0.18)}`,
      }}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 h-9 bg-[#191751]/90 backdrop-blur border-b border-white/5 relative z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <div className="ml-3 flex-1 max-w-xs h-5 rounded-md bg-white/5 flex items-center px-2.5 min-w-0">
          <span className="material-symbols-outlined text-[11px] text-[#c9c5d0]/40 mr-1.5 shrink-0" aria-hidden="true">lock</span>
          <span className="font-['Geist'] text-[10px] text-[#c9c5d0]/50 truncate">{url}</span>
        </div>
      </div>

      {/* Viewport */}
      <div className="relative">{children}</div>

      {/* Glass reflection sweep */}
      {reflection && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(112deg, transparent 42%, rgba(255,255,255,0.055) 47%, rgba(255,255,255,0.02) 52%, transparent 57%)',
          }}
        />
      )}
    </div>
  )
}
