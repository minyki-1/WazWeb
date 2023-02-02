import styled from 'styled-components'
import Arrange from './styleEditor/arrange'
import Size from './styleEditor/size'
import Basic from './styleEditor/basic'

export default function RightSideBar() {
  return (
    <Container>
      <Size />
      <Arrange />
      <Basic />
    </Container>
  )
}

const Container = styled.section`
  width:310px;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  border-right: 2px solid rgba(54,54,54,0.1);
  background-color: #F5F5F5;
`