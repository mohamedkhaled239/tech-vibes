// hooks/useSeo.js
// Keeps document.title, meta description, Open Graph/Twitter tags, and
// optional JSON-LD structured data in sync with the active language.
// No new dependency: plain DOM writes in an effect, mirroring the pattern
// already used by CaseStudyPage.

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setJsonLd(id, data) {
  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return
  }
  const script = existing ?? document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  if (!existing) document.head.appendChild(script)
}

/**
 * @param {string} pageKey - key under the `meta` namespace (home/services/portfolio/about/contact/notFound)
 * @param {{ title?: string, description?: string, jsonLd?: object }} [overrides] - use for dynamic pages like case studies, or to inject structured data
 */
export default function useSeo(pageKey, overrides = {}) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const title = overrides.title || t(`meta.${pageKey}.title`)
    const description = overrides.description || t(`meta.${pageKey}.description`)
    const siteName = t('meta.siteName')

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:site_name', siteName)
    setMeta('property', 'og:locale', i18n.resolvedLanguage === 'ar' ? 'ar_EG' : 'en_US')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setJsonLd('structured-data', overrides.jsonLd)

    return () => setJsonLd('structured-data', null)
  }, [pageKey, overrides.title, overrides.description, overrides.jsonLd, t, i18n.resolvedLanguage])
}
