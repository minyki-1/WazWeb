import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"

const temp = [
  {
    id: "0",
    title: "test",
    owner: "0",
    style: "",
    html: ""
  }
]

export default function Home() {
  return (
    <Container>
      <Header />
      <Main>
        <LeftSideBar />
        <DesignList>

        </DesignList>
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
const DesignList = styled.div`
  width:100%;
  height:100%;
  background-color: red;
`
const Design = styled.div`
  
`