import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '../../zustand/store';
import { saveHTML } from '../../lib/saveHTML';
import { useRouter } from 'next/router';
import { getMainView } from '../../lib/getMainComp';

type TLayer = {
  tap: number;
  id: string;
}[]

export default function Layer({ show }: { show: boolean }) {
  const { selectComp, setSelectComp } = useStore()
  const [layer, setLayer] = useState<TLayer>()
  const [viewDom, setViewDom] = useState<Document | undefined>()
  const param = useRouter().query.id

  function searchLayer(elem: HTMLElement | undefined, list: TLayer = [], tap = 0) {
    if (!elem) return;
    list.push({ tap, id: elem.classList[1] })
    Object.values(elem.children).forEach((child) => {
      searchLayer(child as HTMLElement, list, tap + 1)
    })
    return list
  }
  useEffect(() => {
    const dom = getMainView()?.contentDocument
    const main = dom?.getElementById("newView")?.firstChild as HTMLElement | null
    if (!main || !dom) return;
    setViewDom(dom)
    setLayer(searchLayer(main))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const resetSelectComp = () => {
    if (!selectComp || typeof param !== "string") return; //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
    selectComp.childNodes.forEach(e => {
      if (e.nodeType !== 3) return;
      selectComp.contentEditable = "false"
      saveHTML(param);
    })
    selectComp.style.boxShadow = "";
    selectComp.style.cursor = ""
  }

  const changeSelect = (target: HTMLElement | null) => {
    //* target === selectComp : target이 selectComp일 경우 굳이 다시 바꿀 필요가 없어서 제외
    if (!target || target === selectComp) return;
    resetSelectComp();
    setSelectComp(target)
    target.style.boxShadow = "inset 0px 0px 0px 2.8px #2887f4"
  }

  return (
    <Container style={{ display: show ? "block" : "none" }}>
      {
        viewDom && layer && layer.map((data, key) => {
          const comp = viewDom.querySelector('.' + data.id) as HTMLElement | null
          if (!comp) return;
          return (
            <LayerComp
              onClick={() => { changeSelect(comp) }}
              key={key} tap={String(data.tap)}
              style={{ backgroundColor: selectComp === comp ? "#c0d7f2" : "" }}
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
    box-shadow:inset 0px 0px 0px 2px #6cabf3;
  }
`