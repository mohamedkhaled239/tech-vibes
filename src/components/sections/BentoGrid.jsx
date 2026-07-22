// components/sections/BentoGrid.jsx
import { useTranslation } from 'react-i18next'
import BentoCard from '../ui/BentoCard'
import { BENTO_SERVICES } from '../../constants/data'

export default function BentoGrid() {
  const { t } = useTranslation()

  return (
    <section aria-label="Services bento grid">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px]">
        {BENTO_SERVICES.map((service) => (
          <BentoCard
            key={service.id}
            {...service}
            title={t(`servicesPage.services.${service.id}.title`)}
            description={t(`servicesPage.services.${service.id}.description`)}
          />
        ))}
      </div>
    </section>
  )
}
