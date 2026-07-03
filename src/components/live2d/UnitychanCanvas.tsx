import { useEffect, useRef } from 'react'
import { Application, Ticker } from 'pixi.js'
import type { Live2DModel } from 'pixi-live2d-display/cubism4'
import type { GuidePose } from '../../types/guide'
import { applyGazeToModel } from './focusAtClient'
import { loadCubismCore } from './loadCubismCore'
import { POSE_MOTIONS, UNITYCHAN } from './unitychanConfig'

interface UnitychanCanvasProps {
  pose: GuidePose
  onFail: () => void
}

export default function UnitychanCanvas({ pose, onFail }: UnitychanCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<Live2DModel | null>(null)
  const pointerRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.4 : 0,
  })

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let disposed = false
    let applyGaze: (() => void) | null = null

    const trackPointer = (clientX: number, clientY: number) => {
      pointerRef.current = { x: clientX, y: clientY }
    }

    const onMouseMove = (e: MouseEvent) => trackPointer(e.clientX, e.clientY)
    const onPointerMove = (e: PointerEvent) => trackPointer(e.clientX, e.clientY)

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
          sharedTicker: true,
        })

        host.appendChild(app.view as HTMLCanvasElement)

        const model = await Live2DModel.from(UNITYCHAN.modelUrl, {
          autoInteract: true,
          autoUpdate: true,
        })
        if (disposed) return

        model.anchor.set(0.5, 1)
        model.scale.set(UNITYCHAN.scale)
        model.x = UNITYCHAN.width * 0.5
        model.y = UNITYCHAN.height - 8
        app.stage.addChild(model)
        modelRef.current = model

        applyGaze = () => {
          const current = modelRef.current
          const hostEl = hostRef.current
          if (!current || !hostEl) return
          const { x, y } = pointerRef.current
          applyGazeToModel(current, x, y, hostEl)
        }

        model.internalModel.on('beforeModelUpdate', applyGaze)

        void model.motion(POSE_MOTIONS.idle)

        window.addEventListener('mousemove', onMouseMove, { passive: true, capture: true })
        window.addEventListener('pointermove', onPointerMove, { passive: true, capture: true })
      } catch {
        if (!disposed) onFail()
      }
    })()

    return () => {
      disposed = true
      window.removeEventListener('mousemove', onMouseMove, { capture: true })
      window.removeEventListener('pointermove', onPointerMove, { capture: true })
      if (applyGaze) modelRef.current?.internalModel.off('beforeModelUpdate', applyGaze)
      modelRef.current?.destroy()
      modelRef.current = null
      host.replaceChildren()
    }
  }, [onFail])

  useEffect(() => {
    const model = modelRef.current
    if (!model) return
    void model.motion(POSE_MOTIONS[pose])
  }, [pose])

  return (
    <div
      ref={hostRef}
      className="lab-guide-live2d__canvas"
      aria-hidden
    />
  )
}
