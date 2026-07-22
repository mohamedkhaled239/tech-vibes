// components/sections/TestimonialsSection.jsx
import { useTranslation } from 'react-i18next'
import { TESTIMONIALS } from '../../constants/data'
import SectionHeading from '../ui/SectionHeading'

function Stars() {
  return (
    <div className="flex gap-1 mb-6 text-[#42e3ff]" aria-label="5 stars">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          star
        </span>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const { t: translate } = useTranslation()
  const quotes = translate('about.testimonials', { returnObjects: true })

  return (
    <section
      className="py-[96px] md:py-[160px] px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative border-t border-[#48454f]/10"
      aria-labelledby="testimonials-heading"
    >
      <SectionHeading
        id="testimonials-heading"
        eyebrow={translate('about.validation')}
        color="purple"
        title={translate('about.testimonialsHeading')}
        subtitle={translate('about.testimonialsSubheading')}
      />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        {TESTIMONIALS.map((item, i) => (
          <div
            key={item.id}
            className={`stat-card rounded-xl p-[32px] flex flex-col relative group overflow-hidden ${
              i === 1 ? 'md:-translate-y-4' : ''
            }`}
          >
            {/* Hover glow overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              aria-hidden="true"
            />

            <Stars />

            <blockquote className="font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0] mb-8 flex-grow">
              "{quotes[i]?.quote}"
            </blockquote>

            <div className="flex items-center gap-4 mt-auto">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-[#24225c] border border-[#48454f]/30 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={item.avatar}
                  alt={quotes[i]?.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
                />
              </div>
              <div>
                <div className="font-['Geist'] text-[14px] font-medium tracking-[0.05em] text-[#e2dfff]">
                  {quotes[i]?.name}
                </div>
                <div className="font-['Geist'] text-[12px] font-medium text-[#b7aee6]">
                  {quotes[i]?.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
