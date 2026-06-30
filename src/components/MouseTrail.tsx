import { useEffect, useRef } from 'react'
import type { EffectsConfig } from '../config/effects'

interface MouseTrailProps {
  config: EffectsConfig
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  hue: number
  size: number
}

export default function MouseTrail({ config }: MouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!config.showMouseTrail) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = (x: number, y: number, burst = false) => {
      const count = burst ? 3 : 1
      for (let i = 0; i < count; i++) {
        if (particlesRef.current.length >= config.particleCount) {
          particlesRef.current.shift()
        }
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: config.trailLength,
          maxLife: config.trailLength,
          hue: 350 + Math.random() * 30,
          size: burst ? 2.5 + Math.random() * 3 : 1.5 + Math.random() * 2.5,
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true }
      spawn(e.clientX, e.clientY)
    }

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      mouseRef.current = { x: t.clientX, y: t.clientY, active: true }
      spawn(t.clientX, t.clientY, true)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= 1
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const alpha = (p.life / p.maxLife) * 0.55 * config.glowIntensity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 65%, 78%, ${alpha})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 55%, 82%, ${alpha * 0.15})`
        ctx.fill()
      }

      if (mouseRef.current.active && particles.length > 1) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(245, 168, 184, ${0.12 * config.glowIntensity})`
        ctx.lineWidth = 1.2
        const recent = particles.slice(-8)
        if (recent.length > 1) {
          ctx.moveTo(recent[0].x, recent[0].y)
          for (let j = 1; j < recent.length; j++) {
            ctx.lineTo(recent[j].x, recent[j].y)
          }
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      cancelAnimationFrame(rafRef.current)
    }
  }, [config])

  if (!config.showMouseTrail) return null

  return (
    <canvas
      ref={canvasRef}
      className="mouse-trail"
      aria-hidden
    />
  )
}
