import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ui/ScrollReveal'
import useSeo from '../hooks/useSeo'
import q8nitroImg from '../assets/q8nitro.png'
import syTourismImg from '../assets/sytoursim/sytoursimlandscape.png'
import sooqCarsImg from '../assets/sooqcars/sooq-hero.png'
import easyTripsImg from '../assets/easytrips/easytrips-hero.png'
import vertexImg from '../assets/vertex/home.png'

// Stable category keys — never compare against translated display labels.
// Only categories with live projects are shown as filter tabs.
const CATEGORY_KEYS = ['all', 'webDev', 'mobileApps']

const PROJECTS = [
  {
    id: 'q8nitro',
    categoryKey: 'mobileApps',
    tags: ['Flutter', 'PHP Laravel'],
    image: q8nitroImg,
    colSpan: 'md:col-span-6',
    isLarge: false,
  },
  {
    id: 'sytourism',
    categoryKey: 'mobileApps',
    tags: ['Flutter', 'Government'],
    image: syTourismImg,
    colSpan: 'md:col-span-6',
    isLarge: false,
  },
  {
    id: 'easytrips',
    categoryKey: 'webDev',
    tags: ['Angular', 'Laravel'],
    image: easyTripsImg,
    colSpan: 'md:col-span-6',
    isLarge: false,
  },
  {
    id: 'sooqcars',
    categoryKey: 'webDev',
    tags: ['Angular', 'Marketplace'],
    image: sooqCarsImg,
    colSpan: 'md:col-span-6',
    isLarge: false,
  },
  {
    id: 'vertex',
    categoryKey: 'webDev',
    tags: ['Angular', 'Luxury Brand'],
    image: vertexImg,
    colSpan: 'md:col-span-6',
    isLarge: false,
  },
  {
    id: 'ancientegypt',
    categoryKey: 'mobileApps',
    tags: ['Flutter', '6 Languages'],
    image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=2000&auto=format&fit=crop',
    colSpan: 'md:col-span-6',
    isLarge: false,
  },
  {
    id: 'halarashaqaty',
    categoryKey: 'mobileApps',
    tags: ['Flutter', 'Booking'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop',
    colSpan: 'md:col-span-6',
    isLarge: false,
  },
]

export default function PortfolioPage() {
  const { t } = useTranslation()
  useSeo('portfolio')

  const [activeTab, setActiveTab] = useState('all')
  const [rotate, setRotate] = useState({ x: 5, y: -10 })

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeTab === 'all') return true
    return project.categoryKey === activeTab
  })

  // 3D Parallax effect for featured mockup
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const xVal = e.clientX - rect.left
    const yVal = e.clientY - rect.top
    const yRotation = 15 * ((xVal - width / 2) / width)
    const xRotation = -15 * ((yVal - height / 2) / height)
    setRotate({ x: xRotation, y: yRotation })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 5, y: -10 })
  }

  return (
    <>
      {/* Ambient background glows */}
      <div
        className="fixed top-0 left-1/4 w-96 h-96 bg-[#d3caff]/10 rounded-full blur-[120px] pointer-events-none z-[-1]"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#42e3ff]/10 rounded-full blur-[120px] pointer-events-none z-[-1]"
        aria-hidden="true"
      />

      <main className="flex-grow pt-[100px] relative overflow-hidden">
        {/* ── Hero Section ────────────────────────────────────────── */}
        <ScrollReveal>
          <section className="relative pt-32 pb-24 px-[16px] md:px-[64px] max-w-[1280px] mx-auto flex flex-col items-center text-center z-10 grid-bg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0745] z-[-1]" />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#42e3ff]/10 border border-[#42e3ff]/20 mb-[24px]">
              <span className="w-2 h-2 rounded-full bg-[#42e3ff] animate-pulse" />
              <span className="font-['Geist'] text-[12px] font-medium text-[#42e3ff] tracking-widest uppercase">
                {t('portfolio.page.badge')}
              </span>
            </div>

            <h1 className="font-['Sora'] text-[clamp(32px,8vw,64px)] font-bold leading-[1.1] tracking-[-0.02em] text-[#e2dfff] mb-[24px] max-w-4xl glow-cyan-text">
              {t('portfolio.page.heading')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d3caff] to-[#42e3ff]">
                {t('portfolio.page.headingHighlight')}
              </span>
            </h1>

            <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c9c5d0] max-w-2xl mb-[48px]">
              {t('portfolio.page.subheading')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/contact"
                className="
                  bg-[#b7aee6] text-[#474070] font-['Geist'] text-[14px] font-semibold px-8 py-4 rounded-full
                  transition-all hover:shadow-[0_0_20px_rgba(183,174,230,0.5)] active:scale-95 flex items-center justify-center gap-2
                "
              >
                <span>{t('portfolio.page.startProject')}</span>
                <span className="material-symbols-outlined i18n-flip text-sm">arrow_forward</span>
              </Link>
              <Link
                to="/services"
                className="
                  border border-[#b7aee6] text-[#b7aee6] font-['Geist'] text-[14px] font-semibold px-8 py-4 rounded-full
                  transition-all hover:bg-[#b7aee6]/10 active:scale-95 flex items-center justify-center
                "
              >
                {t('portfolio.page.viewServices')}
              </Link>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Filter Bar ──────────────────────────────────────────── */}
        <ScrollReveal delay={150}>
          <section className="px-[16px] md:px-[64px] max-w-[1280px] mx-auto mb-[24px] z-20 relative">
            <div className="glass-panel rounded-full px-2 py-2 flex overflow-x-auto no-scrollbar gap-2 max-w-fit mx-auto">
              {CATEGORY_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
                    px-6 py-2 min-h-[44px] touch-manipulation rounded-full font-['Geist'] text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer
                    ${
                      activeTab === key
                        ? 'bg-[#24225c] text-[#d3caff] shadow-md'
                        : 'text-[#c9c5d0] hover:text-[#e2dfff] hover:bg-[#191751]/50'
                    }
                  `}
                >
                  {t(`portfolio.categories.${key}`)}
                </button>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* ── Projects Grid ───────────────────────────────────────── */}
        <ScrollReveal delay={250}>
          <section className="px-[16px] md:px-[64px] max-w-[1280px] mx-auto mb-32 relative z-10">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] auto-rows-[400px]">
                {filteredProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/portfolio/${p.id}`}
                    className={`
                      ${p.colSpan} glass-card rounded-2xl overflow-hidden relative group cursor-pointer border border-[#d3caff]/15 block
                    `}
                  >
                    {/* Image background with luminosity blend */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${p.image})` }}
                      title={t(`portfolio.projects.${p.id}.title`)}
                    />
                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0745] via-[#0c0745]/70 to-transparent" />

                    {/* Content Container */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                      <div className="flex gap-2 mb-4">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#d3caff]/10 text-[#d3caff] font-['Geist'] text-[10px] px-2 py-1 rounded-sm uppercase border border-[#d3caff]/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-['Sora'] text-[32px] font-semibold text-[#e2dfff] mb-2 leading-[1.3]">
                        {t(`portfolio.projects.${p.id}.title`)}
                      </h3>

                      <p
                        className={`
                          font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0] max-w-xl mb-4
                          ${
                            p.isLarge
                              ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0'
                              : ''
                          }
                        `}
                      >
                        {t(`portfolio.projects.${p.id}.description`)}
                      </p>

                      <div className="flex items-center text-[#42e3ff] font-['Geist'] text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        <span>{t('portfolio.viewCaseStudy')}</span>
                        <span className="material-symbols-outlined i18n-flip ms-1 text-sm">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-16 text-center max-w-xl mx-auto border border-[#d3caff]/10">
                <span className="material-symbols-outlined text-[48px] text-[#42e3ff] mb-4">
                  search_off
                </span>
                <h3 className="font-['Sora'] text-2xl text-[#e2dfff] mb-2">{t('portfolio.page.noProjectsTitle')}</h3>
                <p className="font-['Inter'] text-[#c9c5d0] mb-6">
                  {t('portfolio.page.noProjectsText')}
                </p>
                <Link
                  to="/contact"
                  className="bg-[#b7aee6] text-[#474070] font-['Geist'] text-[14px] font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all"
                >
                  {t('portfolio.page.letsDiscuss')}
                </Link>
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* ── Featured Case Study ─────────────────────────────────── */}
        <ScrollReveal>
          <section className="py-32 relative overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#2f2e68]/20 border-y border-[#48454f]/10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#42e3ff]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-center">
              {/* Content Left */}
              <div className="w-full md:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d3caff]/10 border border-[#d3caff]/20 mb-6">
                  <span className="material-symbols-outlined text-[#d3caff] text-sm" aria-hidden="true">
                    star
                  </span>
                  <span className="font-['Geist'] text-[12px] font-medium text-[#d3caff] uppercase">
                    {t('portfolio.page.featuredBadge')}
                  </span>
                </div>

                <h2 className="font-['Sora'] text-[32px] md:text-[48px] leading-[1.2] font-semibold text-[#e2dfff] mb-6">
                  {t('portfolio.page.featuredTitle')} <span className="text-[#42e3ff]">{t('portfolio.page.featuredHighlight')}</span> {t('portfolio.page.featuredSuffix')}
                </h2>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="font-['Geist'] text-[14px] font-medium text-[#d3caff] mb-2 uppercase tracking-wider">
                      {t('portfolio.page.challenge')}
                    </h4>
                    <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0]">
                      {t('portfolio.page.challengeText')}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-['Geist'] text-[14px] font-medium text-[#42e3ff] mb-2 uppercase tracking-wider">
                      {t('portfolio.page.solution')}
                    </h4>
                    <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0]">
                      {t('portfolio.page.solutionText')}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glass-card p-4 rounded-lg border-s-2 border-s-[#42e3ff]">
                    <div className="font-['Sora'] text-[32px] font-semibold text-[#e2dfff]" dir="ltr">+240%</div>
                    <div className="font-['Geist'] text-[12px] font-medium text-[#c9c5d0]">{t('portfolio.page.userRetention')}</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border-s-2 border-s-[#d3caff]">
                    <div className="font-['Sora'] text-[32px] font-semibold text-[#e2dfff]" dir="ltr">&lt; 50ms</div>
                    <div className="font-['Geist'] text-[12px] font-medium text-[#c9c5d0]">{t('portfolio.page.latency')}</div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="
                    inline-flex items-center gap-2 border border-[#42e3ff] text-[#42e3ff] hover:bg-[#42e3ff]/10
                    font-['Geist'] text-[14px] font-semibold px-6 py-3 rounded-full transition-colors
                  "
                >
                  <span>{t('portfolio.page.readFullStudy')}</span>
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                </Link>
              </div>

              {/* Visual Mockup Right */}
              <div className="w-full md:w-1/2 relative perspective-1000">
                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="w-full aspect-[4/3] glass-panel rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,199,225,0.15)] transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotateY(${rotate.y}deg) rotateX(${rotate.x}deg)`,
                  }}
                >
                  <div className="w-full h-full bg-[#15124d] rounded-xl overflow-hidden relative border border-[#48454f]/20">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')`,
                      }}
                      title="A detailed SaaS dashboard interface visualization"
                    />

                    {/* UI Decorators */}
                    <div className="absolute top-4 inset-x-4 flex justify-between items-center bg-[#191751]/80 backdrop-blur-md p-3 rounded-lg border border-[#48454f]/10">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ffb4ab]" />
                        <div className="w-3 h-3 rounded-full bg-[#b7aee6]" />
                        <div className="w-3 h-3 rounded-full bg-[#42e3ff]" />
                      </div>
                      <div className="h-2 w-24 bg-[#33326c] rounded-full" />
                    </div>
                  </div>

                  {/* Floating live graphs panel */}
                  <div
                    className="absolute -end-8 -bottom-8 w-48 h-32 glass-panel rounded-lg p-4 shadow-xl border border-[#42e3ff]/30 animate-bounce"
                    style={{ animationDuration: '4s' }}
                  >
                    <div className="text-[10px] uppercase font-['Geist'] text-[#c9c5d0]/70 mb-2">
                      Live Processing
                    </div>
                    <div className="flex items-end gap-1.5 h-12">
                      <div className="w-full bg-[#42e3ff]/20 rounded-t h-full">
                        <div className="bg-[#42e3ff] w-full h-[60%] rounded-t" />
                      </div>
                      <div className="w-full bg-[#42e3ff]/20 rounded-t h-full">
                        <div className="bg-[#42e3ff] w-full h-[80%] rounded-t" />
                      </div>
                      <div className="w-full bg-[#42e3ff]/20 rounded-t h-full">
                        <div className="bg-[#42e3ff] w-full h-[40%] rounded-t" />
                      </div>
                      <div className="w-full bg-[#42e3ff]/20 rounded-t h-full">
                        <div className="bg-[#42e3ff] w-full h-[100%] rounded-t" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Testimonials Section ────────────────────────────────── */}
        <ScrollReveal>
          <section className="py-32 px-[16px] md:px-[64px] max-w-[1280px] mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-['Sora'] text-[32px] md:text-[48px] leading-[1.2] font-semibold text-[#e2dfff] mb-4">
                {t('portfolio.page.testimonials.badge')}
              </h2>
              <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0] max-w-2xl mx-auto">
                {t('portfolio.page.testimonials.subheading')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="glass-card p-8 rounded-2xl relative border border-[#d3caff]/15 flex flex-col justify-between">
                <span
                  className="material-symbols-outlined absolute top-6 end-6 text-4xl text-[#24225c] opacity-50 font-bold"
                  aria-hidden="true"
                >
                  format_quote
                </span>
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[#42e3ff] text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#e2dfff] mb-8 relative z-10">
                    "{t('portfolio.page.testimonials.testimonial1')}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-[#48454f]/20 pt-6">
                  <div className="w-12 h-12 rounded-full bg-[#24225c] border border-[#48454f]/30 flex items-center justify-center text-[#d3caff] font-bold font-['Sora']">
                    EK
                  </div>
                  <div>
                    <div className="font-['Geist'] text-[14px] font-semibold text-[#e2dfff]">{t('portfolio.page.testimonials.name1')}</div>
                    <div className="font-['Geist'] text-[12px] font-medium text-[#c9c5d0]">{t('portfolio.page.testimonials.role1')}</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="glass-card p-8 rounded-2xl relative border border-[#d3caff]/15 flex flex-col justify-between transform md:-translate-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-t-[#d3caff]/30">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d3caff]/20 border border-[#d3caff]/30 text-[#d3caff] font-['Geist'] text-[10px] font-semibold px-3 py-1 rounded-full uppercase backdrop-blur-md">
                  {t('portfolio.page.testimonials.highestRated')}
                </div>
                <span
                  className="material-symbols-outlined absolute top-6 end-6 text-4xl text-[#24225c] opacity-50 font-bold"
                  aria-hidden="true"
                >
                  format_quote
                </span>
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[#d3caff] text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#e2dfff] mb-8 relative z-10">
                    "{t('portfolio.page.testimonials.testimonial2')}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-[#48454f]/20 pt-6">
                  <div className="w-12 h-12 rounded-full bg-[#24225c] border border-[#48454f]/30 flex items-center justify-center text-[#d3caff] font-bold font-['Sora']">
                    MR
                  </div>
                  <div>
                    <div className="font-['Geist'] text-[14px] font-semibold text-[#e2dfff]">{t('portfolio.page.testimonials.name2')}</div>
                    <div className="font-['Geist'] text-[12px] font-medium text-[#c9c5d0]">{t('portfolio.page.testimonials.role2')}</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="glass-card p-8 rounded-2xl relative border border-[#d3caff]/15 flex flex-col justify-between">
                <span
                  className="material-symbols-outlined absolute top-6 end-6 text-4xl text-[#24225c] opacity-50 font-bold"
                  aria-hidden="true"
                >
                  format_quote
                </span>
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[#42e3ff] text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#e2dfff] mb-8 relative z-10">
                    "{t('portfolio.page.testimonials.testimonial3')}"
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-[#48454f]/20 pt-6">
                  <div className="w-12 h-12 rounded-full bg-[#24225c] border border-[#48454f]/30 flex items-center justify-center text-[#d3caff] font-bold font-['Sora']">
                    SL
                  </div>
                  <div>
                    <div className="font-['Geist'] text-[14px] font-semibold text-[#e2dfff]">{t('portfolio.page.testimonials.name3')}</div>
                    <div className="font-['Geist'] text-[12px] font-medium text-[#c9c5d0]">{t('portfolio.page.testimonials.role3')}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Conversion CTA ──────────────────────────────────────── */}
        <ScrollReveal>
          <section className="py-32 relative px-[16px] md:px-[64px] z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-[#060141] to-transparent z-[-1]" />
            <div className="px-8 py-16 md:p-16 max-w-4xl mx-auto text-center relative z-10 glass-panel rounded-[2rem] border border-[#42e3ff]/30">
              <h2 className="font-['Sora'] text-[clamp(32px,8vw,64px)] font-bold leading-[1.1] text-[#e2dfff] mb-6">
                {t('portfolio.page.cta.heading')} <br />
                <span className="text-[#42e3ff] glow-cyan-text">{t('portfolio.page.cta.headingHighlight')}</span>
              </h2>

              <p className="font-['Inter'] text-[18px] leading-[1.6] text-[#c9c5d0] mb-10 max-w-2xl mx-auto">
                {t('portfolio.page.cta.subheading')}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="
                    bg-[#42e3ff] text-[#00363e] font-['Geist'] text-[14px] font-bold px-10 py-4 rounded-full
                    transition-all hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] active:scale-95
                  "
                >
                  {t('portfolio.page.cta.getQuote')}
                </Link>
                <Link
                  to="/contact"
                  className="
                    bg-[#191751] hover:bg-[#24225c] border border-[#48454f]/30 text-[#e2dfff]
                    font-['Geist'] text-[14px] px-10 py-4 rounded-full transition-all active:scale-95
                    flex items-center justify-center gap-2
                  "
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  <span>{t('portfolio.page.cta.contactUs')}</span>
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
