// types/caseStudy.ts
// Shared type contracts for the immersive case-study experience.

export type ProjectCategory = 'mobile' | 'web' | 'branding' | 'marketing'

/** Recursively optional mirror of T — used for locale overlay objects that
 *  only need to specify the fields that actually change per language. */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T

export interface AccentTheme {
  /** Main accent hex — drives glows, gradients, highlights per project */
  primary: string
  /** Secondary accent hex — used in gradient pairings */
  secondary: string
  /** Very dark tint of the accent used for deep backgrounds */
  surface: string
}

export interface ProjectStat {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
  sublabel?: string
}

export interface ProjectFeature {
  icon: string // material symbol name
  title: string
  description: string
}

export interface ProcessStep {
  phase: string
  title: string
  description: string
  duration: string
}

export interface BrandColor {
  name: string
  hex: string
  role: string
}

export interface BrandFont {
  name: string
  usage: string
  sample: string
  weight: number
}

export interface BrandingData {
  logoMark: string // material symbol used as logo stand-in
  logoName: string
  tagline: string
  colors: BrandColor[]
  fonts: BrandFont[]
  guidelines: string[]
}

export interface GalleryItem {
  src: string
  alt: string
  device: 'phone' | 'desktop' | 'tablet'
}

export interface CampaignChannel {
  name: string
  icon: string
  spendShare: number // 0–100
  roas: number
}

export interface MarketingData {
  roas: number
  ctr: number
  cpa: string
  impressions: string
  /** monthly performance index, 0–100, drives the chart */
  monthly: { month: string; value: number }[]
  channels: CampaignChannel[]
}

// ─── Web-project immersive showcase ────────────────────────────────
export interface WebSectionCard {
  name: string
  icon: string
  description: string
  src: string
}

export interface Hotspot {
  /** Position on the browser screen, percentages 0–100 */
  x: number
  y: number
  icon: string
  title: string
  body: string
}

export interface LighthouseScores {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export interface WebShowcaseData {
  /** Display URL shown in browser chrome */
  url: string
  /** The story of the site, section by section (hero → contact) */
  sections: WebSectionCard[]
  /** Scroll-through highlight labels, one per section in order */
  highlights: string[]
  /** Clickable feature hotspots placed on the cinematic browser */
  hotspots: Hotspot[]
  lighthouse: LighthouseScores
  /** Short code excerpt shown in the workspace scene */
  codeSnippet: string
  /** One-line engineering note pinned as a sticky note */
  stickyNote: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface BeforeAfter {
  beforeLabel: string
  afterLabel: string
  beforeSrc: string
  afterSrc: string
  caption: string
}

export interface CaseStudy {
  id: string
  aliases?: string[]
  title: string
  tagline: string
  description: string
  category: ProjectCategory
  categoryLabel: string
  client: string
  industry: string
  year: string
  timeline: string
  services: string[]
  liveUrl?: string
  heroImage: string
  accent: AccentTheme
  problem: string
  goals: string[]
  challenges: string[]
  solution: {
    intro: string
    points: { icon: string; title: string; body: string }[]
  }
  process: ProcessStep[]
  branding?: BrandingData
  marketing?: MarketingData
  web?: WebShowcaseData
  gallery: GalleryItem[]
  features: ProjectFeature[]
  techStack: string[]
  results: ProjectStat[]
  testimonial: Testimonial
  beforeAfter?: BeforeAfter
  related: string[]
}
