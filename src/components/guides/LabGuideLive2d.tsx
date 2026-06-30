import { useEffect, useState } from 'react'
import type { GuideProps } from '../../types/guide'
import LabGuideSvg from './LabGuideSvg'

/**
 * Live2D 占位实现。第一版无真实模型时自动降级到 SVG。
 * 后续接入：在 public/live2d/ 放置模型，并在此加载 pixi-live2d-display 或 oh-my-live2d。
 */
export default function LabGuideLive2d(props: GuideProps) {
  const [fallback, setFallback] = useState(true)

  useEffect(() => {
    // 检测模型是否存在（第一版默认不存在）
    fetch(`${import.meta.env.BASE_URL}live2d/model.json`, { method: 'HEAD' })
      .then((res) => setFallback(!res.ok))
      .catch(() => setFallback(true))
  }, [])

  if (fallback) {
    return <LabGuideSvg {...props} />
  }

  return (
    <div className="lab-guide-live2d" aria-label="Live2D 向导">
      <div className="lab-guide-live2d__placeholder">
        <p>Live2D 模型加载中…</p>
      </div>
    </div>
  )
}
