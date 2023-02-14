import styled from 'styled-components'
import Header from '../components/design/header'
import RightSideBar from '../components/design/rightSideBar'
import CompyView from '../components/design/compyView'
import LeftSideBar from '../components/design/leftSideBar'
import { useStore } from '../zustand/store'

export default function Design() {
  const { selectComp } = useStore();

  const handleKeyUp = (e: KeyboardEvent) => {
    const { key, ctrlKey, shiftKey } = e;
    const selectIsNotView = selectComp && selectComp.id !== "view"; //* 삭제,카피는 selectComp가 view가 아닐 경우에 해야함
    if (selectIsNotView && key === 'Delete') selectComp.remove();
    if (!ctrlKey) return;
    if (shiftKey && key === 'Z') redoEvent();
    else if (key === 'z') undoEvent();
    else if (selectIsNotView && key === 'c') copyEvent();
    else if (key === 'v') pasteEvent();
  }

  const undoEvent = () => {
    console.log("undo")
  }

  const redoEvent = () => {
    console.log("redo")
  }

  const copyEvent = () => {
    console.log("copy")
  }

  const pasteEvent = () => {
    console.log("paste")
  }

  return (
    <Container tabIndex="0" onKeyDown={handleKeyUp}>
      <Header />
      <Main>
        <LeftSideBar />
        <CompyView />
        <RightSideBar />
      </Main>
    </Container>
  )
}

const Container = styled.main`
  width:100vw;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  background-color: #C7C7C7;
`
const Main = styled.div`
  width:100vw;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: space-between;
`