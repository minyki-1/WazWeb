import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"
import DesignView from '../components/home/designView';
import { IDesgin } from '../types/design';
import { useStore } from '../zustand/store';
import { setupValue } from '../lib/setup';

export default function Home() {
  const [list, setList] = useState<IDesgin[]>()
  const { setSelectComp } = useStore();

  useEffect(() => {
    setSelectComp(undefined);
    setList(setupValue("design"))
  }, [setSelectComp])

  return (
    <Container>
      <Header />
      <Main>
        <LeftSideBar />
        <DesignWrap>
          {
            list?.map((value, key) => (
              <DesignView type={"design"} width='360px' height='720px' key={key} {...value} />
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
