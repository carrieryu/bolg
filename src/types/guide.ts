export type GuidePose = 'idle' | 'wave' | 'walk' | 'think'

export type GuideBackend = 'svg' | 'live2d'

export interface GuideProps {
  pose: GuidePose
  message: string
  onPoseChange?: (pose: GuidePose) => void
}
