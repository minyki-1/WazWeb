import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { useStore } from "../../zustand/store";
import { useEffect } from "react";
import { smallerHTML } from "../../lib/resize";
import { INewView } from "../../lib/createNewView";
import { saveHTML } from "../../lib/saveHTML";
import { redoHistory, undoHistory } from "../../lib/history";

export default function NewView({ html, style, dom, param, resize }: INewView) {
  const { selectComp, setSelectComp } = useStore();
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const canEditTag = ["H1", "H2", "H3", "H4", "H5", "P", "A"];
  const [copyComp, setCopyComp] = useState<HTMLElement>();
  const changeComp = selectComp?.ownerDocument.getElementById("newView")

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
    e.preventDefault()
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

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined = (e) => {
    const { key, ctrlKey, shiftKey } = e;
    const selectIsNotView = selectComp && selectComp.classList[1] !== "app"; //* 삭제,카피는 selectComp가 view가 아닐 경우에 해야함

    if (typeof param !== "string") return;
    if (selectIsNotView && key === 'Delete') deleteEvent(param);
    if (!ctrlKey) return; //* 이 밑의 기능은 전부 ctrl을 누르고 있을때만 실행
    if (shiftKey && key === 'Z') redoEvent(param);
    else if (key === 'z') undoEvent(param);
    else if (selectIsNotView && key === 'c') copyEvent(param);
    else if (key === 'v') pasteEvent(param);
  }

  const deleteEvent = (param: string) => {
    const doc = selectComp?.ownerDocument
    const styleComp = doc?.getElementById("compyDesign")
    if (!selectComp || !styleComp || !doc) return;
    const id = selectComp.classList[1]
    selectComp.remove()
    setSelectComp(undefined)
    if (doc.getElementsByClassName(id).length !== 0) return;
    const removeRegex = new RegExp(`\\.${id}\\s*{[^}]*}|\\s*\\.${id}\\s*{[^}]*}`, "g");
    const removeStyle = styleComp.textContent?.replace(removeRegex, "")
    if (!removeStyle) return;
    styleComp.textContent = removeStyle
    saveHTML(param)
  }

  const redoEvent = (param: string) => {
    if (!changeComp) return
    redoHistory(({ id: param, changeComp }));
    saveHTML(param)
  }

  const undoEvent = (param: string) => {
    if (!changeComp) return
    undoHistory({ id: param, changeComp });
    saveHTML(param)
  }

  const copyEvent = (param: string) => {
    setCopyComp(selectComp);
    saveHTML(param)
  }

  const pasteEvent = (param: string) => {
    if (!copyComp || !selectComp) return;
    const newComp = copyComp.cloneNode(true) as HTMLElement
    selectComp.append(newComp)
    saveHTML(param)
  }


  useEffect(() => {
    const mainStyle: { [key: string]: string } = { width: "100vw", height: "100vh", backgroundColor: "white", borderRadius: "12px", display: "flex", justifyContent: "center", alignItems: "center" }
    dom.body.style.margin = "0px"
    const view = dom.getElementById("newView") as HTMLElement | null
    if (!view) return;
    view.innerHTML = html
    // setSelectComp(view)
    if (!dom.getElementById("compyDesign")) {
      const styleElem = document.createElement("style")
      styleElem.id = "compyDesign"
      styleElem.textContent = style
      dom.head.append(styleElem)
    }

    if (!param) Object.keys(mainStyle).forEach((key) => view.style[key as any] = mainStyle[key])
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
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDoubleClick={handleDoubleClick}
    />
  )
}
