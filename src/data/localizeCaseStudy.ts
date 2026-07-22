// data/localizeCaseStudy.ts
// Deep-merges a partial locale overlay onto a canonical CaseStudy — arrays
// merge by index, objects merge by key, and any field the overlay omits
// simply falls back to the base (English) value.

import type { CaseStudy, DeepPartial } from '../types/caseStudy'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function deepMerge(base: unknown, overlay: unknown): unknown {
  if (overlay === undefined || overlay === null) return base

  if (Array.isArray(base)) {
    const overlayArr = overlay as unknown[]
    return base.map((item, i) => (i < overlayArr.length ? deepMerge(item, overlayArr[i]) : item))
  }

  if (isPlainObject(base)) {
    const result: Record<string, unknown> = { ...base }
    for (const key of Object.keys(overlay as Record<string, unknown>)) {
      result[key] = deepMerge(base[key], (overlay as Record<string, unknown>)[key])
    }
    return result
  }

  return overlay
}

export function deepMergeCaseStudy(base: CaseStudy, overlay: DeepPartial<CaseStudy> | undefined): CaseStudy {
  return deepMerge(base, overlay) as CaseStudy
}
