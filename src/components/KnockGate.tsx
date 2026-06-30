import { useCallback, useEffect, useState } from 'react'

interface KnockGateProps {
  onEnter: () => void
}

const PEEK_MSG: Record<number, string> = {
  1: '嗯？有人按门铃啦～',
  2: '再按一下，我就来开门哦！',
  3: '来啦来啦，欢迎进来～',
}

export default function KnockGate({ onEnter }: KnockGateProps) {
  const [knockCount, setKnockCount] = useState(0)
  const [opening, setOpening] = useState(false)
  const [ringing, setRinging] = useState(false)

  const handleKnock = useCallback(() => {
    if (opening) return
    setRinging(true)
    setTimeout(() => setRinging(false), 520)

    const next = knockCount + 1
    setKnockCount(next)

    if (next >= 3) {
      setTimeout(() => setOpening(true), 800)
      setTimeout(onEnter, 2200)
    }
  }, [knockCount, opening, onEnter])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleKnock()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleKnock])

  const showPeek = knockCount >= 1 && knockCount <= 3
  const peekMsg = PEEK_MSG[knockCount] ?? PEEK_MSG[3]

  return (
    <div className={`knock-gate ${opening ? 'knock-gate--opening' : ''}`}>
      <div className="knock-gate__bg">
        <div className="knock-gate__blob knock-gate__blob--1" />
        <div className="knock-gate__blob knock-gate__blob--2" />
      </div>

      <div className="knock-gate__scene">
        <p className="knock-gate__label">欢迎来访 ♡</p>
        <h1 className="knock-gate__title">YLD 的小屋</h1>
        <p className="knock-gate__hint">
          {knockCount === 0 && '按一按门铃，连按三下就可以进来啦'}
          {knockCount === 1 && '叮… 再按两下哦'}
          {knockCount === 2 && '叮叮… 最后一下！'}
          {knockCount >= 3 && !opening && '门要开啦～'}
          {opening && '欢迎进来！'}
        </p>

        {/* 门 + 门铃一体 */}
        <div className={`knock-gate__door-unit ${opening ? 'knock-gate__door-unit--open' : ''}`}>
          <div className="knock-gate__door-room">
            <div className="knock-gate__door-glow" />
            <svg viewBox="0 0 160 220" className="knock-gate__door-leaf" aria-hidden>
              <rect x="8" y="8" width="144" height="204" rx="6" fill="#faf6f0" stroke="#d4c8b8" strokeWidth="1.5" />
              <rect x="18" y="36" width="124" height="44" rx="3" fill="#f0e8dc" stroke="#e8ddd0" strokeWidth="0.8" />
              <rect x="18" y="88" width="124" height="44" rx="3" fill="#f0e8dc" stroke="#e8ddd0" strokeWidth="0.8" />
              <rect x="18" y="140" width="124" height="44" rx="3" fill="#f0e8dc" stroke="#e8ddd0" strokeWidth="0.8" />
              <circle cx="130" cy="110" r="6" fill="#d4a574" stroke="#b8895a" strokeWidth="0.8" />
            </svg>
          </div>

          <div className="knock-gate__bell-wall">
            <button
              type="button"
              className={`knock-gate__bell ${ringing ? 'knock-gate__bell--ring' : ''}`}
              onClick={handleKnock}
              onMouseDown={(e) => e.preventDefault()}
              disabled={opening}
              aria-label="按门铃"
            >
              {ringing && (
                <>
                  <span className="knock-gate__ripple knock-gate__ripple--1" />
                  <span className="knock-gate__ripple knock-gate__ripple--2" />
                </>
              )}
              <svg viewBox="0 0 48 72" className="knock-gate__bell-art" aria-hidden>
                <rect x="18" y="4" width="12" height="8" rx="2" fill="#c9a06c" />
                <path d="M24 12 C24 12 10 20 10 34 L38 34 C38 20 24 12 24 12Z" fill="#d4a574" stroke="#b8895a" strokeWidth="1" strokeLinejoin="round" />
                <circle cx="24" cy="48" r="16" fill="#f5a8b8" stroke="#e8899a" strokeWidth="1.2" />
                <ellipse cx="24" cy="46" rx="9" ry="7" fill="#fff" opacity="0.3" />
                <circle cx="24" cy="48" r="5" fill="#e8899a" />
              </svg>
              <span className="knock-gate__bell-count">{Math.min(knockCount, 3)}/3</span>
            </button>
          </div>
        </div>

        {showPeek && (
          <div className="knock-gate__peek" key={knockCount} aria-hidden>
            <div className="knock-gate__peek-face">
              <div className="knock-gate__peek-hair" />
              <div className="knock-gate__peek-eye knock-gate__peek-eye--l" />
              <div className="knock-gate__peek-eye knock-gate__peek-eye--r" />
              <div className="knock-gate__peek-blush knock-gate__peek-blush--l" />
              <div className="knock-gate__peek-blush knock-gate__peek-blush--r" />
            </div>
            <p className="knock-gate__peek-msg">{peekMsg}</p>
          </div>
        )}
      </div>
    </div>
  )
}
