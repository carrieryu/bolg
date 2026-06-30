import type { GuideBackend } from '../types/guide'

export interface EffectsConfig {
  mode: 'cool'
  guideBackend: GuideBackend
  showGuide: boolean
  showMouseTrail: boolean
  particleCount: number
  trailLength: number
  glowIntensity: number
  reduceMotion: boolean
}

const isMobile = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function getEffectsConfig(): EffectsConfig {
  const mobile = isMobile()
  const reduced = prefersReducedMotion()

  return {
    mode: 'cool',
    guideBackend: 'svg',
    showGuide: true,
    showMouseTrail: !reduced,
    particleCount: mobile ? 18 : 48,
    trailLength: mobile ? 12 : 28,
    glowIntensity: mobile ? 0.5 : 1,
    reduceMotion: reduced,
  }
}

export const effectsConfig = getEffectsConfig()
