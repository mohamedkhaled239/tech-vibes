// components/sections/HeroCodePanel.jsx
// The hero's visual centerpiece — a floating "live code" panel that types
// itself out on load, standing in for a product screenshot. Code stays LTR
// regardless of site language, same convention used by tech-stack badges
// and case-study code blocks.

import { useEffect, useState } from 'react'
// ─── Floating corner badge ───────────────────────────────────────────────
function Badge({ className, gradient, icon, label, size = 'md', delay = '0s' }) {
  const sizes = {
    sm: 'w-9 h-9 md:w-11 md:h-11 rounded-xl text-[15px] md:text-[18px]',
    md: 'w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl text-[20px] md:text-[26px]',
  }
  return (
    <div
      className={`absolute z-20 flex items-center justify-center shadow-2xl float-anim ${sizes[size]} ${className}`}
      style={{ background: gradient, animationDelay: delay }}
      aria-hidden="true"
    >
      {label ? (
        <span className="font-['Geist'] font-extrabold text-white text-[15px] tracking-tight">{label}</span>
      ) : (
        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      )}
    </div>
  )
}

// ─── Syntax-tinted code lines ─────────────────────────────────────────────
const CODE_LINES = [
  [{ t: '// TechVibes — Platform Snippet', c: 'text-[#6f7ba8]' }],
  [{ t: 'const', c: 'text-[#d3caff] font-semibold' }, { t: ' brand ', c: 'text-[#e2dfff]' }, { t: '= ', c: 'text-[#c9c5d0]' }, { t: '"تك فايبز — نبني تجارب رقمية تحقق النمو"', c: 'text-[#42e3ff]' }, { t: ';', c: 'text-[#c9c5d0]' }],
  [{ t: '', c: '' }],
  [{ t: 'function', c: 'text-[#d3caff] font-semibold' }, { t: ' buildProduct', c: 'text-[#a2eeff]' }, { t: '({ ', c: 'text-[#c9c5d0]' }, { t: 'uiux, performance, seo', c: 'text-[#e2dfff]' }, { t: ' }) {', c: 'text-[#c9c5d0]' }],
  [{ t: '  return', c: 'text-[#d3caff] font-semibold' }, { t: ' {', c: 'text-[#c9c5d0]' }],
  [{ t: '    name: ', c: 'text-[#bab5d4]' }, { t: 'brand', c: 'text-[#e2dfff]' }, { t: ',', c: 'text-[#c9c5d0]' }],
  [{ t: '    stack: ', c: 'text-[#bab5d4]' }, { t: '["React", "Node.js", "Flutter"]', c: 'text-[#42e3ff]' }, { t: ',', c: 'text-[#c9c5d0]' }],
  [{ t: '    uiux,', c: 'text-[#e2dfff]' }],
  [{ t: '    performance,', c: 'text-[#e2dfff]' }],
  [{ t: '    seo,', c: 'text-[#e2dfff]' }],
  [{ t: '    status: ', c: 'text-[#bab5d4]' }, { t: '"ready_to_launch"', c: 'text-[#7cf7c9]' }, { t: ',', c: 'text-[#c9c5d0]' }],
  [{ t: '  };', c: 'text-[#c9c5d0]' }],
  [{ t: '}', c: 'text-[#c9c5d0]' }],
  [{ t: '', c: '' }],
  [{ t: 'const', c: 'text-[#d3caff] font-semibold' }, { t: ' project ', c: 'text-[#e2dfff]' }, { t: '= ', c: 'text-[#c9c5d0]' }, { t: 'buildProduct', c: 'text-[#a2eeff]' }, { t: '({ … })', c: 'text-[#c9c5d0]' }],
]

const LINE_LENGTHS = CODE_LINES.map((line) => line.reduce((sum, tok) => sum + tok.t.length, 0))
const LINE_STARTS = LINE_LENGTHS.reduce((acc, len) => {
  acc.push((acc[acc.length - 1] ?? 0) + len)
  return acc
}, [0])
const TOTAL_CHARS = LINE_LENGTHS.reduce((sum, len) => sum + len, 0)

