import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"
import Design from '../components/home/design';
import { IDesgin } from '../types/design';
import { saveHistory } from '../lib/history';
import { refreshExpired, setRefresh } from '../lib/refresh';

const temp: IDesgin[] = [
  {
    id: "0",
    title: "test1",
    owner: "0",
    html: `<div class="App app" style="width:100%;height:100%;background-color:white;border-radius:12px;display:flex;align-items:center;justify-content:center;"><h1 class="test Qsgold">test1</h1><h1 class="test Qsgols">test2</h1></div>`,
    updatedAt: "1"
  },
  {
    id: "1",
    title: "test2",
    owner: "0",
    html: `<div class="App app" style="width:100%;height:100%;background-color:blue;border-radius:12px;display:flex;align-items:center;justify-content:center;"><h1 class="test Qsgold">test2</h1></div>`,
    updatedAt: "2"
  },
]

export default function Home() {
  const [list, setList] = useState<IDesgin[]>()

  useEffect(() => {
    const designListStorage = JSON.parse(sessionStorage.getItem("designList") || JSON.stringify(null))
    if (designListStorage && !refreshExpired({ id: "design" })) { //* 새롭게 받아올 필요없이 기존값을 보내줌
      setList(designListStorage)
    } else { //* 새롭게 리프레시 값을 만들어 주고 값도 새로 받아와야함
      sessionStorage.clear()
      setRefresh({ id: "design" })
      sessionStorage.setItem("designList", JSON.stringify(temp))
      temp.forEach(data => saveHistory({ value: data.html, id: data.id }))
      setList(temp)
    }
  }, [])

  return (
    <Container>
      <Header />
      <Main>
        <LeftSideBar />
        <DesignList>
          {
            list?.map((value, key) => (
              <Design key={key} {...value} />
            ))
          }
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
