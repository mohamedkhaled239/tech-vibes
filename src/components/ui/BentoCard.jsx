// components/ui/BentoCard.jsx
import { useMouseGlow } from '../../hooks/useMouseGlow'

import webDevImg from '../../assets/web-development.png'
import digitalMarketingImg from '../../assets/digital-marketing.png'
import mobileDevImg from '../../assets/mobile-development.png'
import posSystemsImg from '../../assets/pos-systems.jpg'
import uiUxImg from '../../assets/ui-ux.jpg'

// Shared image used across other cards in the design as fallback
const CARD_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCBkUmYtWOzbF7o22QGHv9E9QrsPZHna-XQKIQ0Kc7sQnK0RdyTz0xfsDpWcD4QbqfDNDBmyH38Cx0jIBjY61DnKR3irBLsW1o2NiwU90brVZSdZjZHb29MGXFpNidpVbZf77aZMfKyRRhy5D4gstG4tCq_gPOXNObxDq-5qH1FJyc2LkVKgZ7RDGwDoqyhIlbbteJ-C0z3eFj6nj7u0FRH4SxCk0SmB7zL8AF3g0n_qUtAApSOTlhum6ZZjHkYWSReW12ZnV18yTM'

const iconColorMap = {
  tertiary: { text: 'text-[#42e3ff]' },
  primary:  { text: 'text-[#d3caff]' },
}

const titleColorMap = {
  tertiary: 'group-hover:text-[#42e3ff]',
  primary:  'group-hover:text-[#d3caff]',
}

/**
 * @param {object} props
 * @param {string} props.id - unique card identifier
 * @param {string} props.icon - material symbol name
 * @param {'tertiary'|'primary'} props.iconColor
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.colSpan  - tailwind col-span classes
 * @param {string} props.rowSpan  - tailwind row-span classes
 * @param {'bottom'|'center-row'|'between'|'row'} props.layout
 * @param {boolean} props.hasImage
 * @param {'sm'|'lg'} props.iconSize
 * @param {string} props.animDelay
 */
export default function BentoCard({
  id,
  icon,
  iconColor = 'tertiary',
  title,
  description,
  colSpan = '',
  rowSpan = '',
  layout = 'bottom',
  hasImage = false,
  iconSize = 'sm',
  animDelay = '0s',
}) {
  const { onMouseMove, onMouseLeave } = useMouseGlow()
  const colors = iconColorMap[iconColor] ?? iconColorMap.tertiary
  const titleHover = titleColorMap[iconColor] ?? titleColorMap.tertiary

  // Determine which image to show based on service ID
  let cardImg = CARD_IMAGE
  if (id === 'web') {
    cardImg = webDevImg
  } else if (id === 'mobile') {
    cardImg = mobileDevImg
  } else if (id === 'marketing') {
    cardImg = digitalMarketingImg
  } else if (id === 'pos') {
    cardImg = posSystemsImg
  } else if (id === 'uiux') {
    cardImg = uiUxImg
  }

  const iconEl = (
    <div
      className={`
        rounded-xl bg-[#0c0745]/50 border border-[#e2dfff]/10 backdrop-blur-md
        flex items-center justify-center shrink-0 ${colors.text}
        group-hover:scale-110 transition-transform duration-300
        ${iconSize === 'lg' ? 'w-16 h-16' : 'w-10 h-10'}
      `}
      aria-hidden="true"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: iconSize === 'lg' ? '32px' : '20px' }}
      >
        {icon}
      </span>
    </div>
  )

  return (
    <article
      className={`glass-card float-anim rounded-3xl relative overflow-hidden cursor-pointer group ${colSpan} ${rowSpan}`}
      style={{ animationDelay: animDelay }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={title}
    >
      {/* Mouse-tracking glow orb */}
      <div className="glow-orb" data-glow="true" aria-hidden="true" />

      {/* Background image overlay */}
      {hasImage && (
        <div
          className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          aria-hidden="true"
        >
          <div
            className={`absolute inset-0 z-10 ${
              layout === 'row'
                ? 'bg-gradient-to-r from-[#0A091A] via-[#0A091A]/70 to-transparent'
                : 'bg-gradient-to-t from-[#0A091A] via-[#0A091A]/80 to-transparent'
            }`}
          />
          <img
            src={cardImg}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Arrow outward badge */}
      <div className="absolute top-6 end-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
        <span className="material-symbols-outlined i18n-flip text-[#42e3ff] text-[20px]">arrow_outward</span>
      </div>

      {/* ── LAYOUT: row (horizontal) ───────────────────────────────── */}
      {layout === 'row' && (
        <div className="relative z-10 h-full flex flex-row items-center gap-6 p-8">
          {iconEl}
          <div>
            <h3 className={`font-['Sora'] text-[28px] font-semibold text-[#e2dfff] mb-2 ${titleHover} transition-colors`}>
              {title}
            </h3>
            <p className="text-body-md text-[#c9c5d0] max-w-lg">{description}</p>
          </div>
        </div>
      )}

      {/* ── LAYOUT: bottom (content anchored to bottom) ────────────── */}
      {layout === 'bottom' && (
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          <div className="mb-6">{iconEl}</div>
          <h3 className={`font-['Sora'] text-[22px] font-semibold text-[#e2dfff] mb-3 leading-tight ${titleHover} transition-colors`}>
            {title}
          </h3>
          <p className="text-[14px] text-[#c9c5d0] leading-relaxed">{description}</p>
        </div>
      )}

      {/* ── LAYOUT: center-row (icon + title side by side) ────────── */}
      {layout === 'center-row' && (
        <div className="relative z-10 h-full flex flex-col justify-center p-8">
          <div className="flex items-center gap-4 mb-3">
            {iconEl}
            <h3 className={`font-['Sora'] text-[20px] font-semibold text-[#e2dfff] ${titleHover} transition-colors`}>
              {title}
            </h3>
          </div>
          <p className="text-[14px] text-[#c9c5d0] leading-relaxed">{description}</p>
        </div>
      )}

      {/* ── LAYOUT: between (icon top, text bottom) ───────────────── */}
      {layout === 'between' && (
        <div className="relative z-10 h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            {iconEl}
            <span className="material-symbols-outlined i18n-flip text-[#c9c5d0] text-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
              arrow_outward
            </span>
          </div>
          <div>
            <h3 className={`font-['Sora'] text-[20px] font-semibold text-[#e2dfff] mb-2 ${titleHover} transition-colors`}>
              {title}
            </h3>
            <p className="text-[14px] text-[#c9c5d0] leading-relaxed line-clamp-2">{description}</p>
          </div>
        </div>
      )}
    </article>
  )
}
