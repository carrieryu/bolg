import type { Live2DModel } from 'pixi-live2d-display/cubism4'
import { UNITYCHAN_GAZE_PARAMS } from './unitychanConfig'

type Cubism4Internal = Live2DModel['internalModel'] & {
  coreModel: {
    setParameterValueById(id: string, value: number, weight?: number): void
  }
}

/** 从看板娘画布估算头部注视原点（屏幕坐标） */
export function getGazeOrigin(host: HTMLElement) {
  const rect = host.getBoundingClientRect()
  return {
    x: rect.left + rect.width * 0.5,
    y: rect.top + rect.height * 0.22,
  }
}

/**
 * 在 mesh 更新前强制写入注视参数。
 * Unity 酱使用 PARAM_EYE_BALL_X 等 ID，与库内置的 ParamEyeBallX 不一致，必须手动映射。
 */
export function applyGazeToModel(
  model: Live2DModel,
  clientX: number,
  clientY: number,
  host: HTMLElement,
) {
  const origin = getGazeOrigin(host)
  const radian = Math.atan2(clientY - origin.y, clientX - origin.x)
  const fx = Math.cos(radian)
  const fy = -Math.sin(radian)

  const im = model.internalModel as Cubism4Internal
  const core = im.coreModel
  const p = UNITYCHAN_GAZE_PARAMS

  core.setParameterValueById(p.eyeBallX, fx)
  core.setParameterValueById(p.eyeBallY, fy)
  core.setParameterValueById(p.angleX, fx * 30)
  core.setParameterValueById(p.angleY, fy * 30)
  core.setParameterValueById(p.angleZ, fx * fy * -30)
  core.setParameterValueById(p.bodyAngleX, fx * 10)
}
