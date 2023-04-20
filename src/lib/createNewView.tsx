import React from "react";
import ReactDOM from "react-dom/client";
import { MouseEventHandler, useState } from "react";
import { useStore } from "../zustand/store";
import { useEffect } from "react";
import { saveHTML } from "./saveHTML";
import { keyDownFunc } from "./keyDown";
import { normalize as normalizeCss } from "../css/normalize"
import { reset as resetCss } from "../css/reset"
import { smallerHTML } from "./resize";
import { selectorStyler } from "./selectorStyler";
import { getStyleName } from "./getMainComp";

export async function createNewView({ html, style, viewId, id, type, resize }: { html: string, style: string, viewId: string, id?: string, type: "design" | "widget", resize?: boolean }) {
  const iView = document.getElementById(viewId) as HTMLIFrameElement | null
  const doc = iView?.contentWindow?.document
  if (!doc || doc.body.firstChild) return;
  const main = doc.createElement("div")
  doc.body.appendChild(main)
  const root = ReactDOM.createRoot(main);
  root.render(
    React.createElement(
      NewView,
      { html, style, id, doc, type, resize },
      null
    )
  );
  return main
}

function NewView({ html, style, doc, id, type, resize }: { html: string, style: string, doc: Document, id?: string | string[], type: "design" | "widget", resize?: boolean }): JSX.Element {
  const { selectComp, setSelectComp } = useStore();
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const canEditTag = ["H1", "H2", "H3", "H4", "H5", "P", "A"];
  const resetSelectComp = () => {
    if (!selectComp || typeof id !== "string") return; //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
    selectComp.childNodes.forEach(e => {
      if (e.nodeType !== 3) return;
      selectComp.contentEditable = "false"
      saveHTML(id);
    })
    selectComp.style.boxShadow = "";
    selectComp.style.cursor = ""
  }
  const handleMouseOver: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement | null;
    //* view는 이벤트 적용용이라 제외, selectComp가 mouseoverComp가 되어선 안되기 때문에 제외함
    if (!target || target.id === "newView" || target === selectComp) return;
    if (mouseoverComp) mouseoverComp.style.boxShadow = ""; //* 기존 mouseOverComp의 boxShadow을 초기화해줌
    target.style.boxShadow = "inset 0px 0px 0px 2.8px #6cabf3";
    setMouseoverComp(target)
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    document.body.blur();
    const target = e.target as HTMLElement | null
    //* target === selectComp : target이 selectComp일 경우 굳이 다시 바꿀 필요가 없어서 제외
    if (!target || target.id === "newView" || target === selectComp) return;
    resetSelectComp();
    if (mouseoverComp) mouseoverComp.style.boxShadow = ""
    setSelectComp(target)
    setMouseoverComp(undefined)
    target.style.boxShadow = "inset 0px 0px 0px 2.8px #2887f4"
  }
  const handleMouseOut = () => {
    if (mouseoverComp) mouseoverComp.style.boxShadow = "";
    setMouseoverComp(undefined);
  }

  const handleDoubleClick = () => {
    if (selectComp && canEditTag.includes(selectComp.tagName)) {
      selectComp.contentEditable = "true";
      selectComp.style.cursor = "text";
    }
  }

  function setupDesign() {
    const view = doc.getElementById("newView")
    if (!view) return;
    view.innerHTML = html
    const styleName = getStyleName()
    if (!doc.getElementById(styleName)) {
      const styleElem = doc.createElement("style")
      styleElem.id = styleName
      styleElem.textContent = style
      doc.head.append(styleElem)
    }
    if (resize) smallerHTML(view.childNodes[0] as HTMLElement | null, view, -30)
  }

  function setupDefaultStyle() {
    if (!doc.getElementById("normalizeStyle")) {
      const normalizeStyle = doc.createElement('style')
      normalizeStyle.textContent = normalizeCss
      normalizeStyle.id = "normalizeStyle"
      doc.head.appendChild(normalizeStyle)
    }
    if (!doc.getElementById("resetStyle")) {
      const resetStyle = doc.createElement('style')
      resetStyle.id = "resetStyle"
      resetStyle.textContent = resetCss
      doc.head.appendChild(resetStyle)
    }
    const view = doc.getElementById("newView")
    if (!view) return;
    const mainStyle: { [key: string]: string } = { width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }
    if (type === "widget") Object.keys(mainStyle).forEach((key) => view.style[key as any] = mainStyle[key])
  }

  useEffect(() => {
    setupDefaultStyle()
    setupDesign()
    // console.log(selectorStyler('.app', 'backgroundColor', doc.styleSheets[2]).get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, id, doc, setSelectComp, style])

  if (type === "widget") return (
    <div id="newView"
      onClick={(e) => { e.preventDefault() }
      }
    />
  )
  return (
    <div
      id="newView"
      tabIndex={0}
      {...keyDownFunc(id)}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDoubleClick={handleDoubleClick}
    />
  )
}
