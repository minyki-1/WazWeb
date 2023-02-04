import { useState, MouseEvent, Dispatch, SetStateAction, ChangeEvent, SyntheticEvent } from 'react'
import styled from "styled-components"
import { ChromePicker } from 'react-color'
import SVG_eye from "../../svg/eye.svg"
import SVG_eye_crossed from "../../svg/eye_crossed.svg"
import { IColor } from "../../types/design"

interface IProps {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
  disable: boolean;
}

export default function ColorPicker({ color, setColor, disable }: IProps) {
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [top, setTop] = useState<number>()

  function colorToHex(color: number) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

  function convertRGBtoHex({ r, g, b }: IColor) {
    return "#" + colorToHex(r) + colorToHex(g) + colorToHex(b);
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
    setIsPickerShow(!isPickerShow);
  }

  function colorPickerOnChangeHandle({ rgb }: { rgb: IColor }) {
    setColor({ ...rgb });
  }

  return (
    <>
      {isPickerShow &&
        <>
          <ColorPickerWrapper id="colorPicker" top={String(top)}>
            <ChromePicker color={color} onChange={colorPickerOnChangeHandle} />
          </ColorPickerWrapper>
          <ColorPickerBg onClick={() => setIsPickerShow(false)} />
        </>
      }
      <SizeGroup1 disable={String(disable)}>
        <button disabled={disable} title="background-color" onClick={colorOnClickHandle} style={{ backgroundColor: convertRGBtoHex(color), opacity: color.a }} />
        <input disabled={disable} type="text" value={convertRGBtoHex(color)} />
      </SizeGroup1>
    </>
  )
}

const SizeGroup1 = styled.div<{ disable: string }>`
  display: flex;
  align-items: center;
  width:90px;
  input{
    opacity: ${({ disable }: { disable: string }) => disable === "true" ? 0.5 : 1};
    margin-left: 4px;
    height:100%;
    width:calc(100% - 18px);
  }
  button {
    width: 18px;
    height: 18px;
    border: none; 
    cursor: pointer;
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