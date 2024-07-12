const container = document.getElementById("info")!

export const updateInfo = (info: any[]) => {
  container.innerText = info.join("\n")
}
