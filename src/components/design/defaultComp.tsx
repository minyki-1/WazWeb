import styled from 'styled-components'
import SVG_plus from "../../svg/plus.svg"
import SVG_down_angle from "../../svg/down_angle.svg"
import { useEffect, useState } from 'react'
import { useStore } from '../../zustand/store';
import { getCompUID } from "../../lib/randomString"
import { saveHTML } from '../../lib/saveHTML';
import { createNewView } from '../../lib/createNewView';
import { useRouter } from 'next/router';
import { IDefaultComp } from '../../types/design';

export default function DefaultComp({ title, descript, html, style, id }: IDefaultComp & { id: string }) {
  const svgProps = { width: 24, height: 24, fill: "#363636", style: { marginLeft: 8, cursor: "pointer" } }
  const [showInfo, setShowInfo] = useState(false)
  const { selectComp } = useStore();
  const router = useRouter();

  const addComp = () => {
    if (!selectComp) return;
    const parentComp = document.createElement("div")
    parentComp.innerHTML = html.trim()
    const newComp = parentComp.firstChild as HTMLElement | null;
    if (!newComp) return;
    const newStyle = changeClassStyle(newComp, style)
    const styleSheet = Object.values(selectComp.ownerDocument.styleSheets).find((value) => (value.ownerNode as HTMLElement | null)?.id === "WazWeb")
    if (!styleSheet) return;
    const styleNode = styleSheet.ownerNode
    selectComp.append(newComp)
    if (styleNode && newStyle) styleNode.textContent += newStyle
    if (typeof router.query.id === "string") saveHTML(router.query.id)
  }

  const changeClassStyle = (comp: HTMLElement | null, style: string | undefined) => {
    if (!selectComp || !comp) return;
    const compId = getCompUID(6, selectComp.ownerDocument)
    const { classList } = comp
    let newStyle = style?.replace(new RegExp(classList[1], 'g'), compId)
    comp.className = classList[0] + " " + compId
    Object.values(comp.children).forEach((child) => {
      newStyle = changeClassStyle(child as HTMLElement | null, newStyle)
    })
    return newStyle;
  }

  useEffect(() => {
    const viewId = "defaultComp" + id
    createNewView({ html, style, viewId, type: "widget", resize: true })
    return () => { createNewView({ html, style, viewId, type: "widget", resize: true }) }
  }, [html, id, style])

  return (
    <Container>
      <iframe onLoad={() => { createNewView({ html, style, viewId: "defaultComp" + id, type: "widget", resize: true }) }} id={"defaultComp" + id} />
      <InfoBar>
        <h2>{title}</h2>
        <div>
          <SVG_plus onClick={addComp} {...svgProps} />
          <SVG_down_angle
            {...svgProps}
            onClick={() => setShowInfo(!showInfo)}
            style={{ transform: showInfo ? "rotate(180deg)" : null, marginLeft: 8, cursor: "pointer" }}
          />
        </div>
      </InfoBar>
      {
        showInfo
          ? <MoreInfo>
            <h3>{descript}</h3>
          </MoreInfo> : null
      }
    </Container>
  )
}

const Container = styled.section`
  width:calc(100% - 28px);
  margin: 14px;
  margin-top: 28px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  outline: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  iframe{
    background-color: #f2f2f2;
    width:100%;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 4px 0px 0px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
`
const InfoBar = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:calc(100% - 24px);
  padding: 6px 12px;
`
const MoreInfo = styled.div`
  padding: 6px 12px;
  padding-bottom: 18px;
  h3{
    word-wrap:break-word;
  }
`
