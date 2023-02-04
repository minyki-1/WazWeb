import { useState, useEffect } from 'react'
import styled from "styled-components"
import { IColor } from "../../../types/design"
import ColorPicker from '../../common/colorPicker'

export default function Basic() {
  const [bgColor, setBgColor] = useState<IColor>({ r: 0, g: 0, b: 0, a: 1, none: false })
  const [borderColor, setBorderColor] = useState<IColor>({ r: 0, g: 0, b: 0, a: 1, none: false })
  useEffect(() => {
    console.log(bgColor)
  }, [bgColor])
  return (
    <Container>
      <Topic>Basic</Topic>
      <ColorPicker color={bgColor} setColor={setBgColor} />
      <SizeGroup1>
        <h4>Border</h4>
        <input type={"text"} />
        <select>
          <option value="solid">Solid</option>
          <option value="none">None</option>
          <option value="dotted">Dotted</option>
          <option value="inset">Inset</option>
          <option value="dashed">Dashed</option>
          <option value="double">Double</option>
          <option value="groove">Groove</option>
          <option value="outset">Outset</option>
        </select>
        <span style={{ width: 16, height: 16, backgroundColor: "red" }} />
        <input type={"text"} />
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
  display:flex;
  align-items: center;
  h4{
    width:60px;
    opacity: 0.7;
    margin-right: 4px;
    padding: 4px;
  }
  input{
    width:40px;
  }
  select{
    width:60px;
    padding: 4px 0px;
    margin: -4px 0px;
  }
`