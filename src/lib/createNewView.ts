import React from "react";
import ReactDOM from "react-dom/client";
import NewView from "../components/design/newView";
export async function createNewView({ html, style, viewId, id, resize }: { html: string, style: string, viewId: string, id?: string, resize?: boolean }) {
  const iView = document.getElementById(viewId) as HTMLIFrameElement | null
  const doc = iView?.contentWindow?.document
  if (!doc || doc.body.firstChild) return;
  const main = doc.createElement("div")
  doc.body.appendChild(main)
  const root = ReactDOM.createRoot(main);
  root.render(
    React.createElement(
      NewView,
      { html, style, id, doc, resize },
      null
    )
  );
  return main
}