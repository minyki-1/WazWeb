import { ChangeEvent, useEffect, useState } from "react";
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

const relatedTags = {
  text: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "strong", "em", "li", "option"],
  box: ["div", "span", "table"],
  image: ["img"],
  button: ["button", "form"],
  control: ["input", "textarea", "select"],
  semantic: ["header", "nav", "main", "article", "aside", "section", "footer"]
}

export default function PropertyList() {
  const { selectComp, setSelectComp } = useStore();
  const [id, setId] = useState(selectComp?.classList[1]);
  const [tagName, setTagName] = useState(selectComp?.tagName.toLocaleLowerCase());
  const [compName, setCompName] = useState(selectComp?.classList[0])
  const handleClickIdChange = () => {
    if (!selectComp || !id) return;
    const uid = getCompUID(6, selectComp.ownerDocument)
    const styleComp = selectComp.ownerDocument.getElementById("WazWeb")
    const styleSheet = Object.values(selectComp.ownerDocument.styleSheets).find((value) => (value.ownerNode as HTMLElement | null)?.id === "WazWeb")
    if (!styleSheet) return;
    const { selector } = classStyler(id, "width", styleSheet)
    const styleText = selector?.cssText?.replace(new RegExp(id, 'g'), uid)
    if (!styleComp || !styleText) return
    selectComp.className = selectComp.classList[0] + " " + uid
    styleComp.textContent += styleText
    setId(uid)
  }
  const handleChangeTag = ({ target }: { target: HTMLSelectElement }) => {
    if (!selectComp) return;
    const newElem = selectComp.ownerDocument.createElement(target.value);
    newElem.innerHTML = selectComp.innerHTML;
    newElem.className = selectComp.className;
    selectComp.parentNode?.replaceChild(newElem, selectComp);
    setSelectComp(newElem);
    setTagName(target.value)
  }
  useEffect(() => {
    setId(selectComp?.classList[1])
    setTagName(selectComp?.tagName.toLowerCase())
    setCompName(selectComp?.classList[0])
  }, [selectComp])
  return (
    <Container>
      {
        selectComp && tagName &&
        <>
          <Topic>Property</Topic>
          <SizeGroup3>
            <h4>Tag</h4>
            <select value={tagName} onChange={handleChangeTag} >
              {
                Object.values(relatedTags).find(tag => tag.includes(tagName.toLowerCase()))?.map((value, key) => (
                  <option value={value} key={key}>{value}</option>
                ))
              }
            </select>
          </SizeGroup3>
          <SizeGroup3>
            <h4>Name</h4>
            <input value={compName}
              onChange={(e) => {
                if (e.target.value.length < 1 || !isNaN(Number(e.target.value))) return;
                setCompName(e.target.value)
                selectComp.className = e.target.value + " " + selectComp.classList[1]
              }} />
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
  select{
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