export const canvas = document.getElementById("c1") as HTMLCanvasElement
export const ctx = canvas.getContext("2d")!

export const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export const CANVAS_WIDTH = canvas.width
export const CANVAS_HEIGHT = canvas.height
