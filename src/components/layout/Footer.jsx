import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SOCIAL_LINKS, FOOTER_LINKS } from '../../constants/data'
import logo from '../../assets/logo.png'

// Social icon images for custom premium design
import whatsapp from '../../icons/WhatsApp.webp'
import instagram from '../../icons/Instagram.webp'
import facebook from '../../icons/Facebook.webp'
import tiktok from '../../icons/tiktok.webp'

const ICON_MAP = { whatsapp, instagram, facebook, tiktok }

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      className="bg-[#060141] w-full border-t border-[#e2dfff]/5 py-[48px] relative z-10"
      role="contentinfo"
    >
      <div className="max-w-[1280px] mx-auto px-[16px] md:px-[64px]">

        {/* ── Grid Layout ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] mb-[48px] text-start">

          {/* Column 1: Our Branches */}
          <div className="space-y-4">
            <h4 className="font-['Sora'] text-xl text-[#d3caff] font-bold">
              {t('footer.branches')}
            </h4>

            <ul className="space-y-3 font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0]">
              <li className="flex items-start gap-2">
                <span
                  className="material-symbols-outlined text-[#42e3ff] mt-1 text-[20px]"
                  aria-hidden="true"
                >
                  near_me
                </span>
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4">
            <h4 className="font-['Sora'] text-xl text-[#d3caff] font-bold">
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-3 font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#42e3ff] text-[20px]" aria-hidden="true">
                  call
                </span>
                <a href="tel:01004226988" className="hover:text-[#42e3ff] transition-colors" dir="ltr">
                  01004226988
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#42e3ff] text-[20px]" aria-hidden="true">
                  mail
                </span>
                <a href="mailto:Sales@tech-vibes.org" className="hover:text-[#42e3ff] transition-colors" dir="ltr">
                  Sales@tech-vibes.org
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#42e3ff] text-[20px]" aria-hidden="true">
                  mail
                </span>
                <a href="mailto:Support@tech-vibes.org" className="hover:text-[#42e3ff] transition-colors" dir="ltr">
                  Support@tech-vibes.org
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div className="space-y-4">
            <h4 className="font-['Sora'] text-xl text-[#d3caff] font-bold">
              {t('footer.importantLinks')}
            </h4>
            <ul className="space-y-3 font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <Link to={link.href} className="hover:text-[#42e3ff] transition-colors">
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Brand Section */}
          <div className="space-y-4 flex flex-col items-start md:items-end text-start md:text-end">
            {/* Logo */}
            <Link to="/" className="hover:opacity-85 transition-opacity">
              <img src={logo} alt="TECH VIBES Logo" className="h-[75px] object-contain -ms-2 md:ms-0 md:-me-2" />
            </Link>
            <p className="font-['Inter'] text-[15px] leading-[1.6] text-[#c9c5d0] max-w-xs">
              {t('footer.tagline')}
            </p>
            {/* Social Links dynamically using the user's WebP icons */}
            <div className="flex gap-3 pt-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="
                    w-12 h-12 rounded-xl
                    bg-[#191751] border border-[#e2dfff]/10
                    flex items-center justify-center
                    hover:border-[#42e3ff]/50
                    hover:shadow-[0_0_10px_rgba(66,227,255,0.2)]
                    hover:scale-110
                    transition-all duration-300
                  "
                >
                  <img
                    src={ICON_MAP[s.id]}
                    alt={s.label}
                    className="w-5 h-5 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-[24px] border-t border-[#e2dfff]/10 text-[#c9c5d0]/70 font-['Inter'] gap-4">

          {/* Quick Contact Buttons */}
          <div className="flex gap-4">
            {/* WhatsApp Quick Chat */}
            <a
              href="https://wa.me/201004226988"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors shadow-lg hover:scale-110 duration-200"
              aria-label={t('footer.chatWhatsApp')}
            >
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                chat
              </span>
            </a>
            {/* Direct Phone Call */}
            <a
              href="tel:01004226988"
              className="w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center text-white hover:bg-teal-500 transition-colors shadow-lg hover:scale-110 duration-200"
              aria-label={t('footer.callDirect')}
            >
              <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                call
              </span>
            </a>
          </div>

          <div className="text-sm font-['Geist'] text-center">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>

      </div>
    </footer>
  )
}
