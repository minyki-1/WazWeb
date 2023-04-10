import styled from 'styled-components'
import Header from '../../../components/design/header'
import RightSideBar from '../../../components/design/rightSideBar'
import CompyView from '../../../components/design/designView'
import LeftSideBar from '../../../components/design/leftSideBar'
import { useRouter } from 'next/router'
import { keyDownFunc } from '../../../lib/keyDown'
export default function Design() {
  const param = useRouter().query.id
  
  return (
    <Container tabIndex={0} {...keyDownFunc(param)}>
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