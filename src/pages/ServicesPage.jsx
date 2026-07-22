import ServicesHero from '../components/sections/ServicesHero'
import BentoGrid from '../components/sections/BentoGrid'
import ScrollReveal from '../components/ui/ScrollReveal'
import useSeo from '../hooks/useSeo'

export default function ServicesPage() {
  useSeo('services')

  return (
    <>
      {/* Fixed full-page background orbs */}
      <div
        className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[#d3caff]/5 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50 mix-blend-screen"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#42e3ff]/10 rounded-full blur-[100px] -z-10 pointer-events-none opacity-40 mix-blend-screen"
        aria-hidden="true"
      />

      <main
        id="main-content"
        className="pt-[140px] pb-32 px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative z-10"
      >
        <ScrollReveal>
          <ServicesHero />
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <BentoGrid />
        </ScrollReveal>
      </main>
    </>
  )
}
