import { IDesgin } from "../types/design";
import { saveHistory } from "./history";

export const saveHTML = (id: string) => {
  const view = document.getElementById("mainIframeView") as HTMLIFrameElement | null
  const iframeDom = view?.contentWindow?.document
  if (!view || !iframeDom) return;
  const html = iframeDom.getElementById("newView")?.innerHTML
    .replace(/ contenteditable="\S*"/g, '')
    .replace(/ style="\S*"/g, "")
  const style = iframeDom.getElementById("compyDesign")?.innerText
  if (!html || !style) return;
  saveHistory({ value: { html, style }, id })
  const designList: IDesgin[] | null = JSON.parse(sessionStorage.getItem("designList") || JSON.stringify(null))
  if (designList) designList.forEach((data, key) => {
    if (data.id === id) designList[key] = { ...data, html };
  })
  sessionStorage.setItem("designList", JSON.stringify(designList))
}