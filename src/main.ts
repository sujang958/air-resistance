import "./style.css"

import { UniformLinearMotion } from "./physics/ulm"
import { UniformlyAcceleratedMotion } from "./physics/uam"
import { FreeFall } from "./physics/ff"

requestAnimationFrame(UniformLinearMotion)
// requestAnimationFrame(FreeFall)
