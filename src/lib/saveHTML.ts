import { IDesign } from "../types/design";
import { getStyleName, getViewName } from "./getMainComp";
import { saveHistory } from "./history";

export const saveHTML = (id: string) => {
  const view = document.getElementById(getViewName()) as HTMLIFrameElement | null
  const iframeDom = view?.contentDocument
  if (!view || !iframeDom) return;
  const html = iframeDom.getElementById("newView")?.innerHTML
    .replace(/ contenteditable="[^"]*"/g, '')
    .replace(/ style="[^"]*"/g, '');
  const style = iframeDom.getElementById(getStyleName())?.innerHTML
  if (!html || !style) return;
  saveHistory({ value: { html, style }, id })
  const designList: IDesign[] | null = JSON.parse(sessionStorage.getItem("designList") || JSON.stringify(null))
  if (designList) designList.forEach((data, key) => {
    if (data.id === id && style) designList[key] = { ...data, html, style };
  })
  sessionStorage.setItem("designList", JSON.stringify(designList))
}