import type { GuideProps } from '../../types/guide'

export default function LabGuideSvg({ pose, message, onPoseChange }: GuideProps) {
  const handleClick = () => {
    const poses = ['idle', 'wave', 'think', 'walk'] as const
    const idx = poses.indexOf(pose)
    const next = poses[(idx + 1) % poses.length]
    onPoseChange?.(next)
  }

  const mouthD =
    pose === 'wave'
      ? 'M54 75 Q60 81 66 75'
      : pose === 'think'
        ? 'M55 76 Q60 74 65 76'
        : 'M54 75 Q60 78 66 75'

  return (
    <div
      className="lab-guide-svg"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
      onMouseDown={(e) => e.preventDefault()}
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
        {/* 后发 */}
        <path
          d="M38 50 Q60 36 82 50 L80 90 Q60 96 40 90 Z"
          fill="#2c2c2c"
        />

        {/* 身体 */}
        <path
          d="M43 90 L39 175 L81 175 L77 90 Q60 84 43 90"
          fill="#ffffff"
          stroke="#e0dcd6"
          strokeWidth="1.2"
        />
        <path d="M60 90 L52 122 L60 132 L68 122 Z" fill="#f8f6f4" />
        <path d="M39 132 L36 175 L84 175 L81 132 Z" fill="#a8a4ae" />

        {/* 脸部皮肤 */}
        <ellipse cx="60" cy="63" rx="25" ry="27" fill="#fdd9c7" stroke="#e8cfc0" strokeWidth="0.8" />

        {/* 五官 */}
        <ellipse cx="47" cy="61" rx="4.5" ry="5.5" fill="#2c2c2c" />
        <ellipse cx="73" cy="61" rx="4.5" ry="5.5" fill="#2c2c2c" />
        <circle cx="48.5" cy="59" r="1.2" fill="#fff" />
        <circle cx="74.5" cy="59" r="1.2" fill="#fff" />
        <ellipse cx="43" cy="69" rx="5.5" ry="3" fill="#f5a8b8" opacity="0.5" />
        <ellipse cx="77" cy="69" rx="5.5" ry="3" fill="#f5a8b8" opacity="0.5" />
        <path d={mouthD} fill="none" stroke="#c97878" strokeWidth="1.5" strokeLinecap="round" />

        {/* 前发：覆盖头顶到刘海（盖住 crown，避免露头皮） */}
        <g className="lab-guide-svg__hair-front">
          <path
            d="M36 40 Q60 29 84 40 L82 55 Q60 51 38 55 Z"
            fill="#2c2c2c"
          />
          <path
            d="M36 44 Q31 62 34 84 Q39 80 40 46 Z"
            fill="#2c2c2c"
          />
          <path
            d="M84 44 Q89 62 86 84 Q81 80 80 46 Z"
            fill="#2c2c2c"
          />
        </g>

        {/* 手臂 */}
        <g className="lab-guide-svg__arm lab-guide-svg__arm--left">
          <path d="M43 96 L29 118 L33 120 L45 102" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
        </g>
        <g className="lab-guide-svg__arm lab-guide-svg__arm--right">
          {pose === 'wave' ? (
            <path d="M77 96 L94 76 L97 79 L79 102" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
          ) : pose === 'think' ? (
            <path d="M77 96 L87 71 L90 73 L81 102" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
          ) : (
            <path d="M77 96 L91 114 L88 116 L75 102" fill="#ffffff" stroke="#e0dcd6" strokeWidth="0.8" />
          )}
        </g>

        {/* 短靴 */}
        {pose === 'walk' ? (
          <>
            <rect x="37" y="168" width="17" height="14" rx="3" fill="#5c3d2e" transform="rotate(-6 45 175)" />
            <rect x="63" y="170" width="17" height="14" rx="3" fill="#5c3d2e" transform="rotate(6 71 177)" />
          </>
        ) : (
          <>
            <rect x="37" y="172" width="18" height="12" rx="3" fill="#5c3d2e" />
            <rect x="65" y="172" width="18" height="12" rx="3" fill="#5c3d2e" />
          </>
        )}
      </svg>
    </div>
  )
}
