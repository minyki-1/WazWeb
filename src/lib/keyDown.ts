import { useState, KeyboardEventHandler } from "react";
import { useStore } from "../zustand/store";
import { redoHistory, undoHistory } from "./history";

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
    else if (selectIsNotView && key === 'c') setCopyComp(selectComp);
    else if (key === 'v') pasteEvent();
  }

  const redoEvent = () => {
    if (typeof param !== "string" || !changeComp) return
    redoHistory(({ id: param, changeComp }));
  }

  const undoEvent = () => {
    if (typeof param !== "string" || !changeComp) return
    undoHistory({ id: param, changeComp });
  }

  const pasteEvent = () => {
    if (!copyComp || !selectComp) return;
    const newComp = copyComp.cloneNode(true) as HTMLElement
    selectComp.append(newComp)
  }

  return handleKeyDown
}