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

const GRAVITY = 0.0005
const MASS = 1

const FORCE = MASS * GRAVITY

/**
 * px/ms^2
 */
const ACCELERATION = FORCE / MASS

// f는 가해지는 힘, 즉 무게
// f = mg (중력 가속도)
// a = f/m
// a = mg/m = g

// TODO: add timer

export const FreeFall = (timestamp: number) => {
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

  requestAnimationFrame(FreeFall)
}
