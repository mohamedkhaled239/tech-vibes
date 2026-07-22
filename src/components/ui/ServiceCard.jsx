// components/ui/ServiceCard.jsx
import { useMouseGlow } from '../../hooks/useMouseGlow'

const iconColorMap = {
  tertiary: {
    bg: 'bg-[#42e3ff]/10',
    text: 'text-[#42e3ff]',
  },
  primary: {
    bg: 'bg-[#d3caff]/10',
    text: 'text-[#d3caff]',
  },
}

/**
 * @param {string} icon - Material Symbol name
 * @param {'tertiary'|'primary'} iconColor
 * @param {string} title
 * @param {string} description
 */
export default function ServiceCard({ icon, iconColor = 'tertiary', title, description }) {
  const colors = iconColorMap[iconColor] ?? iconColorMap.tertiary
  const { onMouseMove, onMouseLeave } = useMouseGlow()

  return (
    <article
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass-card rounded-xl p-[24px] flex flex-col gap-3 transition-all duration-300 relative overflow-hidden group"
      aria-label={title}
    >
      {/* Mouse-tracking glow orb, positioned directly via the DOM — no re-render per pixel of movement */}
      <div className="glow-orb" data-glow="true" aria-hidden="true" />

      <div
        className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text} shrink-0 relative z-10`}
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>

      <h3 className="font-['Sora'] text-[24px] font-semibold leading-[1.3] text-[#e2dfff] relative z-10">
        {title}
      </h3>

      <p className="text-body-md text-[#c9c5d0] relative z-10">{description}</p>
    </article>
  )
}
