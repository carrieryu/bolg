import { useCallback, useEffect, useRef, useState } from 'react'
import { site } from '../data/site'

interface KnockGateProps {
  onEnter: () => void
}

const PLATE_HINTS = [
  '点击门板敲三下门，就可以进来啦',
  '咚… 再敲两下哦',
  '咚咚… 最后一下！',
  '门要开啦～',
]

const DEFAULT_RIPPLE = { x: 50, y: 52 }

interface RippleState {
  key: number
  x: number
  y: number
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

export default function KnockGate({ onEnter }: KnockGateProps) {
  const doorwayRef = useRef<HTMLDivElement>(null)
  const knockCountRef = useRef(0)
  const openingRef = useRef(false)
  const [knockCount, setKnockCount] = useState(0)
  const [opening, setOpening] = useState(false)
  const [ripple, setRipple] = useState<RippleState | null>(null)

  const reduceMotion = useReducedMotion()
  const onEnterRef = useRef(onEnter)
  onEnterRef.current = onEnter

  const handleKnock = useCallback(
    (ripplePos: { x: number; y: number } = DEFAULT_RIPPLE) => {
      if (openingRef.current) return

      setRipple({ key: Date.now(), x: ripplePos.x, y: ripplePos.y })

      const next = knockCountRef.current + 1
      knockCountRef.current = next
      setKnockCount(next)

      if (next >= 3) {
        window.setTimeout(() => {
          openingRef.current = true
          setOpening(true)
        }, 280)
        window.setTimeout(() => onEnterRef.current(), reduceMotion ? 900 : 1750)
      }
    },
    [reduceMotion],
  )

  const handleDoorClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const doorway = doorwayRef.current
      if (!doorway) {
        handleKnock()
        return
      }
      const rect = doorway.getBoundingClientRect()
      const x = Math.max(6, Math.min(94, ((e.clientX - rect.left) / rect.width) * 100))
      const y = Math.max(6, Math.min(94, ((e.clientY - rect.top) / rect.height) * 100))
      handleKnock({ x, y })
      e.currentTarget.blur()
    },
    [handleKnock],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleKnock(DEFAULT_RIPPLE)
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleKnock])

  const plateHint = PLATE_HINTS[Math.min(knockCount, PLATE_HINTS.length - 1)]

  return (
    <div
      className={['knock-gate', 'paper-bg', opening ? 'knock-gate--opening' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="knock-gate__stage">
        <div className="knock-gate__house">
          <div className="knock-gate__plate" aria-live="polite">
            <span className="knock-gate__plate-tag">欢迎来访 ♡</span>
            <h1 className="knock-gate__plate-title">{site.name}</h1>
            <p className="knock-gate__plate-hint">{plateHint}</p>
          </div>

          <div className="knock-gate__door-row">
            <div ref={doorwayRef} className="knock-gate__doorway">
              <div className="knock-gate__corridor" aria-hidden>
                <div className="knock-gate__corridor-glow" />
                <p className="knock-gate__corridor-text">欢迎进来～</p>
              </div>

              <div className="knock-gate__frame" aria-hidden />

              <button
                type="button"
                className="knock-gate__leaf knock-gate__leaf--left"
                onClick={handleDoorClick}
                aria-label="敲左侧门"
              >
                <span className="knock-gate__panel" />
                <span className="knock-gate__panel" />
                <span className="knock-gate__panel" />
                <span className="knock-gate__knob" aria-hidden />
              </button>

              <button
                type="button"
                className="knock-gate__leaf knock-gate__leaf--right"
                onClick={handleDoorClick}
                aria-label="敲右侧门"
              >
                <span className="knock-gate__panel" />
                <span className="knock-gate__panel" />
                <span className="knock-gate__panel" />
                <span className="knock-gate__knob" aria-hidden />
              </button>

              {ripple && !opening && (
                <span
                  className="knock-gate__ripple-wrap"
                  key={ripple.key}
                  style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
                  aria-hidden
                >
                  <span className="knock-gate__ripple" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
