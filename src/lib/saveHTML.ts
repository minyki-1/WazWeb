import { IDesgin } from "../types/design";
import { saveHistory } from "./history";

export const saveHTML = (param: string) => {
  const view = document.getElementById("view")
  if (!view) return;
  const htmlText = view.innerHTML
    .replace('outline: rgba(43, 112, 240, 0.8) solid 3px; ', '')
    .replace('outline: rgba(43, 112, 240, 0.4) solid 3px; ', '')
    .replace('outline: rgba(43, 112, 240, 0.8) solid 3px;', '')
    .replace('outline: rgba(43, 112, 240, 0.4) solid 3px;', '')
    .replace('contenteditable="false"', '')
    .replace('contenteditable="true"', '');

  const designList: IDesgin[] | null = JSON.parse(sessionStorage.getItem("designList") || JSON.stringify(null))
  if (designList) {
    designList.forEach((data, key) => {
      if (data.id === param) designList[key] = { ...data, html: htmlText };
    })
    sessionStorage.setItem("designList", JSON.stringify(designList))
  }
  saveHistory({ value: htmlText, id: param })
}