import { useEffect, useRef } from 'react'
import { Application, Ticker } from 'pixi.js'
import type { Live2DModel } from 'pixi-live2d-display/cubism4'
import type { GuidePose } from '../../types/guide'
import { loadCubismCore } from './loadCubismCore'
import { POSE_MOTIONS, UNITYCHAN } from './unitychanConfig'

interface UnitychanCanvasProps {
  pose: GuidePose
  onFail: () => void
}

export default function UnitychanCanvas({ pose, onFail }: UnitychanCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<Live2DModel | null>(null)
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let disposed = false

    void (async () => {
      try {
        await loadCubismCore()
        if (disposed) return

        const { Live2DModel } = await import('pixi-live2d-display/cubism4')
        if (disposed) return

        Live2DModel.registerTicker(Ticker)

        const app = new Application({
          backgroundAlpha: 0,
          width: UNITYCHAN.width,
          height: UNITYCHAN.height,
          antialias: true,
          resolution: Math.min(window.devicePixelRatio || 1, 2),
          autoDensity: true,
        })

        host.appendChild(app.view as HTMLCanvasElement)
        appRef.current = app

        const model = await Live2DModel.from(UNITYCHAN.modelUrl, {
          autoInteract: true,
        })
        if (disposed) return

        model.anchor.set(0.5, 1)
        model.scale.set(UNITYCHAN.scale)
        model.x = UNITYCHAN.width * 0.5
        model.y = UNITYCHAN.height - 8
        app.stage.addChild(model)
        modelRef.current = model

        void model.motion(POSE_MOTIONS.idle)
      } catch {
        if (!disposed) onFail()
      }
    })()

    return () => {
      disposed = true
      modelRef.current?.destroy()
      modelRef.current = null
      appRef.current?.destroy(true, { children: true })
      appRef.current = null
      host.replaceChildren()
    }
  }, [onFail])

  useEffect(() => {
    const model = modelRef.current
    if (!model) return
    void model.motion(POSE_MOTIONS[pose])
  }, [pose])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const model = modelRef.current
    const host = hostRef.current
    if (!model || !host) return
    const rect = host.getBoundingClientRect()
    model.focus(e.clientX - rect.left, e.clientY - rect.top)
  }

  return (
    <div
      ref={hostRef}
      className="lab-guide-live2d__canvas"
      onMouseMove={handleMove}
      aria-hidden
    />
  )
}
