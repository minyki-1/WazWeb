import styled from 'styled-components'
import Arrange from './styleEditor/arrange'
import Size from './styleEditor/size'
import Basic from './styleEditor/basic'
import Font from './styleEditor/font'
import { useEffect } from 'react'
import { useStore } from '../../zustand/store'

export default function RightSideBar() {
  const { selectId, setSelectId } = useStore();

  useEffect(() => {
    console.log(selectId)
  }, [selectId])

  return (
    <Container id="rightSideBar">
      <Size />
      <Basic />
      <Arrange />
      <Font />
    </Container>
  )
}

const Container = styled.section`
  width:310px;
  z-index: 2;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  /* border-right: 2px solid rgba(54,54,54,0.1); */
  box-shadow: -2px 0px 10px rgba(0,0,0,0.25);
  background-color: #F5F5F5;
`