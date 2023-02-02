import { useState, MouseEvent } from 'react'
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
  const [bgColorDisable, setBgColorDisable] = useState(false)
  const [showClrSlctr, setShowClrSlctr] = useState(false)
  const [colorSelectorTop, setColorSelectorTop] = useState<number>()
  const [opacityInputValue, setOpacityInputValue] = useState("100")
  const eyeBtnProps = { onClick: () => setBgColorDisable(!bgColorDisable), fill: "#363636", width: 20, height: 20, style: { padding: 4, cursor: "pointer" } }

  function colorToHex(color: number) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

  function convertRGBtoHex({ r, g, b }: IColor) {
    return "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
  }

  function colorOnClickHandle(e: MouseEvent) {
    // * ChromePicker(color selector) height = 241.75px
    const colorPicker = document.getElementById("colorPicker")
    const colorPickerHeight = colorPicker?.offsetHeight || 250
    const rightSideBar = document.getElementById("rightSideBar")
    const scrollTop = rightSideBar?.scrollTop ? rightSideBar?.scrollTop : 0
    const targetTop = (e.target as HTMLElement).offsetTop - 100 - scrollTop;
    if (targetTop + colorPickerHeight > window.innerHeight) setColorSelectorTop(window.innerHeight - colorPickerHeight - 5)
    else if (targetTop < 50) setColorSelectorTop(52)
    else setColorSelectorTop(targetTop);
    setShowClrSlctr(!showClrSlctr);
  }

  function colorPickerOnChangeHandle({ rgb }: { rgb: IColor }) {
    setBgColor(rgb);
    setOpacityInputValue(String(Math.floor(Number(rgb.a) * 100)));
  }

  

  return (
    <Container>
      <Topic>Basic</Topic>
      {showClrSlctr &&
        <>
          <ColorPickerWrapper id="colorPicker" top={String(colorSelectorTop)}>
            <ChromePicker color={bgColor} onChange={colorPickerOnChangeHandle} />
          </ColorPickerWrapper>
          <ColorPickerBg onClick={() => setShowClrSlctr(false)} />
        </>
      }
      <SizeGroup1 disable={String(bgColorDisable)}>
        <h4 title="background-color">Bg Color</h4>
        <button disabled={bgColorDisable} title="background-color" onClick={colorOnClickHandle} style={{
          width: 18, height: 18, backgroundColor: convertRGBtoHex(bgColor), opacity: bgColorDisable ? 0.5 : ((Number(bgColor.a) * 100) + "%"), border: "none"
        }} />
        <input disabled={bgColorDisable} type="text" value={convertRGBtoHex(bgColor)} />
        <input onChange={(e) => setOpacityInputValue(e.target.value)} disabled={bgColorDisable} type="text" value={opacityInputValue + "%"} />
        {
          bgColorDisable ?
            <SVG_eye_crossed {...eyeBtnProps} />
            : <SVG_eye {...eyeBtnProps} />
        }
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
const SizeGroup1 = styled.div<{ disable: string }>`
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
    opacity: ${({ disable }: { disable: string }) => disable === "true" ? 0.5 : 1};
    margin-left: 4px;
    width:calc((100% - 60px - 8px - 8px - 20px - 8px) / 2 - 10px);
  }
`
const ColorPickerWrapper = styled.div<{ top: string }>`
  position: fixed;
  right:315px;
  top:${({ top }: { top: string }) => top + "px"};
  z-index: 2;
`
const ColorPickerBg = styled.div`
  position: fixed;
  left:0px;
  top:0px;
  width:100vw;
  height:100vh;
  z-index: 1;
`