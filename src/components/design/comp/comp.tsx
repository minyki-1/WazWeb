import styled from 'styled-components'
import randString from 'crypto-random-string';
import SVG_plus from "../../../svg/plus.svg"
import SVG_down_angle from "../../../svg/down_angle.svg"
import { useEffect, useState } from 'react'
import { useStore } from '../../../zustand/store';

interface ICompProps {
  name: string;
  descript: string;
  html: string;
  id: number;
}

export default function Comp({ name, descript, html, id }: ICompProps) {
  const svgProps = { width: 24, height: 24, fill: "white", style: { marginLeft: 8, cursor: "pointer" } }
  const [showInfo, setShowInfo] = useState(false)
  const { selectComp } = useStore();

  const addComp = () => {
    // let selectComp = (selectComp ? document.querySelector("." + selectComp) : null) || document.getElementById("compy_view")
    if (!selectComp) return;
    const parentComp = document.createElement("div")
    parentComp.innerHTML = html.trim()
    const newComp = parentComp.firstChild as HTMLElement;
    if (!newComp) return;
    newComp.className = name + " " + randString({ length: 6 })
    selectComp.append(newComp)
  }

  useEffect(() => {
    const compView = document.getElementById(String(id));
    if (!compView || compView.hasChildNodes()) return;

    const parentComp = document.createElement("div")
    parentComp.innerHTML = html.trim()
    const newComp = parentComp.firstChild as HTMLElement;

    if (!newComp) return;
    compView.append(newComp)

    const newCompWidth = newComp.offsetWidth
    const newCompHeight = newComp.offsetHeight
    const viewWidth = compView.offsetWidth - 20
    const viewHeight = compView.offsetHeight - 20

    let resizeValue = 1;
    if (newCompWidth / 4 >= newCompHeight / 3 && newCompWidth > viewWidth) {
      resizeValue = viewWidth / newCompWidth
    } else if (newCompWidth / 4 <= newCompHeight / 3 && newCompHeight > viewHeight) {
      resizeValue = viewHeight / newCompHeight
    }
    newComp.style.transform = `scale(${resizeValue})`
  }, [html, id])

  return (
    <Container>
      <CompView id={id} />
      <InfoBar>
        <h2>{name}</h2>
        <div>
          <SVG_plus onClick={addComp} {...svgProps} />
          <SVG_down_angle
            onClick={() => setShowInfo(!showInfo)}
            {...svgProps}
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
  width:calc(100% - 24px);
  margin: 12px;
  margin-top: 28px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: #4D4D4D;
`
const CompView = styled.div`
 background-color: #FBFBFB;
  width:100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px 4px 0px 0px;
`
const InfoBar = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:calc(100% - 24px);
  padding: 6px 12px;
  h2{
    color:white;
  }
`
const MoreInfo = styled.div`
  padding: 6px 12px;
  padding-bottom: 18px;
  h3{
    color:rgba(255,255,255,0.8);
    word-wrap:break-word;
  }
`