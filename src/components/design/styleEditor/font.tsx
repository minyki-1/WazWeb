import { useState } from 'react'
import styled from 'styled-components'

export default function Font() {
  const [display, setDisplay] = useState("flex")
  const [justifyContent, setJustifyContent] = useState("flex-start")
  const [alignItems, setAlignItems] = useState("flex-start")
  const [flexDirection, setFlexDirection] = useState("row")
  const [position, setPosition] = useState("static")

  return (
    <Container>
      <Topic>Font</Topic>
      {/* //* size, weight, color, align, style,  */}

      <SizeGroup1>
        <h4 title="font-size">Size</h4>
        <input type="text" />
      </SizeGroup1>

    </Container>
  )
}

const Container = styled.section`
  width:calc(100% - 40px);
  display:flex;
  flex-direction: column;
  border-bottom: 2px solid rgba(54,54,54,0.1);
  padding: 0px 20px;
  padding-bottom: 28px;
`
const Topic = styled.h2`
  margin-top: 28px;
  margin-bottom: 20px;
`
const SizeGroup1 = styled.div`
  display: flex;
  align-items: center;
  margin: 6px -8px;
  padding: 6px 8px;
  height:22px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  h4{
    width:60px;
    margin-right: 8px;
    padding: 4px;
    opacity: 0.7;
  }
  input{
    width:calc(100% - 72px);
  }
`