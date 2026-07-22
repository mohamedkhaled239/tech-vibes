// components/casestudy/TestimonialSection.tsx
// One voice, given room — an oversized editorial quote card.

import type { CaseStudy } from '../../types/caseStudy'
import { accentGradient, rgba } from './lib'
import { Reveal, NoiseOverlay } from './primitives'

export default function TestimonialSection({ study }: { study: CaseStudy }) {
  const { accent, testimonial } = study
  return (
    <section className="relative max-w-[1280px] mx-auto px-[16px] md:px-[64px] py-20 md:py-28" aria-label="Client testimonial">
      <Reveal>
        <figure
          className="relative rounded-[2.5rem] border backdrop-blur-md p-10 md:p-16 overflow-hidden"
          style={{ borderColor: rgba(accent.primary, 0.18), background: 'rgba(31, 29, 87, 0.35)' }}
        >
          <NoiseOverlay opacity={0.04} />
          <span
            aria-hidden="true"
            className="absolute -top-6 left-8 md:left-14 font-['Sora'] text-[160px] leading-none font-extrabold select-none bg-clip-text text-transparent opacity-30"
            style={{ backgroundImage: accentGradient(accent) }}
          >
            “
          </span>
          <blockquote className="relative">
            <p className="font-['Sora'] text-[clamp(20px,2.8vw,32px)] font-semibold leading-[1.45] tracking-tight text-[#e2dfff] max-w-4xl">
              {testimonial.quote}
            </p>
          </blockquote>
          <figcaption className="relative flex items-center gap-4 mt-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-['Sora'] font-bold text-[16px] text-[#0A091A]"
              style={{ background: accentGradient(accent) }}
              aria-hidden="true"
            >
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <div className="font-['Sora'] text-[15px] font-bold text-[#e2dfff]">{testimonial.name}</div>
              <div className="font-['Inter'] text-[13px] text-[#c9c5d0]/80">
                {testimonial.role}, {testimonial.company}
              </div>
            </div>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
