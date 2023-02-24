import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStyler } from '../../../lib/useStyler'
import SVG_expand from "../../../svg/expand.svg"
import { useStore } from '../../../zustand/store'

export default function Size() {
  const [width, setWidth] = useState("0px")
  const [height, setHeight] = useState("0px")
  const { selectComp } = useStore()

  useEffect(() => {
    if (!selectComp) return;
    const { width, height } = selectComp.style
    setWidth(width ? width : "None")
    setHeight(height ? height : "None")
  }, [selectComp])

  const widthEnterHandle = () => {
    if (!selectComp) return;
    const before = selectComp.style.width
    selectComp.style.width = width
    if (before === selectComp.style.width) setWidth(before ? before : "None");
  }

  return (
    <Container>
      <Topic>Size</Topic>
      <SizeGroup1>
        <div>
          <h4 title="width">W</h4>
          <input
            type="text"
            value={width}
            onChange={e => setWidth(e.target.value)}
            onKeyDown={e => e.code === "Enter" ? widthEnterHandle() : null}
            onBlur={widthEnterHandle}
          />
        </div>
        <div>
          <h4 title="height">H</h4>
          <input
            type="text"
            value={height}
            onChange={e => setHeight(e.target.value)} />
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

  const part = {
    top: useStyler(value + "Top"),
    right: useStyler(value + "Right"),
    bottom: useStyler(value + "Bottom"),
    left: useStyler(value + "Left"),
  }

  const useExpand = (loc: "top" | "right" | "bottom" | "left") => {
    const onKeyDown = ({ code }: { code: string }) => {
      part[loc].props.onKeyDown({ code });
      total.setValue(total.getCompStyle())
    }
    const onBlur = () => {
      part[loc].props.onBlur()
      total.setValue(total.getCompStyle())
    }
    return { ...part[loc].props, onKeyDown, onBlur }
  }

  const top = useExpand("top")
  const right = useExpand("right")
  const bottom = useExpand("bottom")
  const left = useExpand("left")

  return (
    <SizeGroup2>
      <SizeGroup3 state={String(expand)}>
        <h4>{text}</h4>
        <input
          disabled={expand}
          type="text"
          {...total.props}
          onKeyDown={({ code }) => {
            total.props.onKeyDown({ code });
            part.top.setValue(part.top.getCompStyle())
            part.bottom.setValue(part.bottom.getCompStyle())
            part.left.setValue(part.left.getCompStyle())
            part.right.setValue(part.right.getCompStyle())
          }}
          onBlur={() => {
            total.props.onBlur();
            part.top.setValue(part.top.getCompStyle())
            part.bottom.setValue(part.bottom.getCompStyle())
            part.left.setValue(part.left.getCompStyle())
            part.right.setValue(part.right.getCompStyle())
          }}
        />
        <SVG_expand onClick={() => setExpand(!expand)} fill="#363636" width={16} height={16} style={{ cursor: "pointer", marginLeft: 4 }} />
      </SizeGroup3>
      {
        expand ?
          <ExpandInput>
            <div>
              <h4 title={`${value}-top`}>T</h4>
              <input {...top} />
            </div>
            <div>
              <h4 title={`${value}-right`}>R</h4>
              <input {...right} />
            </div>
            <div>
              <h4 title={`${value}-bottom`}>B</h4>
              <input {...bottom} />
            </div>
            <div>
              <h4 title={`${value}-left`}>L</h4>
              <input {...left} />
            </div>
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