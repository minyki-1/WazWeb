import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"

export default function Home() {
  return (
    <Container>
      <Header />
      <LeftSideBar />
      {/* <div style={{ display: "flex", height: "100%" }}>
        <LeftSideBar />
        <div>12345</div>
      </div> */}
    </Container>
  )
}

const Container = styled.div`
  width:100vw;
  min-height:100vh;
  display: flex;
  flex-direction: column;
`
