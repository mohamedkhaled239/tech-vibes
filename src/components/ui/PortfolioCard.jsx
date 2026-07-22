// components/ui/PortfolioCard.jsx
import { Link } from 'react-router-dom'

// ─── Tag chip ────────────────────────────────────────────────────────────────
function Tag({ label, color }) {
  const styles = {
    primary: 'bg-[#d3caff]/10 text-[#d3caff] border-[#d3caff]/20',
    tertiary: 'bg-[#42e3ff]/10 text-[#42e3ff] border-[#42e3ff]/20',
  }
  return (
    <span className={`font-['Geist'] text-[12px] font-medium px-3 py-1 rounded-full border ${styles[color] ?? styles.primary}`}>
      {label}
    </span>
  )
}

// ─── Featured Card (Neo-Bank, large with image + stat bar) ───────────────────
function FeaturedCard({ tags, title, subtitle, image, stat }) {
  return (
    <div className="portfolio-card rounded-2xl p-8 flex flex-col justify-between group overflow-hidden relative min-h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#d3caff]/5 to-transparent z-0" aria-hidden="true" />

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => <Tag key={t.label} {...t} />)}
        </div>
        <h2 className="font-['Sora'] text-[32px] font-semibold leading-[1.3] text-[#e2dfff] mb-1">{title}</h2>
        <p className="font-['Inter'] text-[16px] text-[#c9c5d0]">{subtitle}</p>
      </div>

      {/* Image strip */}
      <div className="relative z-10 w-full h-[250px] rounded-xl overflow-hidden border border-[#e2dfff]/10 bg-[#15124d]/50">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen"
        />

        {/* Animated stat bar */}
        {stat && (
          <div className="absolute bottom-4 left-4 right-4 h-16 bg-[#2f2e68]/80 backdrop-blur-md rounded-lg border border-[#e2dfff]/10 flex items-center px-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-8 h-8 rounded-full bg-[#42e3ff]/20 flex items-center justify-center me-4" aria-hidden="true">
              <span className="material-symbols-outlined text-[16px] text-[#42e3ff]">{stat.icon}</span>
            </div>
            <div>
              <div className="font-['Geist'] text-[12px] text-[#c9c5d0]">{stat.label}</div>
              <div dir="ltr" className="font-['Sora'] text-[20px] font-bold text-[#42e3ff]">{stat.value}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Chart Card (Aurora Analytics) ──────────────────────────────────────────
function ChartCard({ tags, title, subtitle }) {
  return (
    <div className="portfolio-card rounded-2xl p-8 flex flex-col justify-between group relative overflow-hidden min-h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-bl from-[#42e3ff]/5 to-transparent z-0" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => <Tag key={t.label} {...t} />)}
        </div>
        <h2 className="font-['Sora'] text-[32px] font-semibold leading-[1.3] text-[#e2dfff] mb-1">{title}</h2>
        <p className="font-['Inter'] text-[16px] text-[#c9c5d0]">{subtitle}</p>
      </div>

      {/* SVG Chart */}
      <div className="relative z-10 mt-auto flex justify-center items-center">
        <div className="w-full h-[180px] bg-[#15124d]/50 rounded-xl border border-[#e2dfff]/10 p-4 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-px bg-[#e2dfff]/20" aria-hidden="true" />
          <div className="absolute bottom-0 left-4 w-px h-full bg-[#e2dfff]/20" aria-hidden="true" />
          <svg
            className="absolute bottom-0 left-4 w-[calc(100%-16px)] h-[calc(100%-16px)]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-label="Analytics chart showing upward trend"
            role="img"
          >
            <defs>
              <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#42e3ff" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M0,80 Q20,60 40,70 T80,40 T100,20"
              fill="none"
              stroke="#42e3ff"
              strokeWidth="2"
              className="opacity-70 drop-shadow-[0_0_8px_rgba(66,227,255,0.8)]"
            />
            <path
              d="M0,80 Q20,60 40,70 T80,40 T100,20 L100,100 L0,100 Z"
              fill="url(#cyan-grad)"
              className="opacity-20"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─── Icon Card (Pulse, Growth Engine, Nexus) ─────────────────────────────────
function IconCard({ tags, title, subtitle, icon, iconColor }) {
  const iconStyles = {
    tertiary: {
      wrapper: 'border-[#42e3ff]/30 bg-[#42e3ff]/10 text-[#42e3ff] group-hover:bg-[#42e3ff] group-hover:text-[#060141]',
    },
    primary: {
      wrapper: 'border-[#d3caff]/30 bg-[#d3caff]/10 text-[#d3caff] group-hover:bg-[#d3caff] group-hover:text-[#060141]',
    },
  }
  const style = iconStyles[iconColor] ?? iconStyles.tertiary

  return (
    <div className="portfolio-card rounded-2xl p-8 flex flex-col group relative overflow-hidden min-h-[300px]">
      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => <Tag key={t.label} {...t} />)}
        </div>
        <h2 className="font-['Sora'] text-[24px] font-semibold text-[#e2dfff] mb-1">{title}</h2>
        <p className="font-['Inter'] text-[16px] text-[#c9c5d0]">{subtitle}</p>
      </div>
      <div className="mt-auto pt-6 flex justify-end">
        <div
          className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${style.wrapper}`}
          aria-hidden="true"
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main export — picks the right variant, links to the case study ──────────
export default function PortfolioCard({ variant, colSpan, id, ...props }) {
  const card = {
    featured: <FeaturedCard {...props} />,
    chart:    <ChartCard {...props} />,
    icon:     <IconCard {...props} />,
  }[variant] ?? null

  return (
    <div className={colSpan}>
      <Link
        to={`/portfolio/${id}`}
        aria-label={`View ${props.title} case study`}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-4 rounded-2xl"
      >
        {card}
      </Link>
    </div>
  )
}
