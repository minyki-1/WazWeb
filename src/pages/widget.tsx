import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"
import DesignView from '../components/home/designView';
import { IDesgin } from '../types/design';
import { saveHistory } from '../lib/history';
import { refreshExpired, setRefresh } from '../lib/refresh';
import { useStore } from '../zustand/store';

const temp2: IDesgin[] = [
  {
    id: "3",
    title: "widget1",
    owner: "0",
    html: `<header class="Header lsasw_"><h1 class="title scsaqe">Header</h1></header>`,
    style: `.lsasw_{background-color:green;width:100vw;height:100vh;border-bottom:2px solid gray;align-items:center;justify-content:center;}.scsaqe{font-size:18px;}`,
    updatedAt: "1"
  }
]

export default function Widget() {
  const [list, setList] = useState<IDesgin[]>()
  const { setSelectComp } = useStore();

  useEffect(() => {
    setSelectComp(undefined);
    const designListStorage = JSON.parse(sessionStorage.getItem("designList") || JSON.stringify(null))
    if (designListStorage && !refreshExpired({ id: "design" })) { //* 새롭게 받아올 필요없이 기존값을 보내줌
      setList(designListStorage)
    } else { //* 새롭게 리프레시 값을 만들어 주고 값도 새로 받아와야함
      sessionStorage.clear()
      setRefresh({ id: "design" })
      sessionStorage.setItem("designList", JSON.stringify(temp2))
      temp2.forEach(({ html, style, id }) => saveHistory({ id, value: { html, style } }))
      setList(temp2)
    }
  }, [setSelectComp])

  return (
    <Container>
      <Header />
      <Main>
        <LeftSideBar />
        <DesignWrap>
          {
            list?.map((value, key) => (
              <DesignView width={"100%"} height={"100%"} key={key} {...value} />
            ))
          }
        </DesignWrap>
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
const DesignWrap = styled.div`
  width:calc(100% - 240px);
  height:100%;
  overflow:auto;
  max-height:calc(100vh - 48px);
  display:flex;
  flex-wrap: wrap;
`
