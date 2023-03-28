import { useState, MouseEvent, SyntheticEvent, useEffect } from 'react'
import styled from "styled-components"
import { ChromePicker } from 'react-color'
import { IColor } from "../../types/design"
import { rgbToHex, hexToRgb, rgbToRgbStr, rgbStrToRgb } from "../../lib/colorChange"
import { IStylerColor } from '../../lib/useStyler'

export default function ColorPicker({ value, changeStyle, setValue }: IStylerColor) {
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [top, setTop] = useState<number>()
  const defaultRgb = rgbStrToRgb(value)
  const [opacity, setOpacity] = useState(defaultRgb?.a ? String(defaultRgb.a * 100) : "100")

  function handleColorClick(e: MouseEvent) {
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

  function handleColorChange({ rgb }: { rgb: IColor }) {
    if (rgb.a) setOpacity(String(rgb.a * 100))
    changeStyle(rgbToRgbStr(rgb))
  }

  function handleOpacity(e: SyntheticEvent) {
    let opacityValue = (e.target as HTMLInputElement).value
    const rgb = rgbStrToRgb(value)
    if (opacityValue.indexOf('%') > -1) opacityValue = opacityValue.split('%')[0];
    if (!isNaN(Number(opacityValue)) && rgb) {
      changeStyle(rgbToRgbStr({ ...rgb, a: Number(opacityValue) / 100 }))
    }
    else if (rgb?.a) setOpacity(String(Math.floor(rgb.a * 100)));
  }

  function handlecolor(e: SyntheticEvent) {
    let colorValue = (e.target as HTMLInputElement).value
    if (colorValue.indexOf("#") < 0) colorValue = "#" + colorValue;
    const rgb = hexToRgb(colorValue)
    if (rgb) {
      const opacity = rgbStrToRgb(value)?.a
      changeStyle(rgbToRgbStr({ ...rgb, a: opacity ? opacity : 1 }))
    }
    else setValue(rgbToHex(value))
  }

  useEffect(() => {
    const defaultRgb = rgbStrToRgb(value)
    setOpacity(defaultRgb?.a ? String(defaultRgb.a * 100) : "100")
  }, [value])

  return (
    <>
      {isPickerShow &&
        <>
          <ColorPickerWrapper id="colorPicker" top={String(top)}>
            <ChromePicker color={value} onChange={handleColorChange} />
          </ColorPickerWrapper>
          <ColorPickerBg onClick={() => setIsPickerShow(false)} />
        </>
      }
      <SizeGroup1>
        <button
          title="background-color"
          onClick={handleColorClick}
          style={{ backgroundColor: value === "None" ? "#000" : value }}
        />
        <input
          style={{ width: 65, marginRight: 4 }}
          type="text"
          value={rgbToHex(rgbStrToRgb(value))}
          onChange={e => setValue(e.target.value)}
          onBlur={handlecolor}
          onKeyDown={e => { if (e.code === "Enter") handlecolor(e) }}
        />
        <input
          onBlur={handleOpacity}
          onKeyDown={e => { if (e.code === "Enter") handleOpacity(e) }}
          onChange={e => setOpacity(e.target.value)}
          type="text"
          value={opacity.indexOf("%") > -1 ? opacity : opacity + "%"}
          style={{ width: 45 }}
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
    margin-left: 6px;
    height:100%;
  }
  button {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    border: none; 
    cursor: pointer;
  }
`
const ColorPickerWrapper = styled.div<{ top: string }>`
  position: fixed;
  right:315px;
  top:${({ top }: { top: string }) => top + "px"};
  z-index: 2;
  *{
    user-select:none;
  }
`
const ColorPickerBg = styled.div`
  position: fixed;
  left:0px;
  top:0px;
  width:100vw;
  height:100vh;
  z-index: 1;
`