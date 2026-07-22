// components/sections/ServicesHero.jsx
import { useTranslation } from 'react-i18next'
import { SERVICES_PAGE_CHIPS } from '../../constants/data'

export default function ServicesHero() {
  const { t } = useTranslation()
  const chipLabels = t('servicesPage.chips', { returnObjects: true })

  return (
    <header
      className="text-center max-w-4xl mx-auto mb-24 relative"
      aria-labelledby="services-hero-heading"
    >
      {/* Glow backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150px] bg-[#42e3ff]/20 blur-[80px] -z-10 rounded-[100%] pointer-events-none"
        aria-hidden="true"
      />

      {/* Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-8" role="list" aria-label="Service highlights">
        {SERVICES_PAGE_CHIPS.map((chip, i) => (
          <span
            key={chip.variant + i}
            role="listitem"
            className={`chip-${chip.variant} font-['Geist'] text-[12px] font-medium px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-widest`}
          >
            {chipLabels[i]}
          </span>
        ))}
      </div>

      {/* Heading */}
      <h1
        id="services-hero-heading"
        className="font-['Sora'] text-[clamp(32px,8vw,64px)] font-bold leading-[1.1] tracking-[-0.02em] mb-6
          bg-clip-text text-transparent bg-gradient-to-r from-[#e2dfff] via-[#d3caff] to-[#42e3ff]"
      >
        {t('servicesPage.heading')}
      </h1>

      <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c9c5d0] max-w-2xl mx-auto">
        {t('servicesPage.subheading')}
      </p>
    </header>
  )
}
