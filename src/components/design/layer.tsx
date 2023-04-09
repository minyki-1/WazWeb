import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../zustand/store';

type TLayer = {
  tap: number;
  id: string;
}[]

export default function Layer({ show }: { show: boolean }) {
  const { selectComp, setSelectComp } = useStore()
  const [layer, setLayer] = useState<TLayer>()
  const [viewDom, setViewDom] = useState<Document | undefined>()
  function searchLayer(elem: HTMLElement | undefined, list: TLayer = [], tap = 0) {
    if (!elem) return;
    list.push({ tap, id: elem.classList[1] })
    Object.values(elem.children).forEach((child) => {
      searchLayer(child as HTMLElement, list, tap + 1)
    })
    return list
  }
  useEffect(() => {
    const iView = document.getElementById("mainIframeView") as HTMLIFrameElement | null
    const dom = iView?.contentWindow?.document
    const main = dom?.getElementById("newView")?.firstChild as HTMLElement | null
    if (!main) return;
    setViewDom(dom)
    setLayer(searchLayer(main))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <Container style={{ display: show ? "block" : "none" }}>
      {
        viewDom && layer && layer.map((data, key) => {
          const comp = viewDom.querySelector('.' + data.id) as HTMLElement | null
          if (!comp) return;
          return (
            <LayerComp
              onClick={() => { setSelectComp(comp) }}
              key={key} tap={String(data.tap)}
              style={{ backgroundColor: selectComp === comp ? "rgba(0,0,0,0.1)" : "" }}
            >
              <button>{comp.classList[0]}</button>
            </LayerComp>
          )
        })
      }
    </Container>
  )
}

const Container = styled.div`
  margin-top:8px;
`
const LayerComp = styled.div< { tap: string } >`
  padding:9px 8px;
  margin:0px 4px;
  padding-left:${({ tap }: { tap: string }) => 10 + (Number(tap) * 10) + "px"};
  button{
    font-size:14px;
    border:none;
  }

  &:hover{
    box-shadow:inset 0px 0px 0px 2px rgba(0,0,0,0.1);
  }
`