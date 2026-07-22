import WhyChooseUs from '../components/sections/WhyChooseUs'
import ProcessSection from '../components/sections/ProcessSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ScrollReveal from '../components/ui/ScrollReveal'
import useSeo from '../hooks/useSeo'

export default function AboutPage() {
  useSeo('about')

  return (
    <>
      {/* Ambient background halos */}
      <div
        className="fixed top-[20%] left-[-10%] w-[50vw] h-[50vw] halo-cyan rounded-full pointer-events-none -z-10 blur-3xl opacity-50"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-[10%] right-[-10%] w-[60vw] h-[60vw] halo-purple rounded-full pointer-events-none -z-10 blur-3xl opacity-40"
        aria-hidden="true"
      />

      <main
        id="main-content"
        className="flex-grow z-10 pt-[100px] md:pt-[120px]"
      >
        <ScrollReveal>
          <WhyChooseUs />
        </ScrollReveal>
        
        <ScrollReveal delay={150}>
          <ProcessSection />
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <TestimonialsSection />
        </ScrollReveal>
      </main>
    </>
  )
}
