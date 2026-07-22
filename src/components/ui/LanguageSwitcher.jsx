// components/ui/LanguageSwitcher.jsx
// Compact AR/EN toggle. Persists the choice (via i18next-browser-languagedetector's
// localStorage cache) and drives the global dir/lang sync in src/i18n/index.js.

import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher({ className = '' }) {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage || i18n.language

  const setLang = (lng) => {
    if (lng !== current) i18n.changeLanguage(lng)
  }

  return (
    <div
      role="group"
      aria-label={t('common.languageSwitcher.label')}
      className={`inline-flex items-center gap-0.5 p-1 rounded-full bg-white/5 border border-white/10 ${className}`}
    >
      {['ar', 'en'].map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => setLang(lng)}
          aria-pressed={current === lng}
          className={`px-3.5 py-2 min-h-[40px] touch-manipulation rounded-full font-['Geist'] text-[12px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            current === lng
              ? 'bg-[#b7aee6] text-[#312a59] shadow-sm'
              : 'text-[#c9c5d0] hover:text-[#e2dfff]'
          }`}
        >
          {t(`common.languageSwitcher.${lng}`)}
        </button>
      ))}
    </div>
  )
}
