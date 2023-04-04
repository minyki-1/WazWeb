import { useEffect, useState } from "react";
import styled from "styled-components"
import { useStore } from "../../../zustand/store";



export default function Property({ attName }: { attName: string }) {
  const { selectComp } = useStore();
  const [value, setValue] = useState(selectComp?.getAttribute(attName))
  return (
    <SizeGroup3>
      <h4>{attName === "placeholder" ? "Hint" : attName}</h4>
      {
        selectComp &&
        <input
          value={(value && value === "") ? value : "None"}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onBlur={() => {
            if (!value) return;
            selectComp.setAttribute(attName, value)
            setValue(selectComp.getAttribute(attName) || "")
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" && value) {
              selectComp.setAttribute(attName, value)
              setValue(selectComp.getAttribute(attName) || "")
            }
          }}
        />
      }
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