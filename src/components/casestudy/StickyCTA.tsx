// components/casestudy/StickyCTA.tsx
// Glassmorphic conversion bar that slides in once the reader is invested.

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { AccentTheme } from '../../types/caseStudy'
import { accentGradient, rgba, EASE } from './lib'

export default function StickyCTA({ accent }: { accent: AccentTheme }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      // Appear after one viewport of reading; hide again at the very end (footer CTA takes over)
      setVisible(scrolled > window.innerHeight * 0.9 && scrolled < total - 900)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-xl"
        >
          <div
            className="flex items-center justify-between gap-4 rounded-full border backdrop-blur-xl ps-6 pe-2 py-2 shadow-2xl"
            style={{
              borderColor: rgba(accent.primary, 0.25),
              background: 'rgba(12, 10, 40, 0.8)',
              boxShadow: `0 20px 60px -16px rgba(0,0,0,0.7), 0 0 40px -16px ${rgba(accent.primary, 0.4)}`,
            }}
          >
            <p className="font-['Sora'] text-[13.5px] md:text-[15px] font-semibold text-[#e2dfff] truncate">
              {t('caseStudy.stickyCta.heading')}
            </p>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center gap-2 font-['Geist'] text-[13px] font-bold px-6 py-3 min-h-[48px] touch-manipulation rounded-full text-[#0A091A] transition-transform hover:scale-[1.04] active:scale-95"
              style={{ background: accentGradient(accent) }}
            >
              {t('caseStudy.stickyCta.cta')}
              <span className="material-symbols-outlined i18n-flip text-[16px]" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
