import { useEffect, useState } from "react"
import styled from "styled-components"
import { useStore } from "../../zustand/store";

export default function CompyView() {
  const [selectComp, setSelectComp] = useState<HTMLElement | null>(null);
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | null>(null);
  const { selectId, setSelectId } = useStore();

  const viewMouseOverEvent = (e: MouseEvent) => {
    // const hvId = JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));
    const target = e.target as HTMLElement;
    // const selectComp = getSelectComp(hvId);
    if (target !== selectComp) {
      if (mouseoverComp) mouseoverComp.style.outline = "";
      target.style.outline = "rgba(43, 112, 240, 0.4) solid 2.5px";
      // mouseoverComp = target;
      setMouseoverComp(target)
    }
  }

  const viewClickEvent = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target !== selectComp) {
      console.log(selectComp)
      if (selectComp) {
        selectComp.contentEditable = "false"; //* 만약 글수정 상태에서 바꿀때 그걸 false해줌
        selectComp.style.outline = ""
      }
      if (mouseoverComp) mouseoverComp.style.outline = ""
      setSelectComp(target)
      setSelectId(target.id)
      setMouseoverComp(null)
      target.style.outline = "rgba(43, 112, 240, 0.8) solid 2.5px"
      // setSelectComp(hvId, target.className);
    }
  }

  useEffect(() => {
    console.log()
  }, [selectComp])

  const viewBgClickEvent = (e: MouseEvent) => {
    if (e.target !== selectComp && selectComp) {
      selectComp.contentEditable = "false";
      selectComp.style.outline = "";
      setSelectComp(null)
      // sessionStorage.removeItem(hvId + "selectComp");
      // useStore.setState({ isSelectChange: true });
    }
  }
  const viewMouseOutEvent = () => {
    // const hvId = JSON.parse(sessionStorage.getItem("hvId") || JSON.stringify(null));
    // const selectComp = getSelectComp(hvId);

    if (mouseoverComp && mouseoverComp !== selectComp) mouseoverComp.style.outline = "";
  }

  return (
    <Container onClick={viewBgClickEvent}>
      <View
        onClick={viewClickEvent}
        onMouseOver={viewMouseOverEvent}
        onMouseOut={viewMouseOutEvent}
      >
        <div>div</div>
        <h1>h1</h1>
      </View>
    </Container>
  )
}

const Container = styled.div`
  width:calc(100% - 300px - 310px);
  display: flex;
  align-items: center;
  justify-content: center;
`
const View = styled.div`
  width:360px;
  height:720px;
  background-color: white;
  border-radius: 12px;
`