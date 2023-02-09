import styled from 'styled-components'
import Header from '../components/design/header'
import RightSideBar from '../components/design/rightSideBar'
import CompyView from '../components/design/compyView'

export default function Design() {
  return (
    <Container>
      <Header />
      <Main>
        <div style={{ width: 300, backgroundColor: "white", zIndex: 1, boxShadow: "2px 0px 10px rgba(0,0,0,0.25)" }}></div>
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
  background-color: #C7C7C7;
`
const Main = styled.div`
  width:100vw;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: space-between;
`