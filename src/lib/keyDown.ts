import { useState, KeyboardEventHandler } from "react";
import { useStore } from "../zustand/store";
import { redoHistory, undoHistory } from "./history";
import { saveHTML } from "./saveHTML";

export const keyDownFunc = (param: string | string[] | undefined) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selectComp, setSelectComp } = useStore()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [copyComp, setCopyComp] = useState<HTMLElement>();

  const changeComp = selectComp?.ownerDocument.getElementById("newView")

  const clickAnyWhere = () => {
    if (typeof param !== "string" || !selectComp) return; //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
    selectComp.childNodes.forEach(e => {
      if (e.nodeType !== 3) return;
      selectComp.contentEditable = "false"
      saveHTML(param);
    })
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined = (e) => {
    const { key, ctrlKey, shiftKey } = e;
    const selectIsNotView = selectComp && selectComp.classList[1] !== "app"; //* 삭제,카피는 selectComp가 view가 아닐 경우에 해야함

    const activeTag = document?.activeElement?.tagName
    if (typeof param !== "string" || activeTag === "INPUT") return;
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

  return { onKeyDown: handleKeyDown, onClick: clickAnyWhere }
}