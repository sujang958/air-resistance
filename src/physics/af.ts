import { CANVAS_HEIGHT, CANVAS_WIDTH, clear, ctx } from "../canvas"
import { updateInfo } from "../info"

let start = 0
let previousTimeStamp = -1
let done = false

type Matter = {
  mass: number
  x: number
}

const MATTERS: Matter[] = [
  { x: 0, mass: 20 },
  { x: 100, mass: 5 },
]

const RECT_HEIGHT = 24
const MAX_BOUNDARY = CANVAS_HEIGHT - RECT_HEIGHT

const AIR_DENSITY = 4
const DRAG_COEFFICIENT = 1

// f는 가해지는 힘, 즉 무게
// f = mg (g는 중력 가속도)
// a = f/m
// a = mg/m = g
//  F_d=1/2 C_D * A * p * v^2
// ρ = density of the fluid
// A = the extent of the face
// C_d coefficient of drag ()
const G_FORCE = 0.00003

export const AirFriction = (timestamp: number) => {
  if (!start) start = timestamp
  if (done) return

  const elapsed = timestamp - start

  if (previousTimeStamp !== timestamp) {
    clear()

    const ys = MATTERS.map(({ mass: MASS, x }, i) => {
      const FORCE = MASS * G_FORCE
      const ACCELERATION = FORCE / MASS
      const A = 10
      const VELOCITY = elapsed * ACCELERATION
      const DRAG = 0.5 * DRAG_COEFFICIENT * A * AIR_DENSITY * VELOCITY ** 2
      const MOMENTUM = Math.max(0, MASS * VELOCITY - DRAG)

      const count = Math.min((MOMENTUM / MASS) * elapsed, MAX_BOUNDARY)

      ctx.fillRect(x, count, MASS * 4, RECT_HEIGHT)

      if (count >= MAX_BOUNDARY) return count

      updateInfo(
        [
          `${FORCE} = ${MASS} * ${G_FORCE}`,
          `Momentum: ${MOMENTUM.toPrecision(4)}`,
          `Velocity: ${VELOCITY.toPrecision(4)}px/ms`,
          `Elapsed: ${elapsed.toPrecision(4)}ms`,
          `Drag: ${DRAG.toPrecision(4)}`,
        ],
        i == 0 ? "l" : "r",
      )

      return count
    })

    if (ys.filter((v) => v >= MAX_BOUNDARY).length == ys.length) done = true
  }

  previousTimeStamp = timestamp

  requestAnimationFrame(AirFriction)
}
