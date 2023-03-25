import { useState } from 'react'
import styled from 'styled-components'
import { useStyler } from '../../../lib/useStyler'
import SVG_expand from "../../../svg/expand.svg"
import { IStylerReturn } from "../../../lib/useStyler"

export default function Size() {
  const width = useStyler("width")
  const height = useStyler("height")

  return (
    <Container>
      <Topic>Size</Topic>
      <SizeGroup1>
        <div>
          <h4 title="width">W</h4>
          <input {...width.input} />
        </div>
        <div>
          <h4 title="height">H</h4>
          <input {...height.input} />
        </div>
      </SizeGroup1>
      <ExpandSize text={"Out M"} value={"margin"} />
      <ExpandSize text={"In M"} value={"padding"} />
    </Container>
  )
}

function ExpandSize({ text, value }: { text: string, value: string }) {
  const [expand, setExpand] = useState(false)
  const total = useStyler(value)

  const part: { [key: string]: IStylerReturn } = {
    top: useStyler(value + "Top"),
    right: useStyler(value + "Right"),
    bottom: useStyler(value + "Bottom"),
    left: useStyler(value + "Left"),
  }

  const useExpand = (loc: "top" | "right" | "bottom" | "left") => {
    const onKeyDown = ({ code }: { code: string }) => {
      part[loc].input.onKeyDown({ code });
      total.setValue(total.getStyle())
    }
    const onBlur = () => {
      part[loc].input.onBlur()
      total.setValue(total.getStyle())
    }
    return { ...part[loc].input, onKeyDown, onBlur }
  }

  const partObject = {
    Top: useExpand("top"),
    Right: useExpand("right"),
    Bottom: useExpand("bottom"),
    Left: useExpand("left"),
  }

  const NotExpandProps = () => {
    function onKeyDown({ code }: { code: string }) {
      total.input.onKeyDown({ code });
      Object.keys(part).forEach((v: string) => part[v].setValue(part[v].getStyle()))
    }
    function onBlur() {
      total.input.onBlur();
      Object.keys(part).forEach((v: string) => part[v].setValue(part[v].getStyle()))
    }
    return { ...total.input, onKeyDown, onBlur, disabled: expand }
  }

  return (
    <SizeGroup2>
      <SizeGroup3 state={String(expand)}>
        <h4>{text}</h4>
        <input {...NotExpandProps()} />
        <SVG_expand onClick={() => setExpand(!expand)} fill="#363636" width={16} height={16} style={{ cursor: "pointer", marginLeft: 4 }} />
      </SizeGroup3>
      {
        expand ?
          <ExpandInput>
            {
              Object.keys(partObject).map((loc, key) => (
                <div key={key}>
                  <h4 title={`${value}-${loc}`}>{loc[0]}</h4>
                  <input {...partObject[loc as "Top" | "Right" | "Bottom" | "Left"]} />
                </div>
              ))
            }
          </ExpandInput>
          : null
      }
    </SizeGroup2>
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
  justify-content: space-between;
  margin: 12px 0px;
  div{
    margin: -6px -8px;
    padding: 6px 8px;
    &:hover{
      box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
    }
    display: flex;
    align-items: center;
    width:calc(50% - 8px);
    h4{
      margin-right: 8px;
      padding: 4px;
      opacity: 0.7;
    }
    input{
      width:100%;
    }
  }
`
const SizeGroup2 = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 6px -8px;
  padding: 6px 8px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
`
const SizeGroup3 = styled.div < { state: string } > `
  display:flex;
  align-items: center;
  h4{
    width:40px;
    opacity: 0.7;
    margin-right: 8px;
    padding: 4px;
  }
  input{
    flex-grow:1;
    opacity:${({ state }: { state: string }) => state === "true" ? 0.5 : 1};
  }
  
`
const ExpandInput = styled.div`
  display:flex;
  align-items: center;
  margin-top: 8px;
  div{
    width:calc(100% / 4);
    display:flex;
    align-items: center;
    h4{
      padding:4px;
      margin-right: 8px;
      opacity: 0.7;
    }
    input{
      width:100%;
    }
  }
`