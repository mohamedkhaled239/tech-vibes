// i18n/index.js
// i18next configuration — Arabic is the default and fallback language.
// Detection order: a saved preference (localStorage) wins; first-ever
// visit always renders Arabic, regardless of browser language.
//
// Performance: only the resolved language's translation bundle is loaded
// eagerly (needed for first paint, zero flicker). The other language is
// fetched lazily via dynamic import the moment the visitor switches to it,
// then cached in memory for the rest of the session.

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const SUPPORTED_LANGUAGES = ['ar', 'en']
export const DEFAULT_LANGUAGE = 'ar'
export const LANG_STORAGE_KEY = 'techvibes-lang'

const loaders = {
  ar: () => import('./locales/ar/common.json'),
  en: () => import('./locales/en/common.json'),
}

function resolveInitialLanguage() {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY)
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved
  } catch {
    /* localStorage unavailable (privacy mode, SSR, etc.) — fall back below */
  }
  return DEFAULT_LANGUAGE
}

const initialLanguage = resolveInitialLanguage()
const initialBundle = await loaders[initialLanguage]()

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      [initialLanguage]: { common: initialBundle.default },
    },
    lng: initialLanguage,
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    detection: {
      // Only trust a language the visitor explicitly chose before;
      // never infer from browser/OS locale — Arabic must win by default.
      order: ['localStorage'],
      lookupLocalStorage: LANG_STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnObjects: true,
  })

// Fetch a language bundle on demand, the first time it's actually needed.
const loadedLanguages = new Set([initialLanguage])
async function ensureLanguageLoaded(lng) {
  if (loadedLanguages.has(lng) || !loaders[lng]) return
  const bundle = await loaders[lng]()
  i18n.addResourceBundle(lng, 'common', bundle.default)
  loadedLanguages.add(lng)
}

// Wrap changeLanguage so callers (e.g. the language switcher) can keep
// calling i18n.changeLanguage('en') without knowing about lazy-loading.
const originalChangeLanguage = i18n.changeLanguage.bind(i18n)
i18n.changeLanguage = async (lng, ...rest) => {
  if (lng) await ensureLanguageLoaded(lng)
  return originalChangeLanguage(lng, ...rest)
}

// Keep <html lang>/[dir] in sync with the active language — i18next only
// tracks the language string, it has no opinion on text direction.
function syncDocumentDirection(lng) {
  const dir = i18n.dir(lng)
  document.documentElement.lang = lng
  document.documentElement.dir = dir
}

syncDocumentDirection(i18n.resolvedLanguage || initialLanguage)
i18n.on('languageChanged', syncDocumentDirection)

export default i18n
