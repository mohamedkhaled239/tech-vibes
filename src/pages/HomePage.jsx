// pages/HomePage.jsx
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Portfolio from '../components/sections/Portfolio'
import ProcessSection from '../components/sections/ProcessSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTA from '../components/sections/CTA'
import useSeo from '../hooks/useSeo'

export default function HomePage() {
  const { t } = useTranslation()

  // Organization + WebSite structured data — helps search engines understand
  // the business entity behind the site (rich results, knowledge panel).
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'TECH VIBES',
          url: 'https://tech-vibes.org',
          logo: 'https://tech-vibes.org/favicon.svg',
          description: t('meta.home.description'),
          sameAs: [],
        },
        {
          '@type': 'WebSite',
          name: t('meta.siteName'),
          url: 'https://tech-vibes.org',
        },
      ],
    }),
    [t]
  )

  useSeo('home', { jsonLd })

  return (
    <main className="flex-grow pt-24 bg-grid-pattern relative" id="main-content">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <ProcessSection />
      <TestimonialsSection />
      <CTA />
    </main>
  )
}
