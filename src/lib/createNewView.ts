import React from "react";
import ReactDOM from "react-dom/client";
import NewView from "../components/design/newView"
export async function createNewView(html: string, style: string, dom: Document, param?: string | string[]) {
  const main = dom.createElement("div")
  dom.body.appendChild(main)
  const root = ReactDOM.createRoot(main);
  root.render(
    React.createElement(
      NewView,
      { html, style, dom, param },
      null
    )
  );
  return main
}