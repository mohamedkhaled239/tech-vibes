import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import ScrollReveal from '../ui/ScrollReveal'

export default function CTA() {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="cta-heading"
      className="py-32 px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative text-center"
    >
      <ScrollReveal>
        <div className="glass-panel rounded-3xl p-[24px] sm:p-[48px] md:p-[64px] relative overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#b7aee6]/20 to-[#42e3ff]/20 -z-10"
            aria-hidden="true"
          />
          {/* Subtle animated orb */}
          <div
            className="absolute -top-20 -end-20 w-[300px] h-[300px] bg-[#42e3ff]/10 rounded-full blur-[80px] animate-pulse-glow pointer-events-none"
            aria-hidden="true"
          />

          <h2
            id="cta-heading"
            className="font-['Sora'] font-bold text-[clamp(30px,8vw,64px)] leading-[1.1] tracking-[-0.02em] text-[#e2dfff] text-glow mb-[24px]"
          >
            {t('cta.heading')}
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="cta" className="w-full sm:w-auto" aria-label={t('cta.button')}>
                {t('cta.button')}
              </Button>
            </Link>
            <Link
              to="/portfolio"
              className="font-['Geist'] text-[14px] font-semibold text-[#c9c5d0] hover:text-[#e2dfff] transition-colors underline underline-offset-4 decoration-[#48454f]"
            >
              {t('portfolioGrid.viewAll')}
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
