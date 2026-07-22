import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PortfolioGrid from './PortfolioGrid'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'

export default function Portfolio() {
  const { t } = useTranslation()

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-24 px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 end-0 w-[400px] h-[400px] bg-[#b7aee6]/10 rounded-full blur-[100px] -z-10 pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <SectionHeading
        id="portfolio-heading"
        eyebrow={t('portfolioGrid.eyebrow')}
        color="purple"
        title={t('portfolioGrid.heading')}
        subtitle={t('portfolioGrid.subheading')}
      />

      <PortfolioGrid />

      <ScrollReveal delay={150} className="flex justify-center mt-12">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 border border-[#b7aee6] text-[#b7aee6] font-['Geist'] text-[14px] font-semibold px-8 py-4 rounded-full transition-all hover:bg-[#b7aee6]/10 active:scale-95"
        >
          <span>{t('portfolioGrid.viewAll')}</span>
          <span className="material-symbols-outlined i18n-flip text-sm" aria-hidden="true">arrow_forward</span>
        </Link>
      </ScrollReveal>
    </section>
  )
}
