import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { useStore } from "../../../zustand/store";

export default function CompyView() {
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const { selectComp, setSelectComp } = useStore();
  const [zoom, setZoom] = useState(1);
  const canEditTag = ["H1", "H2", "H3", "H4", "H5", "P", "A"];
  const router = useRouter()

  const resetSelectComp = () => {
    if (selectComp) { //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
      selectComp.contentEditable = "false"; //* 글수정 상태에서 바꿀때 그걸 false해줌
      selectComp.style.outline = "";
      selectComp.style.cursor = ""
    }
  }

  const handleMouseOver = ({ target }: { target: HTMLElement }) => {
    //* view는 이벤트 적용용이라 제외, selectComp가 mouseoverComp가 되어선 안되기 때문에 제외함
    if (target.id === "view" || target === selectComp) return;
    if (mouseoverComp) mouseoverComp.style.outline = ""; //* 기존 mouseOverComp의 outline을 초기화해줌
    target.style.outline = "rgba(43, 112, 240, 0.4) solid 3px";
    setMouseoverComp(target)
  }

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    const target = e.target as HTMLElement | null
    //* target === selectComp : target이 selectComp일 경우 굳이 다시 바꿀 필요가 없어서 제외
    if (!target || target.id === "view" || target === selectComp) return;
    resetSelectComp();
    if (mouseoverComp) mouseoverComp.style.outline = ""
    setSelectComp(target)
    setMouseoverComp(undefined)
    target.style.outline = "rgba(43, 112, 240, 0.8) solid 3px"
  }

  const viewBgClickEvent = ({ target }: { target: HTMLElement }) => {
    const viewWrapper = document.querySelector("." + ViewWrapper.styledComponentId)
    //* viewWrapper !== target : target이 viewWrapper일 때만 실행해야 이벤트 버블링된 하위 컴포넌트는 실행이 안됨
    if (viewWrapper !== target) return;
    resetSelectComp();
    setSelectComp(undefined)
  }
  const handleMouseOut = () => {
    if (mouseoverComp) mouseoverComp.style.outline = "";
    setMouseoverComp(undefined);
  }

  const handleDoubleClick = () => {
    if (selectComp && canEditTag.includes(selectComp.tagName)) {
      selectComp.contentEditable = "true";
      selectComp.style.cursor = "text";
    }
  }

  // const handleWheel = ({ deltaY }: { deltaY: number }) => {
  //   const view = document.querySelector("." + View.styledComponentId) as HTMLElement | null
  //   const viewWrapper = document.querySelector("." + ViewWrapper.styledComponentId) as HTMLElement | null
  //   const container = document.querySelector("." + Container.styledComponentId)
  //   const zoomValue = zoom + deltaY * 0.001
  //   if (view && viewWrapper && container) {
  //     setZoom(zoomValue)
  //     view.style.transform = `scale(${zoomValue})`
  //     viewWrapper.style.width = (view.offsetWidth * zoomValue) + 100 + "px"
  //     viewWrapper.style.height = (view.offsetHeight * zoomValue) + 100 + "px"
  //   }
  // }

  return (
    <ViewWrapper
      onClick={viewBgClickEvent}
    // onWheel={handleWheel}
    >
      <View
        id="view"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onDoubleClick={handleDoubleClick}
      >
        {
          router.query.id ?
            <iframe
              src={`${router.asPath}/view`}
              style={{ width: "100%", height: "100%", border: "none" }}
            /> : null
        }
        {/* <div
            className="App app"
            style={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: 12 }}
          /> */}
      </View>
    </ViewWrapper>
  )
}

const View = styled.div`
  width:360px;
  height:720px;
  z-index: 2;
`
const ViewWrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  min-width:100%;
  min-height:100%;
  width:460px;
  height:820px;
  overflow: scroll;
  z-index: 2;
`