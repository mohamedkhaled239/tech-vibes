// components/casestudy/lib.ts
// Tiny helpers shared by the case-study section components.

import type { AccentTheme } from '../../types/caseStudy'

/** '#42e3ff' + 0.2 → 'rgba(66, 227, 255, 0.2)' */
export function rgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Gradient string used for accent text and pills. */
export function accentGradient(accent: AccentTheme): string {
  return `linear-gradient(120deg, ${accent.primary}, ${accent.secondary})`
}

export const EASE = [0.22, 1, 0.36, 1] as const
