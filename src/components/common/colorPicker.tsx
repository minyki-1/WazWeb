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
  const [opacity, setOpacity] = useState(String(color.a * 100))
  const [colorInput, setColorInput] = useState<string>()

  function colorToHex(color: number) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

  function convertRGBtoHex({ r, g, b }: IColor) {
    return "#" + colorToHex(r) + colorToHex(g) + colorToHex(b);
  }

  function convertHexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
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
    setColor(rgb);
    setColorInput(convertRGBtoHex(rgb));
  }

  function opacityHandle(e: SyntheticEvent) {
    let opacityValue = (e.target as HTMLInputElement).value
    if (opacityValue.indexOf('%') > -1) opacityValue = opacityValue.split('%')[0];
    if (!isNaN(Number(opacityValue))) setColor({ ...color, a: Number(opacityValue) / 100 });
    else setOpacity(String(Math.floor(color.a * 100)));
  }

  function colorHandle(e: SyntheticEvent) {
    let colorValue = (e.target as HTMLInputElement).value
    if (colorValue.indexOf("#") < 0) colorValue = "#" + colorValue;
    const rgb = convertHexToRgb(colorValue)
    if (rgb) { setColor({ ...rgb, a: color.a }); setColorInput(colorValue); }
    else setColorInput(convertRGBtoHex(color))
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
        <input
          style={{ width: 65, marginRight: 4 }}
          disabled={disable}
          type="text"
          value={colorInput}
          onChange={e => setColorInput(e.target.value)}
          onBlur={colorHandle}
          onKeyDown={e => { if (e.code === "Enter") colorHandle(e) }}
        />
        <input
          onBlur={opacityHandle}
          onKeyDown={e => { if (e.code === "Enter") opacityHandle(e) }}
          onChange={e => setOpacity(e.target.value)}
          disabled={disable}
          type="text"
          value={opacity.indexOf("%") > -1 ? opacity : opacity + "%"}
          style={{ width: 45, opacity: `${disable === true ? 0.5 : 1}` }}
        />
      </SizeGroup1>
    </>
  )
}

const SizeGroup1 = styled.div<{ disable: string }>`
  display: flex;
  align-items: center;
  width:150px;
  input{
    opacity: ${({ disable }: { disable: string }) => disable === "true" ? 0.5 : 1};
    margin-left: 4px;
    height:100%;
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