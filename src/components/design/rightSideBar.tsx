import styled from 'styled-components'
import Size from './styleEditor/size'

export default function RightSideBar() {
  return (
    <Container>
      <Size />
    </Container>
  )
}

const Container = styled.section`
  width:310px;
  height:100%;
  display:flex;
  flex-direction: column;
  border-right: 2px solid rgba(54,54,54,0.1);
  background-color: #F5F5F5;
`