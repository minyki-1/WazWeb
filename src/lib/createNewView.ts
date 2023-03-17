import React from "react";
import ReactDOM from "react-dom/client";
import NewView from "../components/design/newView"
export async function createNewView(html: string, dom: Document, isOnlyView: boolean, param?: string | string[]) {
  const main = dom.createElement("div")
  main.style.width = "100vw"
  main.style.height = "100vh"
  dom.body.appendChild(main)
  const root = ReactDOM.createRoot(main);
  root.render(
    React.createElement(
      NewView,
      { html, isOnlyView, dom, param },
      null
    )
  );
  // return
}