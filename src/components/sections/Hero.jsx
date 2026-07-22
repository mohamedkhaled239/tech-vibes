import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import HeroCodePanel from './HeroCodePanel'

export default function Hero() {
  const { t } = useTranslation()
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const xVal = e.clientX - rect.left
    const yVal = e.clientY - rect.top
    const yRotation = 10 * ((xVal - width / 2) / width)
    const xRotation = -10 * ((yVal - height / 2) / height)
    setRotate({ x: xRotation, y: yRotation })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="min-h-[80vh] flex items-center justify-center relative px-[16px] md:px-[64px] py-[48px] max-w-[1280px] mx-auto overflow-hidden"
    >
      {/* Ambient glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#42e3ff]/20 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-2 gap-[48px] items-center z-10 w-full">
        {/* Copy */}
        <div className="flex flex-col gap-[24px] animate-fade-in-up">
          <h1
            id="hero-heading"
            className="font-['Sora'] font-bold leading-[1.1] tracking-[-0.02em] text-glow text-[#e2dfff] text-[clamp(32px,8.5vw,64px)]"
          >
            {t('hero.heading')}
          </h1>
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#c9c5d0] max-w-xl">
            {t('hero.subheading')}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-[12px] mt-[12px]">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto" aria-label={t('hero.getStarted')}>
                {t('hero.getStarted')}
              </Button>
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full sm:w-auto" aria-label={t('hero.viewPortfolio')}>
                {t('hero.viewPortfolio')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero visual: live code panel with 3D parallax */}
        <div className="relative flex items-center justify-center perspective-1000">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full transition-transform duration-300 ease-out"
            style={{
              transform: `rotateY(${rotate.y}deg) rotateX(${rotate.x}deg)`,
            }}
          >
            <HeroCodePanel />
          </div>
        </div>
      </div>
    </section>
  )
}
