// hooks/useMouseGlow.js
import { useCallback } from 'react'

/**
 * Returns event handlers to attach to a card element.
 * The glow <div> must have data-glow="true" as a child.
 */
export function useMouseGlow() {
  const onMouseMove = useCallback((e) => {
    const card = e.currentTarget
    const glow = card.querySelector('[data-glow]')
    if (!glow) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glow.style.transform = `translate(${x - 150}px, ${y - 150}px)`
  }, [])

  const onMouseLeave = useCallback((e) => {
    const card = e.currentTarget
    const glow = card.querySelector('[data-glow]')
    if (!glow) return
    glow.style.transform = 'translate(-50%, -50%)'
  }, [])

  return { onMouseMove, onMouseLeave }
}
