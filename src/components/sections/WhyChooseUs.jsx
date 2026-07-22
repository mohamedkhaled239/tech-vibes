// components/sections/WhyChooseUs.jsx
import { useTranslation } from 'react-i18next'
import { STATS } from '../../constants/data'
import SectionHeading from '../ui/SectionHeading'

export default function WhyChooseUs() {
  const { t } = useTranslation()

  return (
    <section
      className="py-[96px] md:py-[160px] px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative"
      aria-labelledby="why-heading"
    >
      <SectionHeading
        id="why-heading"
        eyebrow={t('about.advantage')}
        color="purple"
        dot
        title={t('about.heading')}
        subtitle={t('about.subheading')}
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            className="stat-card glow-border rounded-xl p-[32px] flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300"
            aria-label={`${stat.value} ${t(`about.stats.${stat.id}`)}`}
          >
            <div
              className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center ${stat.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
              aria-hidden="true"
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {stat.icon}
              </span>
            </div>
            <div className="font-['Sora'] text-[32px] font-semibold leading-[1.3] text-[#d3caff] mb-2" dir="ltr">
              {stat.value}
            </div>
            <div className="font-['Geist'] text-[14px] font-medium tracking-wider uppercase text-[#c9c5d0]">
              {t(`about.stats.${stat.id}`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
