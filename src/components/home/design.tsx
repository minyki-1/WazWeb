import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { resizeHTML } from '../../lib/resize'

export default function Design({ id, html }: { id: string, html: string }) {
  const [bgColor, setBgColor] = useState("#F8FAFB")

  useEffect(() => {
    const sColor = localStorage.getItem(id + "_background")
    if (sColor) setBgColor(sColor)
    const wrap = document.getElementById(`wrap_${id}`);
    const view = document.getElementById(`view_${id}`);
    if (!wrap || !view || view.hasChildNodes()) return;
    view.innerHTML = html;
    resizeHTML(view, wrap, -30)
  }, [html, id])

  return (
    <Container>
      <Link href={`/design/${id}`}>
        <DesignWrapper style={{ backgroundColor: bgColor }} id={`wrap_${id}`}>
          <DesginView id={`view_${id}`} />
        </DesignWrapper>
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
const DesignWrapper = styled.div`
  width:100%;
  aspect-ratio: 3 / 2;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`
const DesginView = styled.div`
  width:360px;
  height:720px;
`
const DesignInfo = styled.h2`
  width:calc(100% - 28px);
  padding: 14px;
  color:#363636;
`