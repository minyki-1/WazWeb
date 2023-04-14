import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { smallerHTML } from '../../lib/resize'
import { setupView } from '../../lib/setup'

export default function MainView({ id, html, style, width, height, type }: { id: string, html: string, style: string, width: string, height: string, type: "design" | "widget" }) {
  const [bgColor, setBgColor] = useState("#F8FAFB")

  useEffect(() => {
    const sColor = localStorage.getItem(id + "_background")
    if (sColor) setBgColor(sColor)
    return setupView(id, `view${id}`, () => {
      const view = document.getElementById(`view${id}`) as HTMLIFrameElement | null
      const viewBg = document.getElementById("bg" + id)
      smallerHTML(view, viewBg, -20)
    }, type);
  }, [html, id, style])

  return (
    <Container>
      <Link href={`/design/${id}`}>
        <ViewBg style={{ backgroundColor: bgColor }} id={`bg${id}`}>
          <View type={type} width={width} height={height} id={`view${id}`} />
        </ViewBg>
        <DesignInfo>Desgin Name</DesignInfo>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  width:calc(100% / 2 - 48px);
  margin: 24px;
  margin-top: 28px;
  outline: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  @media screen and (max-width: 1000px) {
    width:calc(100% - 48px);
  }
`
const ViewBg = styled.div`
  width:100%;
  aspect-ratio: 3 / 2;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
const View = styled.iframe< { width: string, height: string, type: "design" | "widget" } >`
  width:${({ width }: { width: string }) => (width)};
  height:${({ height }: { height: string }) => (height)};
  border-radius:${({ type }: { type: "design" | "widget" }) => type === "design" ? "12px" : "0px"};
`
const DesignInfo = styled.h2`
width: calc(100 % - 28px);
padding: 14px;
color:#363636;
`