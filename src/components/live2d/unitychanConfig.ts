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

/** Unity 酱模型的注视参数 ID（与 Cubism 默认 ParamEyeBallX 不同） */
export const UNITYCHAN_GAZE_PARAMS = {
  eyeBallX: 'PARAM_EYE_BALL_X',
  eyeBallY: 'PARAM_EYE_BALL_Y',
  angleX: 'PARAM_ANGLE_X',
  angleY: 'PARAM_ANGLE_Y',
  angleZ: 'PARAM_ANGLE_Z',
  bodyAngleX: 'PARAM_BODY_ANGLE_X',
} as const
