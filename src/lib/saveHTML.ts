import { IDesgin } from "../types/design";
import { saveHistory } from "./history";

export const saveHTML = (param: string) => {
  const view = document.getElementById("view")
  if (!view) return;
  const html = view.innerHTML
    .replace(/ contenteditable="\S*"/g, '')
    .replace(/ style="\S*"/g, "")

  const designList: IDesgin[] | null = JSON.parse(sessionStorage.getItem("designList") || JSON.stringify(null))
  if (!designList) return saveHistory({ html, id: param })
  designList.forEach((data, key) => {
    if (data.id === param) designList[key] = { ...data, html };
  })
  sessionStorage.setItem("designList", JSON.stringify(designList))
}