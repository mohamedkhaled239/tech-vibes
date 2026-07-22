import type React from 'react'
// components/casestudy/web/hooks.ts
// Mouse-driven interaction hooks for the immersive web showcase.

import { useRef } from 'react'
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion'

const SOFT: SpringOptions = { stiffness: 60, damping: 20, mass: 0.6 }

/**
 * Tracks the pointer inside a container as normalized [-0.5, 0.5] values.
 * Attach the returned handlers to the container; feed mx/my to layers.
 */
export function useMouseParallax() {
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, SOFT)
  const my = useSpring(rawY, SOFT)

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return { mx, my, handlers: { onMouseMove, onMouseLeave } }
}

/** Derive a translation layer from parallax values at a given depth (px). */
export function useParallaxLayer(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)
  return { x, y }
}

/**
 * 3D tilt-toward-cursor for a single card. Returns rotate motion values
 * plus handlers; apply transformPerspective on the element.
 */
export function useTilt(maxDeg = 7) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rawRX = useMotionValue(0)
  const rawRY = useMotionValue(0)
  const rotateX = useSpring(rawRX, SOFT)
  const rotateY = useSpring(rawRY, SOFT)

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rawRY.set(px * maxDeg * 2)
    rawRX.set(-py * maxDeg * 2)
  }
  const onMouseLeave = () => {
    rawRX.set(0)
    rawRY.set(0)
  }

  return { ref, rotateX, rotateY, handlers: { onMouseMove, onMouseLeave } }
}
