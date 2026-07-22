import { useTranslation } from 'react-i18next'
import ContactForm from '../components/sections/ContactForm'
import ContactInfo from '../components/sections/ContactInfo'
import ScrollReveal from '../components/ui/ScrollReveal'
import useSeo from '../hooks/useSeo'

export default function ContactPage() {
  const { t } = useTranslation()
  useSeo('contact')

  return (
    <>
      {/* Ambient halos */}
      <div
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full -z-10 pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[20%] right-0 w-[500px] h-[500px] rounded-full -z-10 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <main
        id="main-content"
        className="flex-grow pt-[120px] pb-[160px] px-[16px] md:px-[64px] max-w-[1280px] mx-auto w-full relative z-10"
      >
        {/* ── CTA Header ──────────────────────────────────────── */}
        <ScrollReveal>
          <section className="text-center mb-[96px] relative" aria-labelledby="contact-heading">
            {/* Purple halo behind heading */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none -z-10"
              style={{ background: 'radial-gradient(circle, rgba(183,174,230,0.1) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <h1
              id="contact-heading"
              className="font-['Sora'] text-[clamp(32px,8vw,64px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#d3caff] mb-[12px] drop-shadow-lg"
            >
              {t('contact.heading')}
            </h1>
            <p className="font-['Inter'] text-[16px] md:text-[18px] leading-[1.6] text-[#c9c5d0] max-w-2xl mx-auto">
              {t('contact.subheading')}
            </p>
          </section>
        </ScrollReveal>

        {/* ── Bento Grid: Form + Info ──────────────────────────── */}
        <ScrollReveal delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
            <ContactForm />
            <ContactInfo />
          </div>
        </ScrollReveal>
      </main>
    </>
  )
}
