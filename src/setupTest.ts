import '@testing-library/jest-dom/vitest'
// about https://github.com/vitest-dev/vitest/issues/274
import { afterAll, vi } from 'vitest'
// @ts-ignore
global.jest = vi
declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var jest: typeof vi | undefined
}
const apis = [
  'Path2D',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'DOMMatrix',
  'ImageData',
  'TextMetrics',
  'ImageBitmap',
  'createImageBitmap',
] as const

async function importMockWindow() {
  const getCanvasWindow = await import('jest-canvas-mock/lib/window.js').then(res => res.default?.default || res.default || res)

  const canvasWindow = getCanvasWindow({ document: window.document })

  apis.forEach((api) => {
    global[api] = canvasWindow[api]
    global.window[api] = canvasWindow[api]
  })
}

importMockWindow()


afterAll(() => {
  delete global.jest
  delete global.window.jest
})

export {}