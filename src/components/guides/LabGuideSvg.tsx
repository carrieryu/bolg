import type { GuideProps } from '../../types/guide'

export default function LabGuideSvg({ pose, message, onPoseChange }: GuideProps) {
  const handleClick = () => {
    const poses = ['idle', 'wave', 'think', 'walk'] as const
    const idx = poses.indexOf(pose)
    const next = poses[(idx + 1) % poses.length]
    onPoseChange?.(next)
  }

  return (
    <div className="lab-guide-svg" onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
      aria-label="小向导，点击查看提示"
    >
      <div className="lab-guide-svg__bubble">
        <p>{message}</p>
        <span className="lab-guide-svg__bubble-tail" />
      </div>

      <svg
        viewBox="0 0 120 200"
        className={`lab-guide-svg__figure lab-guide-svg__figure--${pose}`}
        aria-hidden
      >
        {/* Hair back */}
        <path
          d="M35 45 Q60 20 85 45 L88 95 Q60 105 32 95 Z"
          fill="#2c2c2c"
        />
        {/* Body / coat */}
        <path
          d="M42 88 L38 175 L82 175 L78 88 Q60 82 42 88"
          fill="#ffffff"
          stroke="#e0dcd6"
          strokeWidth="1.2"
        />
        {/* Coat lapels */}
        <path d="M60 88 L52 120 L60 130 L68 120 Z" fill="#f8f6f4" />
        {/* Skirt */}
        <path d="M38 130 L35 175 L85 175 L82 130 Z" fill="#a8a4ae" />
        {/* Head */}
        <ellipse cx="60" cy="62" rx="26" ry="28" fill="#fdd9c7" stroke="#e8cfc0" strokeWidth="0.8" />
        {/* Hair front */}
        <path
          d="M34 55 Q60 30 86 55 L84 72 Q60 68 36 72 Z"
          fill="#2c2c2c"
        />
        <path d="M34 55 Q28 80 32 100 L38 85 Q34 70 36 60 Z" fill="#2c2c2c" />
        <path d="M86 55 Q92 80 88 100 L82 85 Q86 70 84 60 Z" fill="#2c2c2c" />
        {/* Blush */}
        <ellipse cx="44" cy="68" rx="6" ry="3.5" fill="#f5a8b8" opacity="0.55" />
        <ellipse cx="76" cy="68" rx="6" ry="3.5" fill="#f5a8b8" opacity="0.55" />
        {/* Eyes — 可爱圆眼 */}
        <ellipse cx="48" cy="60" rx="4.5" ry="5.5" fill="#2c2c2c" />
        <ellipse cx="72" cy="60" rx="4.5" ry="5.5" fill="#2c2c2c" />
        <circle cx="49.5" cy="58" r="1.2" fill="#fff" />
        <circle cx="73.5" cy="58" r="1.2" fill="#fff" />
        {/* Mouth */}
        <path
          d={pose === 'wave' ? 'M54 74 Q60 80 66 74' : 'M54 74 Q60 77 66 74'}
          fill="none"
          stroke="#c97878"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Arms */}
        <g className="lab-guide-svg__arm lab-guide-svg__arm--left">
          <path d="M42 95 L28 120 L32 122 L44 100" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
        </g>
        <g className="lab-guide-svg__arm lab-guide-svg__arm--right">
          {pose === 'wave' ? (
            <path d="M78 95 L95 75 L98 78 L80 100" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
          ) : pose === 'think' ? (
            <path d="M78 95 L88 70 L91 72 L82 100" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
          ) : (
            <path d="M78 95 L92 115 L89 117 L76 100" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
          )}
        </g>
        {/* Boots */}
        <rect x="36" y="172" width="18" height="12" rx="3" fill="#5c3d2e" />
        <rect x="66" y="172" width="18" height="12" rx="3" fill="#5c3d2e" />
        {/* Walk legs offset */}
        {pose === 'walk' && (
          <>
            <rect x="38" y="168" width="16" height="16" rx="2" fill="#5c3d2e" transform="rotate(-8 46 176)" />
            <rect x="64" y="170" width="16" height="16" rx="2" fill="#5c3d2e" transform="rotate(8 72 178)" />
          </>
        )}
      </svg>
    </div>
  )
}
