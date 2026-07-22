// components/sections/ProcessSection.jsx
import { useTranslation } from 'react-i18next'
import { PROCESS_STEPS } from '../../constants/data'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

export default function ProcessSection() {
  const { t } = useTranslation()

  return (
    <section
      id="process"
      className="py-[96px] md:py-[160px] px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative border-t border-[#48454f]/10 scroll-mt-24"
      aria-labelledby="process-heading"
    >
      <SectionHeading
        id="process-heading"
        eyebrow={t('about.methodology')}
        color="cyan"
        title={t('about.processHeading')}
        subtitle={t('about.processSubheading')}
      />

      {/* Steps */}
      <div className="relative max-w-5xl mx-auto">
        {/* Desktop connecting line */}
        <div
          className="hidden md:block absolute top-[80px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#b7aee6]/10 via-[#42e3ff]/50 to-[#b7aee6]/10 z-0"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-[48px] md:gap-x-[24px] relative z-10">
          {PROCESS_STEPS.map((step, i) => (
            <ScrollReveal
              key={step.id}
              delay={i * 150}
              className="flex flex-col items-center text-center group h-full"
            >
              {/* Mobile connector (hidden for first) */}
              {i > 0 && (
                <div
                  className="md:hidden w-[2px] h-12 bg-gradient-to-b from-[#42e3ff]/50 to-[#b7aee6]/50 -mt-12 mb-4"
                  aria-hidden="true"
                />
              )}

              {/* Step circle */}
              <div className="w-16 h-16 rounded-full stat-card glow-border flex items-center justify-center mb-6 relative bg-[#1F1D57] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(66,227,255,0.3)]">
                <div
                  className={`absolute inset-0 rounded-full ${step.glowColor} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden="true"
                />
                <span
                  className={`font-['Sora'] text-[32px] font-semibold leading-[1.3] ${step.numberColor} z-10`}
                  aria-label={`Step ${step.number}`}
                >
                  {step.number}
                </span>
              </div>

              <h3 className={`font-['Geist'] text-[14px] font-medium tracking-widest uppercase mb-2 ${step.labelColor} transition-colors duration-300`}>
                {t(`about.steps.${step.id}.label`)}
              </h3>
              <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0] px-4 group-hover:text-[#e2dfff] transition-colors duration-300">
                {t(`about.steps.${step.id}.description`)}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
