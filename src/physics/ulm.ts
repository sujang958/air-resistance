import { CANVAS_HEIGHT, CANVAS_WIDTH, clear, ctx } from "../canvas"
import { updateInfo } from "../info"

let start = 0
let previousTimeStamp = -1
let done = false

const MASS = 3
const FORCE = 0
const ACCELERATION = FORCE / MASS
const MOMENTUM = 0.5
/**
 * px/ms
 */
const VELOCITY = MOMENTUM / MASS

const RECT_WIDTH = MASS * 20
const RECT_HEIGHT = RECT_WIDTH * 0.5
const MAX_BOUNDARY = CANVAS_WIDTH - RECT_WIDTH

export const UniformLinearMotion = (timestamp: number) => {
  if (!start) start = timestamp
  if (done) return

  const elapsed = timestamp - start

  if (previousTimeStamp !== timestamp) {
    const count = Math.min(VELOCITY * elapsed, MAX_BOUNDARY)

    clear()
    ctx.fillRect(count, CANVAS_HEIGHT - RECT_HEIGHT, RECT_WIDTH, RECT_HEIGHT)

    updateInfo([
      `${FORCE} = ${MASS} * ${ACCELERATION}`,
      `Momentum: ${MOMENTUM.toPrecision(4)}`,
      `Velocity: ${VELOCITY.toPrecision(4)}px/ms`,
      `Elapsed: ${elapsed.toPrecision(4)}ms`,
    ])

    if (count >= MAX_BOUNDARY) done = true
  }

  previousTimeStamp = timestamp

  requestAnimationFrame(UniformLinearMotion)
}
