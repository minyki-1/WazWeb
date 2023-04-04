import { useEffect, useState } from "react";
import styled from "styled-components"



export default function Property({ attName, selectComp }: { attName: string, selectComp: HTMLElement }) {
  const [value, setValue] = useState(selectComp.getAttribute(attName))
  return (
    <SizeGroup3>
      <h4>{attName === "placeholder" ? "Hint" : attName}</h4>
      <input
        onChange={(e) => {
          selectComp.setAttribute(attName, e.target.value)
          e.target.value = selectComp.getAttribute(attName) || ""
        }}
      />
    </SizeGroup3>
  )
}


const SizeGroup3 = styled.div < { state: string } > `
  display:flex;
  align-items: center;
  margin: 6px -8px;
  padding: 6px 8px;
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