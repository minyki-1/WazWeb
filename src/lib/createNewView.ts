import React from "react";
import ReactDOM from "react-dom/client";
import NewView from "../components/design/newView"
import { normalize as normalizeCss } from "../css/normalize"
import { reset as resetCss } from "../css/reset"
export interface INewView { html: string, style: string, dom: Document, param?: string | string[], resize?: boolean, normalize?: boolean, reset?: boolean }
export async function createNewView({ html, style, dom, param, resize, normalize, reset }: INewView) {
  if (!dom.body.firstChild) {
    const main = dom.createElement("div")
    if (normalize) {
      const normalizeStyle = dom.createElement('style')
      normalizeStyle.textContent = normalizeCss
      dom.head.appendChild(normalizeStyle)
    }
    if (reset) {
      const resetStyle = dom.createElement('style')
      resetStyle.textContent = resetCss
      dom.head.appendChild(resetStyle)
    }
    dom.body.appendChild(main)
    const root = ReactDOM.createRoot(main);
    root.render(
      React.createElement(
        NewView,
        { html, style, dom, param, resize },
        null
      )
    );
    return main
  }
}