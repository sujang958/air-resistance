import { CANVAS_HEIGHT, CANVAS_WIDTH, clear, ctx } from "../canvas"
import { updateInfo } from "../info"

let start = 0
let previousTimeStamp = -1
let done = false

/**
 * px/ms
 */
const RECT_WIDTH = 20
const RECT_HEIGHT = RECT_WIDTH * 0.5
const MAX_BOUNDARY = CANVAS_HEIGHT - RECT_HEIGHT

const G_FORCE = 0.00025
const MASS = 4

const FORCE = MASS * G_FORCE

/**
 * px/ms^2
 */
const ACCELERATION = FORCE / MASS

// f는 가해지는 힘, 즉 무게
// f = mg (g는 중력 가속도)
// a = f/m
// a = mg/m = g
//  F_d=−1/2 ρ v^2 A C_d {v} 

export const AirFriction = (timestamp: number) => {
  if (!start) start = timestamp
  if (done) return

  const elapsed = timestamp - start
  const VELOCITY = elapsed * ACCELERATION
  const MOMENTUM = MASS * VELOCITY

  if (previousTimeStamp !== timestamp) {
    const count = Math.min(VELOCITY * elapsed, MAX_BOUNDARY)

    clear()
    ctx.fillRect(
      CANVAS_WIDTH / 2 - RECT_WIDTH / 2,
      count,
      RECT_WIDTH,
      RECT_HEIGHT,
    )

    updateInfo([
      `${FORCE} = ${MASS} * ${G_FORCE}`,
      `Momentum: ${MOMENTUM.toPrecision(4)}`,
      `Velocity: ${VELOCITY.toPrecision(4)}px/ms`,
      `Elapsed: ${elapsed.toPrecision(4)}ms`,
    ])

    if (count >= MAX_BOUNDARY) done = true
  }

  previousTimeStamp = timestamp

  requestAnimationFrame(AirFriction)
}
