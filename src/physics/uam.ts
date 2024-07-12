import { CANVAS_HEIGHT, CANVAS_WIDTH, clear, ctx } from "../canvas"

let start = 0
let previousTimeStamp = -1
let done = false

/**
 * px/ms
 */
const PX_PER_MS = 0.05
const RECT_WIDTH = 20
const RECT_HEIGHT = RECT_WIDTH * 0.5
const MAX_BOUNDARY = CANVAS_HEIGHT - RECT_HEIGHT

/**
 * px/ms^2
 */
const ACCELERATION = 0.001

export const UniformlyAcceleratedMotion = (timestamp: number) => {
  if (!start) start = timestamp
  if (done) return

  const elapsed = timestamp - start

  if (previousTimeStamp !== timestamp) {
    const count = Math.min(
      (PX_PER_MS + elapsed * ACCELERATION) * elapsed,
      MAX_BOUNDARY,
    )

    clear()
    ctx.fillRect(
      CANVAS_WIDTH / 2 - RECT_WIDTH / 2,
      count,
      RECT_WIDTH,
      RECT_HEIGHT,
    )

    if (count >= MAX_BOUNDARY) done = true
  }

  previousTimeStamp = timestamp

  requestAnimationFrame(UniformlyAcceleratedMotion)
}