/** Render the first `chars` characters of a line, preserving per-token color. */
function renderLine(line, chars) {
  let used = 0
  return line.map((tok, i) => {
    const available = Math.max(0, chars - used)
    const slice = tok.t.slice(0, available)
    used += tok.t.length
    if (!slice) return null
    return (
      <span key={i} className={tok.c}>
        {slice}
      </span>
    )
  })
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Types the snippet out character-by-character, like someone typing live. */
function useTypewriter(totalChars) {
  // Reduced-motion visitors get the fully-typed snippet immediately — computed
  // once at init so the effect never has to call setState synchronously.
  const [revealCount, setRevealCount] = useState(() => (prefersReducedMotion() ? totalChars : 0))

  useEffect(() => {
    if (prefersReducedMotion()) return

    let count = 0
    const timer = setInterval(() => {
      // Small bursts of 1-2 characters read as more "human" than a metronome.
      count += Math.random() > 0.65 ? 2 : 1
      if (count >= totalChars) {
        count = totalChars
        clearInterval(timer)
      }
      setRevealCount(count)
    }, 16)

    return () => clearInterval(timer)
  }, [totalChars])

  return revealCount
}

export default function HeroCodePanel() {
  const revealCount = useTypewriter(TOTAL_CHARS)
  const done = revealCount >= TOTAL_CHARS

  const revealedPerLine = LINE_LENGTHS.map((len, i) => {
    const before = LINE_STARTS[i]
    return Math.min(Math.max(revealCount - before, 0), len)
  })
  const activeLine = revealedPerLine.reduce((acc, chars, i) => (chars > 0 ? i : acc), 0)

  return (
    <div className="relative w-full max-w-[560px] mx-auto" dir="ltr">
      {/* Floating brand badges around the panel — smaller offsets on mobile so
          they stay inside the viewport instead of being clipped in half */}
      <Badge className="-top-3 -left-2 md:-top-6 md:-left-6" gradient="linear-gradient(140deg, #c026d3, #7c3aed)" icon="code" delay="0s" />
      <Badge className="-top-3 right-10 md:-top-5" gradient="linear-gradient(140deg, #42e3ff, #3b82f6)" icon="integration_instructions" size="sm" delay="0.8s" />
      <Badge className="top-[38%] -left-3 md:-left-8" gradient="linear-gradient(140deg, #34d399, #059669)" icon="verified" size="sm" delay="1.6s" />
      <Badge className="-bottom-3 -left-2 md:-bottom-5 md:-left-5" gradient="linear-gradient(140deg, #fb923c, #ea580c)" label="JS" size="sm" delay="1.2s" />
      <Badge className="-bottom-3 -right-2 md:-bottom-6 md:-right-6" gradient="linear-gradient(140deg, #2dd4bf, #0891b2)" icon="design_services" delay="0.4s" />

      {/* Ambient glow behind the panel */}
      <div
        aria-hidden="true"
        className="absolute inset-6 -z-10 rounded-[2rem] blur-[70px] opacity-70 animate-pulse-glow"
        style={{ background: 'linear-gradient(135deg, rgba(66,227,255,0.25), rgba(183,174,230,0.25))' }}
      />

      {/* Main panel */}
      <div className="relative rounded-[1.75rem] border border-[#42e3ff]/20 bg-gradient-to-br from-[#0c0745] to-[#15124d] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" aria-hidden="true" />
        {/* Scattered decorative dots */}
        <span className="absolute w-1.5 h-1.5 rounded-full bg-[#42e3ff]/60 top-[18%] left-[12%] animate-pulse" aria-hidden="true" />
        <span className="absolute w-1 h-1 rounded-full bg-[#d3caff]/60 bottom-[30%] left-[20%] animate-pulse" style={{ animationDelay: '1s' }} aria-hidden="true" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-[#42e3ff]/40 bottom-[14%] right-[10%] animate-pulse" style={{ animationDelay: '2s' }} aria-hidden="true" />

        {/* Header row */}
        <div className="relative flex items-center justify-between px-6 md:px-7 pt-6 pb-4 border-b border-white/5">
          <span className="font-['Geist'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b86ad]">
            techvibes.dev
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 border border-white/10 backdrop-blur-md px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" aria-hidden="true" />
            <span className="font-['Geist'] text-[10px] font-bold uppercase tracking-widest text-[#4ade80]">Live</span>
          </span>
        </div>

        {/* Code body — typed out live, one character at a time */}
        <pre className="relative px-4 sm:px-6 md:px-7 py-5 md:py-6 font-mono text-[11.5px] sm:text-[12.5px] md:text-[13.5px] leading-[1.9] overflow-x-auto no-scrollbar" aria-label="Live code preview">
          <code>
            {CODE_LINES.map((line, i) => (
              <div key={i}>
                {renderLine(line, revealedPerLine[i])}
                {i === activeLine && (
                  <span
                    className={`inline-block w-[7px] h-[14px] bg-[#42e3ff] ms-1 align-middle ${done ? 'animate-blink-cursor' : ''}`}
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
