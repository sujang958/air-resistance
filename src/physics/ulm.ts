import { canvas, CANVAS_HEIGHT, CANVAS_WIDTH, clear, ctx } from "../canvas"

let start = 0
let previousTimeStamp = -1
let done = false

/**
 * px/ms
 */
const PX_PER_MS = 0.05
const RECT_WIDTH = 20
const RECT_HEIGHT = RECT_WIDTH * 0.5

export const UniformLinearMotion = (timestamp: number) => {
  if (!start) start = timestamp
  if (done) return

  const elapsed = timestamp - start

  if (previousTimeStamp !== timestamp) {
    const count = Math.min(PX_PER_MS * elapsed, CANVAS_WIDTH - RECT_WIDTH)

    clear()
    ctx.fillRect(count, CANVAS_HEIGHT - RECT_HEIGHT, RECT_WIDTH, RECT_HEIGHT)

    if (count === CANVAS_WIDTH) done = true
  }

  previousTimeStamp = timestamp

  requestAnimationFrame(UniformLinearMotion)
}
