// components/ui/SectionHeading.jsx
// Shared "eyebrow + title + subtitle" header used by every homepage/about
// content section. Extracted to remove the copy-pasted markup that used to
// live independently in Services, WhyChooseUs, ProcessSection and
// TestimonialsSection (each with slightly different, drifting classes).

const CHIP_STYLES = {
  cyan: 'chip-cyan',
  purple: 'chip-purple',
}

/**
 * @param {string} id - id placed on the <h2> so callers can aria-labelledby it
 * @param {string} eyebrow - small kicker label above the heading
 * @param {'cyan'|'purple'} color - eyebrow chip color
 * @param {boolean} dot - show a pulsing accent dot inside the chip
 * @param {string} title
 * @param {string} [subtitle]
 * @param {string} [className]
 */
export default function SectionHeading({
  id,
  eyebrow,
  color = 'cyan',
  dot = false,
  title,
  subtitle,
  className = '',
}) {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-[48px] relative z-10 ${className}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-['Geist'] text-[12px] font-medium uppercase tracking-widest mb-4 ${CHIP_STYLES[color] ?? CHIP_STYLES.cyan}`}
        >
          {dot && <span className="w-1.5 h-1.5 rounded-full bg-[#42e3ff] animate-pulse" aria-hidden="true" />}
          {eyebrow}
        </div>
      )}

      <h2
        id={id}
        className="font-['Sora'] text-[clamp(26px,7vw,48px)] font-semibold leading-[1.2] tracking-[-0.01em] text-[#e2dfff] mb-[12px]"
      >
        {title}
      </h2>

      {subtitle && (
        <p className="font-['Inter'] text-[16px] md:text-[18px] leading-[1.6] text-[#c9c5d0]">{subtitle}</p>
      )}
    </div>
  )
}
