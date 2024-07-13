import "./style.css"

import { UniformLinearMotion } from "./physics/ulm"
import { UniformlyAcceleratedMotion } from "./physics/uam"
import { FreeFall } from "./physics/ff"
import { AirFriction } from "./physics/af"

// requestAnimationFrame(UniformLinearMotion)
// requestAnimationFrame(FreeFall)
requestAnimationFrame(AirFriction)
