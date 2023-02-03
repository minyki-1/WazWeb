import { useState, MouseEvent, Dispatch, SetStateAction } from 'react'
import styled from "styled-components"
import { ChromePicker } from 'react-color'
import SVG_eye from "../../svg/eye.svg"
import SVG_eye_crossed from "../../svg/eye_crossed.svg"
import { TColor } from "../../types/design"

interface IProps {
  color: TColor;
  setColor: Dispatch<SetStateAction<TColor>>;
}

export default function ColorPicker({ color, setColor }: IProps) {
  // const [color, setColor] = useState<TColor>({ r: "0", g: "0", b: "0", a: "1" })
  const [colorDisable, setColorDisable] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [top, setTop] = useState<number>()
  const [opacity, setOpacity] = useState("100")
  const eyeBtnProps = { onClick: () => setColorDisable(!colorDisable), fill: "#363636", width: 20, height: 20, style: { padding: 4, cursor: "pointer" } }

  function colorToHex(color: number) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

  function convertRGBtoHex({ r, g, b }: TColor) {
    return "#" + colorToHex(Number(r)) + colorToHex(Number(g)) + colorToHex(Number(b));
  }

  function colorOnClickHandle(e: MouseEvent) {
    // * ChromePicker(color selector) height = 241.75px
    const colorPicker = document.getElementById("colorPicker")
    const colorPickerHeight = colorPicker?.offsetHeight || 250
    const rightSideBar = document.getElementById("rightSideBar")
    const scrollTop = rightSideBar?.scrollTop ? rightSideBar?.scrollTop : 0
    const targetTop = (e.target as HTMLElement).offsetTop - 100 - scrollTop;
    if (targetTop + colorPickerHeight > window.innerHeight) setTop(window.innerHeight - colorPickerHeight - 5)
    else if (targetTop < 50) setTop(52)
    else setTop(targetTop);
    setIsShow(!isShow);
  }

  function colorPickerOnChangeHandle({ rgb }: { rgb: TColor }) {
    setColor(rgb);
    setOpacity(String(Math.floor(Number(rgb.a) * 100)));
  }

  return (
    <>
      {isShow &&
        <>
          <ColorPickerWrapper id="colorPicker" top={String(top)}>
            <ChromePicker color={color} onChange={colorPickerOnChangeHandle} />
          </ColorPickerWrapper>
          <ColorPickerBg onClick={() => setIsShow(false)} />
        </>
      }
      <SizeGroup1 disable={String(colorDisable)}>
        <h4 title="background-color">Bg Color</h4>
        <button disabled={colorDisable} title="background-color" onClick={colorOnClickHandle} style={{
          width: 18, height: 18, backgroundColor: convertRGBtoHex(color), opacity: colorDisable ? 0.5 : ((Number(color.a) * 100) + "%"), border: "none"
        }} />
        <input disabled={colorDisable} type="text" value={convertRGBtoHex(color)} />
        <input onChange={(e) => setOpacity(e.target.value)} disabled={colorDisable} type="text" value={opacity + "%"} />
        {
          colorDisable ?
            <SVG_eye_crossed {...eyeBtnProps} />
            : <SVG_eye {...eyeBtnProps} />
        }
      </SizeGroup1>
    </>
  )
}

const SizeGroup1 = styled.div<{ disable: string }>`
  display: flex;
  align-items: center;
  height:22px;
  margin: 6px -8px;
  padding: 6px 8px;
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
    opacity: ${({ disable }: { disable: string }) => disable === "true" ? 0.5 : 1};
    margin-left: 4px;
    height:100%;
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