import { useEffect } from "react";
import styled from "styled-components"

const attributes: { [key: string]: string[] } = {
  input: ["type", "placeholder"],
  img: ["src", "alt"],
  a: ["href", "target"],
}

export default function Property({ selectComp }: { selectComp: HTMLElement }) {
  const tagName = selectComp.tagName.toLocaleLowerCase();
  return (
    <Container>
      <Topic>Property</Topic>
      <SizeGroup3>
        <h4>Tag</h4>
        <input value={tagName} />
      </SizeGroup3>
      <SizeGroup3>
        <h4>Name</h4>
        <input value={selectComp.classList[selectComp.classList.length - 2]} />
      </SizeGroup3>
      <SizeGroup3>
        <h4>ID</h4>
        <h3>{selectComp.classList[selectComp.classList.length - 1]}</h3>
      </SizeGroup3>
      {
        tagName in attributes ? attributes[tagName].map((value, key) => (
          <SizeGroup3 key={key}>
            <h4>{value === "placeholder" ? "Hint" : value}</h4>
            <input
              onChange={(e) => {
                selectComp.setAttribute(value, e.target.value)
                e.target.value = selectComp.getAttribute(value) || "" 
              }}
            />
          </SizeGroup3>
        )) : null
      }
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