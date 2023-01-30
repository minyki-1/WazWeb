import styled from 'styled-components'
import Header from '../components/design/header'
import RightSideBar from '../components/design/rightSideBar'

export default function Design() {
  return (
    <Container>
      <Header />
      <Main>
        <div></div>
        <div></div>
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