import { useState } from 'react'
import styled from 'styled-components'
import SVG_expand from "../../../svg/expand.svg"

export default function Size() {
  const [marginExpand, setMarginExpand] = useState(false)
  const [paddingExpand, setPaddingExpand] = useState(false)

  return (
    <Container>
      <Topic>Size</Topic>
      <SizeGroup1>
        <div>
          <h4>W</h4>
          <input type="text" />
        </div>
        <div>
          <h4>H</h4>
          <input type="text" value={"300px"} />
        </div>
      </SizeGroup1>
      <SizeGroup2 state={String(marginExpand)}>
        <div>
          <h4>Margin</h4>
          {
            marginExpand ? (
              <>
                <input type="text" value={"0px"} />
                <input type="text" value={"0px"} />
                <input type="text" value={"0px"} />
                <input type="text" value={"0px"} />
              </>
            ) : <input type="text" value={"0px"} />
          }
        </div>
        <SVG_expand onClick={() => setMarginExpand(!marginExpand)} fill="#363636" width={16} height={16} style={{ cursor: "pointer" }} />
      </SizeGroup2>
      <SizeGroup2 state={String(paddingExpand)}>
        <div>
          <h4>Padding</h4>
          {
            paddingExpand ? (
              <>
                <input type="text" value={"0px"} />
                <input type="text" value={"0px"} />
                <input type="text" value={"0px"} />
                <input type="text" value={"0px"} />
              </>
            ) : <input type="text" value={"0px"} />
          }
        </div>
        <SVG_expand onClick={() => setPaddingExpand(!paddingExpand)} fill="#363636" width={16} height={16} style={{ cursor: "pointer" }} />
      </SizeGroup2>
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
  margin: 28px 0px;
`
const SizeGroup1 = styled.div`
  display:flex;
  justify-content: space-between;
  margin: 13px 0px;
  div{
    display: flex;
    align-items: center;
    width:calc(50% - 10px);
    margin-right: 10px;
    h4{
      margin-right: 12px;
      color:#363636;
      opacity: 0.7;
    }
    input{
      width:100%;
      border: none;
    }
  }
`
const SizeGroup2 = styled.div < { state: string } > `
  display:flex;
  align-items: center;
  justify-content: space-between;
  margin: 13px 0px;
  div{
    width:${({ state }: { state: string }) => state === "true" ? "calc(100% - 16px)" : "auto"};
    display:flex;
    align-items: center;
    h4{
      width:66px;
      color:#363636;
      opacity: 0.7;
      margin-right: 8px;
    }
    input{
      width:${({ state }: { state: string }) => state === "true" ? "calc(((100% - 66px - 16px) / 4) - 8px)" : "calc(((100% - 66px) / 4) - 8px)"};
      border: none;
    }
  }
`