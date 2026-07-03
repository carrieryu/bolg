import type { GuidePose } from '../../types/guide'

const asset = (path: string) => `${import.meta.env.BASE_URL}live2d/unitychan/${path}`

export const UNITYCHAN = {
  modelUrl: asset('unitychan.model3.json'),
  width: 280,
  height: 400,
  scale: 0.22,
} as const

export const POSE_MOTIONS: Record<GuidePose, string> = {
  idle: 'Idle',
  wave: 'Tap',
  walk: 'FlickRight',
  think: 'Shake',
}
