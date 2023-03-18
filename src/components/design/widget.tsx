import styled from 'styled-components'
import SVG_plus from "../../svg/plus.svg"
import SVG_down_angle from "../../svg/down_angle.svg"
import { useEffect, useState } from 'react'
import { useStore } from '../../zustand/store';
import { getCompUID } from "../../lib/randomString"
import { saveHTML } from '../../lib/saveHTML';
import { createNewView } from '../../lib/createNewView';

interface ICompProps {
  name: string;
  descript: string;
  html: string;
  id: number;
}

export default function Widget({ name, descript, html, id }: ICompProps) {
  const svgProps = { width: 24, height: 24, fill: "#363636", style: { marginLeft: 8, cursor: "pointer" } }
  const [showInfo, setShowInfo] = useState(false)
  const { selectComp } = useStore();

  const addComp = () => {
    if (!selectComp) return;
    const parentComp = document.createElement("div")
    parentComp.innerHTML = html.trim()
    const newComp = parentComp.firstChild as HTMLElement | null;
    if (!newComp) return;
    newComp.className = name + " " + getCompUID(6)
    selectComp.append(newComp)
    if (typeof id === "string") saveHTML(id)
  }

  useEffect(() => {
    const iframeView = document.getElementById("iframe" + id) as HTMLIFrameElement | null;
    const iframeDom = iframeView?.contentWindow?.document
    if (!iframeDom || iframeDom.body.childNodes.length > 0) return;
    createNewView(html, iframeDom)
  }, [html, id])

  return (
    <Container>
      <WidgetView id={"iframe" + id} />
      <InfoBar>
        <h2>{name}</h2>
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
`
const WidgetView = styled.iframe`
  background-color: #f2f2f2;
  width:100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
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