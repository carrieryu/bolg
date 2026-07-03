declare global {
  interface Window {
    Live2DCubismCore?: unknown
  }
}

let loading: Promise<void> | null = null

export function loadCubismCore(): Promise<void> {
  if (window.Live2DCubismCore) return Promise.resolve()
  if (loading) return loading

  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `${import.meta.env.BASE_URL}live2d/live2dcubismcore.min.js`
    script.async = false
    script.onload = () => {
      if (window.Live2DCubismCore) resolve()
      else reject(new Error('Live2D Cubism Core 已加载但未注册到 window'))
    }
    script.onerror = () => reject(new Error('Live2D Cubism Core 加载失败'))
    document.head.appendChild(script)
  })

  return loading
}
