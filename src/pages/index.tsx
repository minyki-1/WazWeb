import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"
import Design from '../components/home/design';

const temp = [
  {
    id: "0",
    title: "test1",
    owner: "0",
    html: `<div class="App app" style="width:100%;height:100%;background-color:green;border-radius:12px;">test1</div>`
  },
  {
    id: "1",
    title: "test2",
    owner: "0",
    html: `<div class="App app" style="width:100%;height:100%;background-color:blue;border-radius:12px;">test2</div>`
  },
]

export default function Home() {
  const [list, setList] = useState<{ [key: string]: string }[]>()

  useEffect(() => {
    setList(temp)
  }, [])

  return (
    <Container>
      <Header />
      <Main>
        <LeftSideBar />
        <DesignList>
          {/* {
            list?.map((value, key) => (
              
            ))
          } */}
          <Design></Design>
        </DesignList>
      </Main>
    </Container>
  )
}

const Container = styled.main`
  width:100vw;
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  width:100%;
  display:flex;
`
const DesignList = styled.div`
  width:calc(100% - 240px);
  height:100%;
  max-height:calc(100vh - 48px);
  display:flex;
  overflow: scroll;
  flex-wrap: wrap;
`
