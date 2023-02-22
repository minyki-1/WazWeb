import styled from 'styled-components'
import Header from '../../components/design/header'
import RightSideBar from '../../components/design/rightSideBar'
import CompyView from '../../components/design/compyView'
import LeftSideBar from '../../components/design/leftSideBar'
import { useStore } from '../../zustand/store'
import { useEffect, useState } from 'react'
import { getCompUID } from '../../lib/randomString'
import { useRouter } from 'next/router'
import { undoHistory, redoHistory, getHistory, saveHistory } from '../../lib/history'
import { IDesgin } from '../../types/design'
import { saveHTML } from '../../lib/saveHTML'
import { refreshExpired, setRefresh } from '../../lib/refresh'

export default function Design() {
  const { selectComp } = useStore();
  const [copyComp, setCopyComp] = useState<HTMLElement>();
  const param = useRouter().query.id

  const handleKeyDown = (e: KeyboardEvent) => {
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

  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify({ id: "0", name: "CWIN77", img: "http://localhost:4000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GhNSjWAGbrfqbT6j186QBK8iPJBQIAQzCC6EOxheQ%3Ds96-c&w=64&q=75" }))
    const user = JSON.parse(localStorage.getItem("user") || JSON.stringify(null))
    const id = "0"
    if (!user.id || id !== user.id) {
      console.log("옳바른 사용자가 아닙니다.")
      return
    }

    const view = document.getElementById("view")
    if (typeof param !== "string" || !view) return
    const history = getHistory({ id: param })
    if (!history || refreshExpired({ id: "design" })) {
      sessionStorage.clear()
      setRefresh({ id: "design" })
      const temp = `<div class="App app" style="width:100%;height:100%;background-color:red;border-radius:12px;"><h1 style="font-color:black">CHange!!!</h1></div>`
      view.innerHTML = temp
      saveHistory({ id: temp, value: temp })
    } else if (history) view.innerHTML = history[0];
  }, [param])

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