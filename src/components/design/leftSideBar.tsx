import styled from 'styled-components'
import Comp from './comp/comp'

export default function RightSideBar() {
  const temp = {
    name: "Test",
    descript: "for test component",
    html: "<div>Hello Test</div>"
  }
  return (
    <Container>
      <Comp {...temp} />
    </Container>
  )
}

const Container = styled.section`
  width:280px;
  z-index: 2;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  box-shadow: -2px 0px 10px rgba(0,0,0,0.25);
  background-color: #F5F5F5;
`
