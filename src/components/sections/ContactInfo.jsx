// components/sections/ContactInfo.jsx
import { useTranslation } from 'react-i18next'
import { SOCIAL_LINKS } from '../../constants/data'

import whatsapp from '../../icons/WhatsApp.webp'
import instagram from '../../icons/Instagram.webp'
import facebook from '../../icons/Facebook.webp'
import tiktok from '../../icons/tiktok.webp'

const ICON_MAP = { whatsapp, instagram, facebook, tiktok }

// ─── FAQ Accordion item ────────────────────────────────────────────
function FaqItem({ question, answer, isLast }) {
  return (
    <details className={`group ${!isLast ? 'border-b border-[#48454f]/20 pb-4' : 'pb-2'}`}>
      <summary className="flex justify-between items-center font-['Geist'] text-[14px] font-medium tracking-[0.05em] text-[#e2dfff] cursor-pointer list-none hover:text-[#42e3ff] transition-colors">
        {question}
        <span
          className="material-symbols-outlined text-[#c9c5d0] group-open:rotate-180 transition-transform duration-300 shrink-0 ms-2"
          aria-hidden="true"
        >
          expand_more
        </span>
      </summary>
      <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0] mt-2 ps-3 border-s-2 border-[#42e3ff]/30">
        {answer}
      </p>
    </details>
  )
}

// ─── Main sidebar ──────────────────────────────────────────────────
export default function ContactInfo() {
  const { t } = useTranslation()
  const faqItems = t('contact.faq', { returnObjects: true })

  return (
    <div className="lg:col-span-5 flex flex-col gap-[24px]">

      {/* FAQ Panel */}
      <div className="glass-panel rounded-xl p-[24px] md:p-[32px] flex-grow">
        <h3 className="font-['Sora'] text-[32px] font-semibold leading-[1.3] text-[#d3caff] mb-[24px] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#42e3ff]" aria-hidden="true">help</span>
          {t('contact.faqTitle')}
        </h3>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isLast={i === faqItems.length - 1}
            />
          ))}
        </div>
      </div>

      {/* HQ + Socials Panel */}
      <div className="glass-panel rounded-xl p-[24px] md:p-[32px] relative overflow-hidden">
        <div
          className="absolute top-0 end-0 w-32 h-32 bg-[#b7aee6]/5 blur-[40px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-[16px]">
          {/* Location */}
          <div>
            <p className="font-['Geist'] text-[12px] font-medium uppercase tracking-wider text-[#42e3ff] mb-1">
              {t('contact.basedIn')}
            </p>
            <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#c9c5d0]">
              {t('contact.location')}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-[12px]" aria-label="Social media">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="
                  w-12 h-12 rounded-xl
                  bg-[#0A091A] border border-[#48454f]/30
                  flex items-center justify-center
                  hover:border-[#42e3ff]/50
                  hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]
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

    </div>
  )
}
