import { useState, KeyboardEventHandler } from "react";
import { useStore } from "../zustand/store";
import { redoHistory, undoHistory } from "./history";
import { getCompUID } from "./randomString";

export const keyDownFunc = (param: string | string[] | undefined) => {
  const { selectComp } = useStore()
  const [copyComp, setCopyComp] = useState<HTMLElement>();

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> | undefined = (e) => {
    const { key, ctrlKey, shiftKey } = e;
    const selectIsNotView = selectComp && selectComp.id !== "&app"; //* 삭제,카피는 selectComp가 view가 아닐 경우에 해야함

    if (selectIsNotView && key === 'Delete') selectComp.remove();
    if (!ctrlKey) return; //* 이 밑의 기능은 전부 ctrl을 누르고 있을때만 실행
    if (shiftKey && key === 'Z') redoEvent();
    else if (key === 'z' && typeof param === "string") undoEvent();
    else if (selectIsNotView && key === 'c') setCopyComp(selectComp);
    else if (key === 'v') pasteEvent();
  }

  const redoEvent = () => {
    const changeComp = document.getElementById("view")
    if (typeof param !== "string") return
    redoHistory(({ id: param, changeComp }));
  }

  const undoEvent = () => {
    const changeComp = document.getElementById("view")
    if (typeof param !== "string") return
    undoHistory({ id: param, changeComp });
  }

  const pasteEvent = () => {
    if (!copyComp || !selectComp) return;
    const newComp = copyComp.cloneNode(true) as HTMLElement
    const className = newComp.className.split(" ")[0]
    newComp.className = className + " " + getCompUID(6)
    selectComp.append(newComp)
  }

  return handleKeyDown
}