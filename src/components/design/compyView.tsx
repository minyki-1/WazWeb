import { useEffect, useState } from "react"
import styled from "styled-components"
import { useStore } from "../../zustand/store";

export default function CompyView() {
  // const [selectComp, setSelectComp] = useState<HTMLElement | undefined>();
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const { selectComp, setSelectComp } = useStore();
  const [zoom, setZoom] = useState(1);

  const viewMouseOverEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target !== selectComp) {
      if (mouseoverComp) mouseoverComp.style.outline = "";
      target.style.outline = "rgba(43, 112, 240, 0.4) solid 2.5px";
      setMouseoverComp(target)
    }
  }

  const viewClickEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target !== selectComp) {
      if (selectComp) {
        selectComp.contentEditable = "false"; //* 만약 글수정 상태에서 바꿀때 그걸 false해줌
        selectComp.style.outline = ""
      }
      if (mouseoverComp) mouseoverComp.style.outline = ""
      setSelectComp(target)
      setMouseoverComp(undefined)
      target.style.outline = "rgba(43, 112, 240, 0.8) solid 2.5px"
    }
  }

  const viewBgClickEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const viewWrapper = document.querySelector("." + ViewWrapper.styledComponentId)
    if (viewWrapper === target && target !== selectComp && selectComp) {
      selectComp.contentEditable = "false";
      selectComp.style.outline = "";
      setSelectComp(undefined)
    }
  }
  const viewMouseOutEvent = () => {
    if (mouseoverComp && mouseoverComp !== selectComp) {
      mouseoverComp.style.outline = "";
      setMouseoverComp(undefined);
    }
  }

  const viewWheelEvent = (e: any) => {
    e.preventDefault();
    const view = document.querySelector("." + View.styledComponentId) as HTMLElement | null
    const viewWrapper = document.querySelector("." + ViewWrapper.styledComponentId) as HTMLElement | null
    const container = document.querySelector("." + Container.styledComponentId)
    const zoomValue = zoom + e.deltaY * 0.001
    if (view && viewWrapper && container) {
      setZoom(zoomValue)
      view.style.transform = `scale(${zoomValue})`
      viewWrapper.style.width = (view.offsetWidth * zoomValue) + 100 + "px"
      viewWrapper.style.height = (view.offsetHeight * zoomValue) + 100 + "px"
    }
  }

  return (
    <Container>
      <ViewWrapper
        onClick={viewBgClickEvent}
      // onWheel={viewWheelEvent}
      >
        <View
          className="App &app"
          onClick={viewClickEvent}
          onMouseOver={viewMouseOverEvent}
          onMouseOut={viewMouseOutEvent}
        />
      </ViewWrapper>
    </Container >
  )
}

const Container = styled.div`
  width:calc(100% - 280px - 310px);
  overflow: scroll;
  z-index: 0;
`
const View = styled.div`
  width:360px;
  height:720px;
  background-color: white;
  border-radius: 12px;
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