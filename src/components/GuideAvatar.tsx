import { useState } from 'react'
import type { GuidePose } from '../types/guide'
import type { EffectsConfig } from '../config/effects'
import LabGuideSvg from './guides/LabGuideSvg'
import LabGuideLive2d from './guides/LabGuideLive2d'

interface GuideAvatarProps {
  config: EffectsConfig
  message: string
}

export default function GuideAvatar({ config, message }: GuideAvatarProps) {
  const [pose, setPose] = useState<GuidePose>('idle')

  if (!config.showGuide) return null

  const props = {
    pose,
    message,
    onPoseChange: setPose,
  }

  return (
    <aside className="guide-avatar" aria-live="polite">
      {config.guideBackend === 'live2d' ? (
        <LabGuideLive2d {...props} />
      ) : (
        <LabGuideSvg {...props} />
      )}
    </aside>
  )
}
