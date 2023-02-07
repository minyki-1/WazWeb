import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import SVG_expand from "../../../svg/expand.svg"

export default function Size() {
  const [width, setWidth] = useState("0px")
  const [height, setHeight] = useState("0px")
  // const [margin, setMargin] = useState("0px")
  // const [padding, setPadding] = useState("0px")

  return (
    <Container>
      <Topic>Size</Topic>
      <SizeGroup1>
        <div>
          <h4 title="width">W</h4>
          <input type="text" value={width} onChange={e => setWidth(e.target.value)} />
        </div>
        <div>
          <h4 title="height">H</h4>
          <input type="text" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
      </SizeGroup1>
      <ExpandSize text={"Margin"} />
      <ExpandSize text={"Padding"} />
    </Container>
  )
}

function ExpandSize({ text }: { text: string }) {
  const [expand, setExpand] = useState(false)
  const [total, setTotal] = useState("0px")
  const [partValue, setPartValue] = useState({ top: "0px", right: "0px", bottom: "0px", left: "0px" })

  const useExpand = (location: "top" | "right" | "bottom" | "left") => {
    function onChange(e: ChangeEvent) {
      setPartValue({ ...partValue, [location]: (e.target as HTMLInputElement).value })
    }
    return { type: "text", value: partValue[location], onChange }
  }

  const top = useExpand("top")
  const right = useExpand("right")
  const bottom = useExpand("bottom")
  const left = useExpand("left")

  return (
    <SizeGroup2>
      <SizeGroup3 state={String(expand)}>
        <div>
          <h4>{text}</h4>
          <input
            disabled={expand}
            type="text"
            value={total}
            onChange={({ target }) => setTotal(target.value)} />
        </div>
        <SVG_expand onClick={() => setExpand(!expand)} fill="#363636" width={16} height={16} style={{ cursor: "pointer" }} />
      </SizeGroup3>
      {
        expand ?
          <ExpandInput>
            <div>
              <h4 title={`${text.toLowerCase()}-top`}>T</h4>
              <input {...top} />
            </div>
            <div>
              <h4 title={`${text.toLowerCase()}-right`}>R</h4>
              <input {...right} />
            </div>
            <div>
              <h4 title={`${text.toLowerCase()}-bottom`}>B</h4>
              <input {...bottom} />
            </div>
            <div>
              <h4 title={`${text.toLowerCase()}-left`}>L</h4>
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
  justify-content: space-between;
  div{
    display:flex;
    h4{
      width:60px;
      opacity: 0.7;
      margin-right: 4px;
      padding: 4px;
    }
    input{
      width:50%;
      opacity:${({ state }: { state: string }) => state === "true" ? 0.5 : 1};
    }
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