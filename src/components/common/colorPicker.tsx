import { useState, MouseEvent, Dispatch, SetStateAction, ChangeEvent, SyntheticEvent } from 'react'
import styled from "styled-components"
import { ChromePicker } from 'react-color'
import SVG_eye from "../../svg/eye.svg"
import SVG_eye_crossed from "../../svg/eye_crossed.svg"
import { IColor } from "../../types/design"

interface IProps {
  color: IColor;
  setColor: Dispatch<SetStateAction<IColor>>;
}

export default function ColorPicker({ color, setColor }: IProps) {
  const [colorDisable, setColorDisable] = useState(color.none)
  const [isPickerShow, setIsPickerShow] = useState(false)
  const [top, setTop] = useState<number>()
  const [opacity, setOpacity] = useState(String(Number(color.a) * 100))
  const eyeBtnProps = { onClick: () => { setColor({ ...color, none: !colorDisable }); setColorDisable(!colorDisable); }, fill: "#363636", width: 20, height: 20, style: { padding: 4, cursor: "pointer" } }

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
    if (targetTop + colorPickerHeight > window.innerHeight) setTop(window.innerHeight - colorPickerHeight - 5)
    else if (targetTop < 50) setTop(52)
    else setTop(targetTop);
    setIsPickerShow(!isPickerShow);
  }

  function colorPickerOnChangeHandle({ rgb }: { rgb: IColor }) {
    // ! rgb값을 변경할때 타입에 안맞춰 문자에서 숫자로 변경되고 none이 사라짐
    setColor(rgb);
    setOpacity(String(Math.floor(Number(rgb.a) * 100)));
  }

  function opacityHandle(e: SyntheticEvent) {
    let opacity = (e.target as HTMLInputElement).value
    if (opacity.indexOf('%') > -1) opacity = opacity.split('%')[0];
    if (!isNaN(Number(opacity))) setColor({ ...color, a: String(Number(opacity) / 100) });
    else setOpacity(String(Number(color.a) * 100));
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
      <SizeGroup1 disable={String(colorDisable)}>
        <h4 title="background-color">Bg Color</h4>
        <button disabled={colorDisable} title="background-color" onClick={colorOnClickHandle} style={{ backgroundColor: convertRGBtoHex(color), opacity: colorDisable ? 0.5 : ((Number(color.a) * 100) + "%") }} />
        <input disabled={colorDisable} type="text" value={convertRGBtoHex(color)} />
        <input onBlur={opacityHandle} onKeyDown={(e) => { if (e.code === "Enter") opacityHandle(e) }} onChange={(e) => setOpacity(e.target.value)} disabled={colorDisable} type="text" value={opacity.indexOf("%") > -1 ? opacity : opacity + "%"} />
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