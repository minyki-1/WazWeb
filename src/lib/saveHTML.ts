import { IDesgin } from "../types/design";
import { saveHistory } from "./history";

export const saveHTML = (param: string) => {
  const view = document.getElementById("view")
  if (!view) return;
  const htmlText = view.innerHTML
    .replace('box-shadow: inset 0px 0px 0px 2.8px #2B70F0; ', '')
    .replace('box-shadow: inset 0px 0px 0px 2.8px #6A9BF5; ', '')
    .replace('box-shadow: inset 0px 0px 0px 2.8px #2B70F0;', '')
    .replace('box-shadow: inset 0px 0px 0px 2.8px #6A9BF5;', '')
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