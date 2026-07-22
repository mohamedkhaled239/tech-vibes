// components/casestudy/Lightbox.tsx
// Accessible fullscreen image viewer with zoom, keyboard nav and focus trap.

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { GalleryItem } from '../../types/caseStudy'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const { t } = useTranslation()
  const [zoomed, setZoomed] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null
  const item = open ? items[index] : null

  const prev = useCallback(() => {
    if (index === null) return
    setZoomed(false)
    onNavigate((index - 1 + items.length) % items.length)
  }, [index, items.length, onNavigate])

  const next = useCallback(() => {
    if (index === null) return
    setZoomed(false)
    onNavigate((index + 1) % items.length)
  }, [index, items.length, onNavigate])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, prev, next])

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060141]/95 backdrop-blur-xl p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label={t('caseStudy.gallery.closeViewer')}
            className="absolute top-5 end-5 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-[#e2dfff] hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                aria-label={t('caseStudy.gallery.previousImage')}
                className="absolute start-3 md:start-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-[#e2dfff] hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined i18n-flip text-[22px]">chevron_left</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                aria-label={t('caseStudy.gallery.nextImage')}
                className="absolute end-3 md:end-8 z-10 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-[#e2dfff] hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined i18n-flip text-[22px]">chevron_right</span>
              </button>
            </>
          )}

          <motion.img
            key={item.src + index}
            src={item.src}
            alt={item.alt}
            onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z) }}
            className={`max-w-full max-h-[85vh] rounded-2xl shadow-2xl border border-white/10 object-contain ${
              zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: zoomed ? 1.4 : 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-['Geist'] text-[12px] text-[#c9c5d0]/70 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            {item.alt} · <span dir="ltr">{index + 1} / {items.length}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
