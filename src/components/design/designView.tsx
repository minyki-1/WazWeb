import { useState } from "react"
import styled from "styled-components"
import { useStore } from "../../zustand/store";

export default function CompyView() {
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const { selectComp, setSelectComp } = useStore();
  const [zoom, setZoom] = useState(1);
  const canEditTag = ["H1", "H2", "H3", "H4", "H5", "P", "A"];

  const resetSelectComp = () => {
    if (selectComp) { //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
      if (canEditTag.includes(selectComp.tagName)) selectComp.contentEditable = "false"; //* 글수정 상태에서 바꿀때 그걸 false해줌
      selectComp.style.boxShadow = "";
      selectComp.style.cursor = ""
    }
  }

  const handleMouseOver = ({ target }: { target: HTMLElement }) => {
    //* view는 이벤트 적용용이라 제외, selectComp가 mouseoverComp가 되어선 안되기 때문에 제외함
    if (target.id === "view" || target === selectComp) return;
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

  const HandleViewBgClick = ({ target }: { target: HTMLElement }) => {
    const viewBg = document.getElementsByClassName(ViewBg.styledComponentId)[0]
    //* viewBg !== target : target이 viewBg일 때만 실행해야 이벤트 버블링된 하위 컴포넌트는 실행이 안됨
    if (viewBg !== target) return;
    resetSelectComp();
    setSelectComp(undefined)
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

  const handleWheel = ({ deltaY }: { deltaY: number }) => {
    const view = document.getElementsByClassName(View.styledComponentId)[0] as HTMLElement | null
    const viewBg = document.getElementsByClassName(ViewBg.styledComponentId)[0] as HTMLElement | null
    const container = document.getElementsByClassName(Container.styledComponentId)[0]
    const zoomValue = zoom + deltaY * 0.001
    if (view && viewBg && container) {
      setZoom(zoomValue)
      view.style.transform = `scale(${zoomValue})`
      viewBg.style.width = (view.offsetWidth * zoomValue) + 100 + "px"
      viewBg.style.height = (view.offsetHeight * zoomValue) + 100 + "px"
    }
  }

  return (
    <Container>
      <ViewBg
        id="viewBg"
        style={{ backgroundColor: "#C7C7C7" }}
        onClick={HandleViewBgClick}
      // onWheel={handleWheel}
      >
        <View
          id="view"
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onDoubleClick={handleDoubleClick}
        />
      </ViewBg>
    </Container >
  )
}

const Container = styled.div`
  flex:1;
  overflow: scroll;
  z-index: 0;
`
const View = styled.div`
  width:360px;
  height:720px;
  z-index: 2;
  *{
    all:unset;
  }
`
const ViewBg = styled.div`
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