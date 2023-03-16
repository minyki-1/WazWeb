import { useState } from "react";
import { useStore } from "../../zustand/store";
import styled from "styled-components"
import { useEffect } from "react";
import { keyDownFunc } from "../../lib/keyDown"

export default function NewView({ html, isOnlyView, dom, param }: { html: string, isOnlyView: boolean, dom: Document, param?: string | string[] | undefined }) {
  const { selectComp, setSelectComp } = useStore();
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const canEditTag = ["H1", "H2", "H3", "H4", "H5", "P", "A"];
  const handleKeyDown = keyDownFunc(param)

  const resetSelectComp = () => {
    if (selectComp) { //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
      if (canEditTag.includes(selectComp.tagName)) selectComp.contentEditable = "false"; //* 글수정 상태에서 바꿀때 그걸 false해줌
      selectComp.style.boxShadow = "";
      selectComp.style.cursor = ""
    }
  }
  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    //* view는 이벤트 적용용이라 제외, selectComp가 mouseoverComp가 되어선 안되기 때문에 제외함
    if (!target || target.id === "view" || target === selectComp) return;
    if (mouseoverComp) mouseoverComp.style.boxShadow = ""; //* 기존 mouseOverComp의 boxShadow을 초기화해줌
    target.style.boxShadow = "inset 0px 0px 0px 2.8px #6A9BF5";
    setMouseoverComp(target)
  }

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    const target = e.target as HTMLElement | null
    //* target === selectComp : target이 selectComp일 경우 굳이 다시 바꿀 필요가 없어서 제외
    if (!target || target.id === "view" || target === selectComp) return;
    resetSelectComp();
    if (mouseoverComp) mouseoverComp.style.boxShadow = ""
    setSelectComp(target)
    setMouseoverComp(undefined)
    target.style.boxShadow = "inset 0px 0px 0px 2.8px #2B70F0"
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
    const view = dom.querySelector(View.toString()) as HTMLElement | null
    if (view) view.innerHTML = html
  }, [])

  if (isOnlyView) return (<View />)
  return (
    <View
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDoubleClick={handleDoubleClick}
    />
  )
}

const View = styled.div`
  border-radius: 12px;
`