const LeftContainer = document.getElementById("info-left")!
const RightContainer = document.getElementById("info-right")!

export const updateInfo = (info: any[], position: "l" | "r" = "l") => {
  ;(position == "l" ? LeftContainer : RightContainer).innerText =
    info.join("\n")
}
