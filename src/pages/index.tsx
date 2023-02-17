import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"

const temp = [
  {
    id: "0",
    title: "test1",
    owner: "0",
    style: `.app{width:100%;height:100%;background-color:green;border-radius:12px;}`,
    html: `<div class="App app">test1</div>`
  },
  {
    id: "1",
    title: "test2",
    owner: "0",
    style: `.app{width:100%;height:100%;background-color:green;border-radius:12px;}`,
    html: `<div class="App app">test2</div>`
  },
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