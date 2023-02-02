import { useState } from 'react'
import styled from "styled-components"
import { ChromePicker } from 'react-color'
import SVG_eye from "../../../svg/eye.svg"
import SVG_eye_crossed from "../../../svg/eye_crossed.svg"

interface IColor {
  a: string;
  b: string;
  g: string;
  r: string;
}

export default function Basic() {
  const [bgColor, setBgColor] = useState<IColor>({ r: "0", g: "0", b: "0", a: "1" })
  const [showClrSlctr, setShowClrSlctr] = useState(true)

  function colorToHex(color: number) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

  function convertRGBtoHex({ r, g, b }: any) {
    return "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
  }
  return (
    <Container>
      <Topic>Basic</Topic>
      {showClrSlctr &&
        <ColorPickerWrapper>
          <ChromePicker color={bgColor} onChange={(state: any) => setBgColor(state.rgb)} />
        </ColorPickerWrapper>
      }
      <SizeGroup1>
        <h4 title="background-color">Bg Color</h4>
        <span onClick={() => setShowClrSlctr(!showClrSlctr)} style={{ width: 18, height: 18, backgroundColor: convertRGBtoHex(bgColor) }}></span>
        <input type="text" value={convertRGBtoHex(bgColor)} />
        <input type="text" value="100%" />
        <SVG_eye width={20} height={20} style={{ padding: 4, cursor: "pointer" }} />
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
  margin: 12px 0px;
  h4{
    width:60px;
    margin-right: 8px;
    padding: 4px;
    opacity: 0.7;
  }
  input{
    margin-left: 4px;
    width:calc((100% - 60px - 8px - 8px - 20px - 8px) / 2 - 10px);
  }
`
const ColorPickerWrapper = styled.div`
  position: fixed;
  top:calc(50vh - (241.75px / 2));
  right:315px;
`