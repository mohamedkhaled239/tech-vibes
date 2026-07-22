import { useTranslation } from 'react-i18next'
import ServiceCard from '../ui/ServiceCard'
import { SERVICES } from '../../constants/data'
import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'

export default function Services() {
  const { t } = useTranslation()

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative z-10"
    >
      <SectionHeading
        id="services-heading"
        eyebrow={t('services.badge')}
        color="cyan"
        title={t('services.heading')}
        subtitle={t('services.subheading')}
      />

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {SERVICES.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 100}>
            <ServiceCard
              {...service}
              title={t(`services.items.${service.id}.title`)}
              description={t(`services.items.${service.id}.description`)}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
