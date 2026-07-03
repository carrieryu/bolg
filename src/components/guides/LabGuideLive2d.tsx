import { useCallback, useState } from 'react'
import type { GuideProps } from '../../types/guide'
import UnitychanCanvas from '../live2d/UnitychanCanvas'
import LabGuideSvg from './LabGuideSvg'

export default function LabGuideLive2d({ pose, message, onPoseChange }: GuideProps) {
  const [useFallback, setUseFallback] = useState(false)
  const onFail = useCallback(() => setUseFallback(true), [])

  const handleClick = () => {
    const poses = ['idle', 'wave', 'think', 'walk'] as const
    const idx = poses.indexOf(pose)
    const next = poses[(idx + 1) % poses.length]
    onPoseChange?.(next)
  }

  if (useFallback) {
    return <LabGuideSvg pose={pose} message={message} onPoseChange={onPoseChange} />
  }

  return (
    <div
      className="lab-guide-live2d"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      onMouseDown={(e) => e.preventDefault()}
      aria-label="Unity 酱看板娘，点击查看提示"
    >
      <div className="lab-guide-live2d__bubble">
        <p>{message}</p>
        <span className="lab-guide-live2d__bubble-tail" />
      </div>
      <UnitychanCanvas pose={pose} onFail={onFail} />
    </div>
  )
}
