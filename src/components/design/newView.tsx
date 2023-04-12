import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { useStore } from "../../zustand/store";
import { useEffect } from "react";
import { smallerHTML } from "../../lib/resize";
import { INewView } from "../../lib/createNewView";
import { saveHTML } from "../../lib/saveHTML";
import { keyDownFunc } from "../../lib/keyDown";

export default function NewView({ html, style, dom, param, resize }: INewView) {
  const { selectComp, setSelectComp } = useStore();
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const canEditTag = ["H1", "H2", "H3", "H4", "H5", "P", "A"];

  const resetSelectComp = () => {
    if (!selectComp || typeof param !== "string") return; //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
    selectComp.childNodes.forEach(e => {
      if (e.nodeType !== 3) return;
      selectComp.contentEditable = "false"
      saveHTML(param);
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

  useEffect(() => {
    const mainStyle: { [key: string]: string } = { width: "100vw", height: "100vh", backgroundColor: "white" }
    dom.body.style.margin = "0px"
    const view = dom.getElementById("newView") as HTMLElement | null
    if (!view) return;
    view.innerHTML = html
    if (!dom.getElementById("WazWeb")) {
      const styleElem = document.createElement("style")
      styleElem.id = "WazWeb"
      styleElem.textContent = style
      dom.head.append(styleElem)
    }

    // if (!param) Object.keys(mainStyle).forEach((key) => view.style[key as any] = mainStyle[key])
    if (resize) smallerHTML(view.childNodes[0] as HTMLElement | null, view, -25)
  }, [dom, html, param, resize, setSelectComp, style])

  if (!param) return (
    <div id="newView"
      onClick={(e) => { e.preventDefault() }}
    />
  )
  return (
    <div
      id="newView"
      tabIndex={0}
      {...keyDownFunc(param)}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDoubleClick={handleDoubleClick}
    />
  )
}
