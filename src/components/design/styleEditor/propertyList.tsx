import { useEffect, useState } from "react";
import styled from "styled-components"
import Property from "./property";
import { useStore } from "../../../zustand/store";
import { getCompUID } from "../../../lib/randomString";
import { classStyler } from "../../../lib/classStyler";

const attributes: { [key: string]: string[] } = {
  input: ["type", "placeholder"],
  img: ["src", "alt"],
  a: ["href", "target"],
}

export default function PropertyList() {
  const { selectComp } = useStore();
  const [id, setId] = useState(selectComp?.classList[1]);
  const [tagName, setTagName] = useState(selectComp?.tagName.toLocaleLowerCase());
  const [compName, setCompName] = useState(selectComp?.classList[0])
  const handleClickIdChange = () => {
    if (!selectComp || !id) return;
    const uid = getCompUID(6, selectComp.ownerDocument)
    const styleComp = selectComp.ownerDocument.getElementById("compyDesign")
    const styleSheet = selectComp.ownerDocument.styleSheets[0]
    const { selector } = classStyler(id, "width", styleSheet)
    const styleText = selector?.cssText?.replace(new RegExp(id, 'g'), uid)
    selectComp.className = selectComp.classList[0] + " " + uid
    if (!styleComp || !styleText) return
    styleComp.textContent += styleText
    setId(uid)
  }
  useEffect(() => {
    setId(selectComp?.classList[1])
    setTagName(selectComp?.tagName.toLocaleLowerCase())
    setCompName(selectComp?.classList[0])
  }, [selectComp])
  return (
    <Container>
      {
        selectComp &&
        <>
          <Topic>Property</Topic>
          <SizeGroup3>
            <h4>Tag</h4>
            <input value={tagName} onChange={(e) => { }} />
          </SizeGroup3>
          <SizeGroup3>
            <h4>Name</h4>
            <input value={compName} onChange={(e) => { }} />
          </SizeGroup3>
          <SizeGroup3>
            <h4>ID</h4>
            <h3>{id}</h3>
            <button
              onClick={handleClickIdChange}
              title="ID change assigns a new random ID to separate styles"
            >ID Change</button>
          </SizeGroup3>
          {
            (tagName && tagName in attributes) ? attributes[tagName].map((value, key) => (
              <Property attName={value} key={key} />
            )) : null
          }
        </>
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
  h3{
    flex:1;
  }
  input{
    flex-grow:1;
    opacity:${({ state }: { state: string }) => state === "true" ? 0.5 : 1};
  }
  button{
    border:1.5px solid #858585;
    cursor:pointer;
    font-size:13px;
    padding:4px 8px;
    border-radius:4px;
  }
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
`