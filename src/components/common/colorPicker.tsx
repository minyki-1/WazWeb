import { useState, MouseEvent, SyntheticEvent, useEffect } from 'react'
import styled from "styled-components"
import { ChromePicker } from 'react-color'
import { IColor } from "../../types/design"
import { rgbToHex, hexToRgb, rgbToRgbStr, rgbStrToRgb } from "../../lib/colorChange"
import { IStylerColor } from '../../lib/useStyler'
import { namedColor } from '../design/widgetStyle'

export default function ColorPicker({ value, changeStyle, getStyle }: IStylerColor) {
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [top, setTop] = useState<number>()
  const defaultRgb = rgbStrToRgb(value)
  const [opacity, setOpacity] = useState(defaultRgb?.a ?? 1)
  const [inputValue, setInputValue] = useState(rgbToHex(rgbStrToRgb(value)))

  function handleColorClick(e: MouseEvent) {
    // * ChromePicker(color selector) height = 241.75px
    const colorPicker = document.getElementById("colorPicker")
    const colorPickerHeight = colorPicker?.offsetHeight || 250
    const rightSideBar = document.getElementById("rightSideBar")
    const scrollTop = rightSideBar?.scrollTop ?? 0
    const targetTop = (e.target as HTMLElement).offsetTop - 100 - scrollTop;
    if (targetTop + colorPickerHeight > window.innerHeight) setTop(window.innerHeight - colorPickerHeight - 5)
    else if (targetTop < 50) setTop(52)
    else setTop(targetTop);
    setIsPickerShow(!isPickerShow);
  }

  function handleColorChange({ rgb }: { rgb: IColor }) {
    if (rgb.a) setOpacity(rgb.a)
    changeStyle(rgbToRgbStr(rgb))
    setInputValue(rgbToHex(rgb))
  }

  function handleOpacity() {
    const rgb = rgbStrToRgb(value)
    if (!rgb) return;
    if (opacity <= 100 && opacity >= 0) changeStyle(rgbToRgbStr({ ...rgb, a: opacity }))
    else if (rgb.a) setOpacity(rgb.a)
  }

  function handleColor(e: SyntheticEvent) {
    let colorValue = (e.target as HTMLInputElement).value
    if (colorValue.toLowerCase() in namedColor) colorValue = namedColor[colorValue.toLowerCase()]
    const rgb = hexToRgb(colorValue)
    if (rgb) changeStyle(rgbToRgbStr({ ...rgb, a: opacity }))
    else setInputValue(rgbToHex(rgbStrToRgb(getStyle())))
  }

  useEffect(() => {
    const defaultRgb = rgbStrToRgb(value)
    setOpacity(defaultRgb?.a ?? 1)
    setInputValue(value in namedColor ? namedColor[value].toUpperCase() : rgbToHex(rgbStrToRgb(value)))
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
          style={{ backgroundColor: inputValue, opacity }}
        />
        <input
          style={{ width: 65, marginRight: 4 }}
          type="text"
          value={inputValue}
          onChange={e => { setInputValue(e.target.value) }}
          onBlur={handleColor}
          onKeyDown={e => { if (e.code === "Enter") handleColor(e) }}
        />
        <input
          onBlur={handleOpacity}
          onKeyDown={e => { if (e.code === "Enter") handleOpacity() }}
          type="text"
          onChange={e => {
            const opacity = Number(e.target.value.split("%")[0]) / 100
            if (!isNaN(opacity) && opacity <= 100 && opacity >= 0) setOpacity(opacity)
          }}
          value={String(opacity * 100) + "%"}
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