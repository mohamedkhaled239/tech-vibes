// components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { NAV_LINKS } from '../../constants/data'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll while the mobile menu is open; Escape closes it.
  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  // NavLink class helper — active = highlighted, inactive = muted
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-label-md text-[#d3caff] font-bold border-b-2 border-[#d3caff] pb-1 transition-colors duration-300'
      : 'text-label-md text-[#c9c5d0] font-medium hover:text-[#42e3ff] transition-colors duration-300'

  const mobileLinkClass = ({ isActive }) =>
    `text-label-md min-h-[48px] flex items-center border-b border-white/5 last:border-0 transition-colors duration-300 ${isActive
      ? 'text-[#d3caff] font-bold'
      : 'text-[#c9c5d0] hover:text-[#42e3ff]'
    }`

  return (
    <header
      role="banner"
      className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/30' : ''
        }`}
    >
      <div className="max-w-[1280px] mx-auto px-[16px] md:px-[64px]">
        <div className="glass-panel rounded-none md:rounded-2xl mt-0 md:mt-3 flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center no-underline hover:opacity-80 transition-opacity"
            aria-label="TECH VIBES homepage"
          >
            <img src={logo} alt="TECH VIBES Logo" className="h-[80px] md:h-[75px] object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-[24px] items-center" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.key}
                to={link.href}
                className={linkClass}
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
          </nav>

          {/* Language switcher + CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <Link to="/contact" className="hidden md:inline-flex">
              <Button variant="nav" aria-label={t('nav.getStarted')}>
                {t('nav.getStarted')}
              </Button>
            </Link>

            {/* Hamburger (mobile) — 48px touch target */}
            <button
              className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-6 h-0.5 bg-[#e2dfff] transition-transform duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''
                  }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#e2dfff] transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''
                  }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#e2dfff] transition-transform duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden glass-panel rounded-b-2xl overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          aria-hidden={!menuOpen}
        >
          <nav className="flex flex-col gap-2 px-6 py-4 max-h-[calc(100vh-140px)] overflow-y-auto" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.key}
                to={link.href}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
            <Link to="/contact" className="mt-3 w-full block text-center" onClick={closeMenu}>
              <Button variant="nav" className="w-full text-center">
                {t('nav.getStarted')}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
