import { useState } from 'react'
import styled from "styled-components"
import { IColor } from "../../../types/design"
import ColorPicker from '../../common/colorPicker'
import { useStyler } from '../../../lib/useStyler'
import { useStore } from '../../../zustand/store'

export default function Basic() {
  const [bgColor, setBgColor] = useState<IColor>({ r: 0, g: 0, b: 0, a: 1 })
  const [borderColor, setBorderColor] = useState<IColor>({ r: 0, g: 0, b: 0, a: 1 })
  const [shadowColor, setShadowColor] = useState<IColor>({ r: 0, g: 0, b: 0, a: 1 })
  const [shadow, setShadow] = useState({ x: "0", y: "0", blur: "0" })
  const { selectComp } = useStore()

  const borderSize = useStyler("borderSize", "None")
  const borderStyle = useStyler("borderStyle", "None")
  const borderRadius = useStyler("borderRadius", "None")

  // const bgColor = useStyler("background-color", "None")

  const changeBgColor = (color: IColor) => {
    if (!selectComp) return;
    const { r, g, b, a } = color
    selectComp.style.backgroundColor = `rgba(${r},${g},${b},${a})`
    setBgColor(color)
  }

  const shadowInputProps = (value: "x" | "y" | "blur") => ({
    onChange: (({ target }: { target: HTMLInputElement }) => setShadow({ ...shadow, [value]: target.value })),
    value: shadow[value],
    type: "text"
  })

  return (
    <Container>
      <Topic>Basic</Topic>
      <SizeGroup1>
        <h4 title="background-color">Bg Color</h4>
        <span>
          <ColorPicker styleName="background-color" color={bgColor} setColor={changeBgColor} />
        </span>
      </SizeGroup1>
      <SizeGroup2>
        <BorderWrapper>
          <h4 title="border">Border</h4>
          <input {...borderSize.input} type='text' />
          <select {...borderStyle.select}>
            <option value="solid">Solid</option>
            <option value="none">None</option>
            <option value="dotted">Dotted</option>
            <option value="inset">Inset</option>
            <option value="dashed">Dashed</option>
            <option value="double">Double</option>
            <option value="groove">Groove</option>
            <option value="outset">Outset</option>
          </select>
        </BorderWrapper>
        <span>
          <ColorPicker styleName="border-color" color={borderColor} setColor={setBorderColor} />
        </span>
      </SizeGroup2>
      <SizeGroup3>
        <h4>Corner</h4>
        <input {...borderRadius.input} type="text" />
      </SizeGroup3>
      <SizeGroup4>
        <ShadowWrapper>
          <h4 title="box-shadow">Shadow</h4>
          <div>
            <h4 title="x">X</h4>
            <input {...shadowInputProps("x")} />
          </div>
          <div>
            <h4 title="y">Y</h4>
            <input {...shadowInputProps("y")} />
          </div>
          <div>
            <h4 title="blur">B</h4>
            <input {...shadowInputProps("blur")} />
          </div>
        </ShadowWrapper>
        <span>
          {/* <ColorPicker color={shadowColor} setColor={setShadowColor} /> */}
        </span>
      </SizeGroup4>
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
  justify-content: space-between;
  height:24px;
  margin: 12px -8px;
  padding: 6px 8px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  h4{
    width:60px;
    opacity: 0.7;
    margin-right: 4px;
    padding: 4px;
  }
  span{
    display:flex;
    align-items: center;
    justify-content: space-between;
    width:calc(100% - 72px);
  }
`
const SizeGroup2 = styled.div`
  display:flex;
  flex-direction: column;
  margin: 12px -8px;
  padding: 6px 8px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  span{
    display:flex;
    align-items: center;
    margin-left: 74px;
  }
`
const BorderWrapper = styled.div`
  margin-bottom: 12px;
  display:flex;
  h4{
    width:60px;
    opacity: 0.7;
    margin-right: 4px;
    padding: 4px;
  }
  input{
    width:calc((100% - 96px) / 2);
    margin-right: 10px;
  }
  select{
    width:calc((100% - 96px) / 2);
    padding: 4px 0px;
    margin: -4px 0px;
    margin-right: 10px;
  }
`
const SizeGroup3 = styled.div`
  display:flex;
  align-items: center;
  margin: 12px -8px;
  padding: 6px 8px;
  height:24px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  h4{
    width:60px;
    opacity: 0.7;
    margin-right: 4px;
    padding: 4px;
  }
  input{
    width:calc(100% - 96px);
  }
`
const SizeGroup4 = styled.div`
  display:flex;
  flex-direction: column;
  margin: 12px -8px;
  padding: 6px 8px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  span{
    display:flex;
    align-items: center;
    margin-left: 74px;
  }
`
const ShadowWrapper = styled.div`
  margin-bottom: 12px;
  display:flex;
  align-items: flex-start;
  h4{
    width:60px;
    opacity: 0.7;
    margin-right: 4px;
    padding: 4px;
  }
  div{
    display:flex;
    width:calc((100% - 72px) / 3);
    h4{
      width:auto;
      margin-right: 6px;
    }
  }
`