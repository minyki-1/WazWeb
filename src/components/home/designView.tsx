import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { resizeHTML } from '../../lib/resize'
import { createNewView } from '../../lib/createNewView'

export default function DesignView({ id, html, style }: { id: string, html: string, style: string }) {
  const [bgColor, setBgColor] = useState("#F8FAFB")

  useEffect(() => {
    const sColor = localStorage.getItem(id + "_background")
    if (sColor) setBgColor(sColor)

    const view = document.getElementById("view" + id) as HTMLIFrameElement | null
    const viewBg = document.getElementById("bg" + id)
    const dom = view?.contentWindow?.document
    if (dom) createNewView({ html, style, dom })

    if (view && viewBg) resizeHTML(view, viewBg, -40)
  }, [html, id, style])

  return (
    <Container>
      <Link href={`/design/${id}`}>
        <ViewBg style={{ backgroundColor: bgColor }} id={`bg${id}`}>
          <View id={`view${id}`} />
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
const View = styled.iframe`
  width:360px;
  height:720px;
  border-radius:12px;
`
const DesignInfo = styled.h2`
  width:calc(100% - 28px);
  padding: 14px;
  color:#363636;
`