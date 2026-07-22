// pages/CaseStudyPage.tsx
// Immersive case-study experience. Sections are composed dynamically per
// category so a branding story reads differently from a mobile app launch:
//
//   mobile     hero → overview → solution → process → showcase → features → …
//   web        hero → overview → solution → process → showcase → features → …
//   branding   hero → overview → solution → BRAND SYSTEM → process → showcase → …
//   marketing  hero → overview → solution → CAMPAIGN DASHBOARD → process → showcase → …
//
// i18n: getCaseStudy(id, lang) returns a fully localized CaseStudy object —
// every section below just renders whatever it's handed, with no locale
// awareness of its own beyond the static chrome strings via useTranslation().

import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getCaseStudy } from '../data/caseStudies'
import type { CaseStudy } from '../types/caseStudy'
import { accentGradient, rgba } from '../components/casestudy/lib'
import { Reveal, NoiseOverlay } from '../components/casestudy/primitives'
import ScrollProgress from '../components/casestudy/ScrollProgress'
import CaseHero from '../components/casestudy/CaseHero'
import OverviewSection from '../components/casestudy/OverviewSection'
import SolutionSection from '../components/casestudy/SolutionSection'
import ProcessTimeline from '../components/casestudy/ProcessTimeline'
import BrandingSection from '../components/casestudy/BrandingSection'
import MarketingSection from '../components/casestudy/MarketingSection'
import ShowcaseGallery from '../components/casestudy/ShowcaseGallery'
import FeaturesSection from '../components/casestudy/FeaturesSection'
import TechStackSection from '../components/casestudy/TechStackSection'
import ResultsSection from '../components/casestudy/ResultsSection'
import TestimonialSection from '../components/casestudy/TestimonialSection'
import BeforeAfterSlider from '../components/casestudy/BeforeAfterSlider'
import RelatedProjects from '../components/casestudy/RelatedProjects'
import StickyCTA from '../components/casestudy/StickyCTA'
import WebShowcase from '../components/casestudy/web/WebShowcase'

function NotFound() {
  const { t } = useTranslation()
  return (
    <main className="flex-grow pt-[160px] pb-[160px] text-center max-w-xl mx-auto px-6">
      <span className="material-symbols-outlined text-[64px] text-[#ffb4ab] mb-4" aria-hidden="true">
        warning
      </span>
      <h1 className="font-['Sora'] text-3xl font-bold text-[#e2dfff] mb-4">{t('caseStudy.notFound.title')}</h1>
      <p className="font-['Inter'] text-[#c9c5d0] mb-8">
        {t('caseStudy.notFound.text')}
      </p>
      <Link
        to="/portfolio"
        className="bg-[#b7aee6] text-[#474070] font-['Geist'] text-[14px] font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all"
      >
        {t('caseStudy.notFound.back')}
      </Link>
    </main>
  )
}

function FinalCTA({ study }: { study: CaseStudy }) {
  const { t } = useTranslation()
  const { accent } = study
  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] pb-32 pt-8" aria-label="Start your project">
      <Reveal>
        <div
          className="relative rounded-[2.5rem] border overflow-hidden text-center px-6 py-16 md:py-24"
          style={{
            borderColor: rgba(accent.primary, 0.25),
            background: `linear-gradient(150deg, ${rgba(accent.surface, 0.9)}, rgba(12,7,69,0.6))`,
          }}
        >
          <NoiseOverlay opacity={0.05} />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[50%] h-56 rounded-full blur-[110px]"
            style={{ background: rgba(accent.primary, 0.2) }}
          />
          <h2 className="relative font-['Sora'] text-[clamp(30px,5vw,52px)] font-bold tracking-tight leading-[1.1] text-[#e2dfff]">
            {t('caseStudy.finalCta.headingLine1')}
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: accentGradient(accent) }}>
              {t('caseStudy.finalCta.headingLine2')}
            </span>
          </h2>
          <p className="relative font-['Inter'] text-[16px] leading-[1.7] text-[#c9c5d0] mt-5 max-w-xl mx-auto">
            {t('caseStudy.finalCta.lead')}
          </p>
          <div className="relative flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-['Geist'] text-[14px] font-bold px-10 py-4 min-h-[48px] rounded-full text-[#0A091A] transition-transform hover:scale-[1.03] active:scale-95"
              style={{ background: accentGradient(accent), boxShadow: `0 12px 40px -10px ${rgba(accent.primary, 0.6)}` }}
            >
              {t('caseStudy.finalCta.cta')}
              <span className="material-symbols-outlined i18n-flip text-[18px]" aria-hidden="true">arrow_forward</span>
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center font-['Geist'] text-[14px] font-semibold px-10 py-4 min-h-[48px] rounded-full border border-white/15 text-[#e2dfff] bg-white/5 hover:bg-white/10 transition-colors"
            >
              {t('caseStudy.finalCta.browseAll')}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function CaseStudyPage() {
  const { projectId } = useParams()
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage || i18n.language
  const study = getCaseStudy(projectId, lang)

  useEffect(() => {
    if (study) document.title = `${study.title} — Case Study | Tech Vibes`
    return () => {
      document.title = 'Tech Vibes'
    }
  }, [study])

  if (!study) return <NotFound />

  const isBranding = Boolean(study.branding)
  const isMarketing = Boolean(study.marketing)
  const isImmersiveWeb = study.category === 'web' && Boolean(study.web)

  return (
    <motion.main
      id="main-content"
      key={`${study.id}-${lang}`}
      className="flex-grow relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ScrollProgress accent={study.accent} />
      <StickyCTA accent={study.accent} />

      <CaseHero study={study} />
      <OverviewSection study={study} />
      <SolutionSection study={study} />

      {/* Category-specific signature section, placed right after the solution */}
      {isBranding && <BrandingSection study={study} />}
      {isMarketing && <MarketingSection study={study} />}

      <ProcessTimeline study={study} />

      {/* Web projects get the immersive product-launch showcase; its
          on-screen hotspots replace the flat feature grid. Everything
          else keeps the device gallery + feature cards. */}
      {isImmersiveWeb ? (
        <WebShowcase study={study} />
      ) : (
        <>
          <ShowcaseGallery study={study} />
          <FeaturesSection study={study} />
        </>
      )}

      <TechStackSection study={study} />
      <ResultsSection study={study} />
      <TestimonialSection study={study} />

      {study.beforeAfter && <BeforeAfterSlider study={study} />}

      <RelatedProjects study={study} />
      <FinalCTA study={study} />
    </motion.main>
  )
}
