import styled from 'styled-components'
import Header from '../components/home/Header';
import LeftSideBar from "../components/home/LeftSideBar"

export default function Home() {
  return (
    <Container>
      <Header />
      <Main>
        <LeftSideBar />
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
`