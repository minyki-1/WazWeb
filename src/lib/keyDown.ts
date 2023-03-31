import { useState, KeyboardEventHandler } from "react";
import { useStore } from "../zustand/store";
import { redoHistory, undoHistory } from "./history";
import { saveHTML } from "./saveHTML";

export const keyDownFunc = (param: string | string[] | undefined) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { selectComp } = useStore()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [copyComp, setCopyComp] = useState<HTMLElement>();

  const changeComp = selectComp?.ownerDocument.getElementById("newView")

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined = (e) => {
    const { key, ctrlKey, shiftKey } = e;
    const selectIsNotView = selectComp && selectComp.classList[selectComp.classList.length - 1] !== "app"; //* 삭제,카피는 selectComp가 view가 아닐 경우에 해야함

    if (selectIsNotView && key === 'Delete') selectComp.remove();
    if (!ctrlKey) return; //* 이 밑의 기능은 전부 ctrl을 누르고 있을때만 실행
    if (shiftKey && key === 'Z') redoEvent();
    else if (key === 'z' && typeof param === "string") undoEvent();
    else if (selectIsNotView && key === 'c') copyEvent();
    else if (key === 'v') pasteEvent();
  }

  const clickAnyWhere = () => {
    if (typeof param !== "string" || !selectComp) return; //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
    selectComp.childNodes.forEach(e => {
      if (e.nodeType !== 3) return;
      selectComp.contentEditable = "false"
      saveHTML(param);
    })
    selectComp.style.boxShadow = "";
    selectComp.style.cursor = ""
  }

  const redoEvent = () => {
    if (typeof param !== "string" || !changeComp) return
    redoHistory(({ id: param, changeComp }));
    saveHTML(param)
  }

  const undoEvent = () => {
    if (typeof param !== "string" || !changeComp) return
    undoHistory({ id: param, changeComp });
    saveHTML(param)
  }

  const copyEvent = () => {
    setCopyComp(selectComp);
    if (typeof param === "string") saveHTML(param)
  }

  const pasteEvent = () => {
    if (!copyComp || !selectComp) return;
    const newComp = copyComp.cloneNode(true) as HTMLElement
    selectComp.append(newComp)
    if (typeof param === "string") saveHTML(param)
  }

  return { onKeyDown: handleKeyDown, onClick: clickAnyWhere }
}