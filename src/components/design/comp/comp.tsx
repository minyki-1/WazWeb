import styled from 'styled-components'
import SVG_plus from "../../../svg/plus.svg"
import SVG_down_angle from "../../../svg/down_angle.svg"
import { useEffect, useState } from 'react'
import { useStore } from '../../../zustand/store';

interface ICompProps {
  name: string;
  descript: string;
  html: string;
}

export default function Comp({ name, descript, html }: ICompProps) {
  const svgProps = { width: 24, height: 24, fill: "white", style: { marginLeft: 8, cursor: "pointer" } }
  const [showInfo, setShowInfo] = useState(false)
  const { selectId } = useStore();

  const addComp = () => {
    const compyView = document.getElementById("compy_view")
    // * 추가할 컴포넌트에 고유 id를 부여하고 class값도 부여해야함
    if (selectId) {
      const selectComp = document.getElementById(selectId)
      selectComp?.insertAdjacentHTML("beforeend", html)
    } else if (compyView) {
      compyView?.insertAdjacentHTML("beforeend", html)
    }
  }

  useEffect(() => {
    const compView = document.querySelector('.' + CompView.styledComponentId);
    if (compView && !compView.hasChildNodes()) compView?.insertAdjacentHTML("beforeend", html);
  }, [html])

  return (
    <Container>
      <CompView></CompView>
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
  width:calc(100% - 40px);
  margin: 20px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: #4D4D4D;
`
const CompView = styled.div`
 background-color: #FBFBFB;
  width:100%;
  aspect-ratio: 16 / 9;
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