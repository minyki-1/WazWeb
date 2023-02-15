import styled from 'styled-components'
import Header from '../../components/design/header'
import RightSideBar from '../../components/design/rightSideBar'
import CompyView from '../../components/design/compyView'
import LeftSideBar from '../../components/design/leftSideBar'
import { useStore } from '../../zustand/store'
import { useEffect, useState } from 'react'
import { getCompUID } from '../../lib/randomString'
import { useRouter } from 'next/router'

export default function Design() {
  const { selectComp, saveHTML } = useStore();
  const [copyComp, setCopyComp] = useState<HTMLElement>();
  const param = useRouter().query.id

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key, ctrlKey, shiftKey } = e;
    if (!selectComp) return;
    const selectIsNotView = selectComp.id !== "&app"; //* 삭제,카피는 selectComp가 view가 아닐 경우에 해야함
    if (selectIsNotView && key === 'Delete') selectComp.remove();
    if (!ctrlKey) return;
    if (shiftKey && key === 'Z') redoEvent();
    else if (key === 'z') undoEvent();
    else if (selectIsNotView && key === 'c') copyEvent();
    else if (key === 'v') pasteEvent();
  }

  const undoEvent = () => {
    const histStorage: string[] = JSON.parse(localStorage.getItem("hist_" + param) || JSON.stringify(null))
    const undoStorage: string[] = JSON.parse(localStorage.getItem("undo_" + param) || JSON.stringify(null))
    const view = document.getElementById("view")
    if (!view || !histStorage || !undoStorage || histStorage.length < 2) return;
    view.firstChild?.remove()
    view.innerHTML = histStorage[1]
    localStorage.setItem("undo_" + param, JSON.stringify([histStorage[0], ...undoStorage]))
    histStorage.shift()
    localStorage.setItem("hist_" + param, JSON.stringify(histStorage))
  }

  const redoEvent = () => {
    const histStorage: string[] = JSON.parse(localStorage.getItem("hist_" + param) || JSON.stringify(null))
    const undoStorage: string[] = JSON.parse(localStorage.getItem("undo_" + param) || JSON.stringify(null))
    const view = document.getElementById("view")
    if (!view || !histStorage || !undoStorage || undoStorage.length < 1) return;
    view.firstChild?.remove()
    view.innerHTML = undoStorage[0]
    localStorage.setItem("hist_" + param, JSON.stringify([undoStorage[0], ...histStorage]))
    undoStorage.shift()
    localStorage.setItem("undo_" + param, JSON.stringify(undoStorage))
  }

  const copyEvent = () => {
    setCopyComp(selectComp)
  }

  const pasteEvent = () => {
    if (!copyComp || !selectComp) return;
    const newComp = copyComp.cloneNode(true) as HTMLElement
    const className = newComp.className.split(" ")[0]
    newComp.className = className + " " + getCompUID(6)
    selectComp.append(newComp)
  }

  useEffect(() => {
    saveHTML(param); //* 초기 storage를 만들어줘야함
  }, [param, saveHTML])

  return (
    <Container tabIndex="0" onKeyDown={handleKeyDown}>
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