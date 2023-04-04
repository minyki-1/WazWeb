import styled from 'styled-components'
import Header from '../../../components/design/header'
import RightSideBar from '../../../components/design/rightSideBar'
import CompyView from '../../../components/design/designView'
import LeftSideBar from '../../../components/design/leftSideBar'
import { useRouter } from 'next/router'
import { useStore } from '../../../zustand/store'
import { saveHTML } from '../../../lib/saveHTML'
export default function Design() {
  const { selectComp } = useStore();
  const param = useRouter().query.id
  const handleClick = () => {
    if (typeof param !== "string" || !selectComp) return; //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
    selectComp.childNodes.forEach(e => {
      if (e.nodeType !== 3) return;
      selectComp.contentEditable = "false"
      saveHTML(param);
    })
  }
  return (
    <Container onClick={handleClick}>
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
`
const Main = styled.div`
  width:100vw;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: space-between;
`