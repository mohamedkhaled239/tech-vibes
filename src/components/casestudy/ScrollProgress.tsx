// components/casestudy/ScrollProgress.tsx
// Thin accent progress bar pinned under the navbar while reading a case study.

import { motion, useScroll, useSpring } from 'framer-motion'
import type { AccentTheme } from '../../types/caseStudy'
import { accentGradient } from './lib'

export default function ScrollProgress({ accent }: { accent: AccentTheme }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
      style={{ scaleX, background: accentGradient(accent) }}
    />
  )
}
