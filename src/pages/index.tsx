import { useEffect, useState } from 'react';
import styled from 'styled-components'
import Header from '../components/home/header';
import LeftSideBar from "../components/home/leftSideBar"
import Design from '../components/home/design';
import { IDesgin } from '../types/design';
import { saveHistory } from '../lib/history';
import { refreshExpired, setRefresh } from '../lib/refresh';

const temp: IDesgin[] = [
  {
    id: "0",
    title: "test1",
    owner: "0",
    html: `<div class="App app" style="width:100%;height:100%;background-color:white;display:flex;align-items:center;justify-content:center;"><h1 class="test Qsgold">test1</h1><h1 class="test Qsgols">test2</h1></div>`,
    updatedAt: "1"
  },
  {
    id: "1",
    title: "test2",
    owner: "0",
    html: `<div class="App app" style="width:100%;height:100%;background-color:blue;display:flex;align-items:center;justify-content:center;"><h1 class="test Qsgold">test2</h1></div>`,
    updatedAt: "2"
  },
]

export default function Home() {
  const [list, setList] = useState<IDesgin[]>()

  useEffect(() => {
    console.log(document.getElementById("test")?.style.color)
    const designListStorage = JSON.parse(sessionStorage.getItem("designList") || JSON.stringify(null))
    if (designListStorage && !refreshExpired({ id: "design" })) { //* 새롭게 받아올 필요없이 기존값을 보내줌
      setList(designListStorage)
    } else { //* 새롭게 리프레시 값을 만들어 주고 값도 새로 받아와야함
      sessionStorage.clear()
      setRefresh({ id: "design" })
      sessionStorage.setItem("designList", JSON.stringify(temp))
      temp.forEach(data => saveHistory({ value: data.html, id: data.id }))
      setList(temp)
    }
  }, [])

  const styleForOne: { [key: string]: { [key: string]: string } } = {
    a: { textDecoration: "none", cursor: "pointer" },
    h1: { color: "#363636", fontSize: "19px" },
    h2: { color: "#363636", fontSize: "16px" },
    h3: { color: "#363636", fontSize: "14px" },
    h4: { color: "#363636", fontSize: "12px" },
    h5: { color: "#363636", fontSize: "11px" },
    input: { color: "#363636", fontSize: "14px", border: "none", outline: "none", backgroundColor: "initial", minWidth: "0px", minHeight: "0px" },
    select: { color: "#363636", fontSize: "14px", border: "none", outline: "none", backgroundColor: "initial" },
    button: { backgroundColor: "initial" },
  }

  const styleForMany: { style: { [key: string]: string }, tags: string[] }[] = [
    {
      tags: ["html", "body", "div", "span", "applet", "object", "iframe", "h1", "h2", "h3", "h4", "h5", "h6", "p", "blockquote", "pre", "a", "abbr", "acronym", "address", "big", "cite", "code", "del", "dfn", "em", "img", "ins", "kbd", "q", "s", "samp", "small", "strike", "strong", "sub", "sup", "tt", "var", "b", "u", "i", "center", "dl", "dt", "dd", "ol", "ul", "li", "fieldset", "form", "label", "legend", "table", "caption", "tbody", "tfoot", "thead", "tr", "th", "td", "article", "aside", "canvas", "details", "embed", "figure", "figcaption", "footer", "header", "hgroup", "menu", "nav", "output", "ruby", "section", "summary", "time", "mark", "audio", "video"],
      style: { margin: "0", padding: "0", fontSize: "100%", font: "inherit", verticalAlign: "baseline", },
    },
    {
      tags: ["article", "aside", "details", "figcaption", "figure", "footer", "header", "hgroup", "menu", "nav", "section"],
      style: { display: "block" }
    },
    {
      tags: ["body"],
      style: { lineHeight: "1" },
    },
    {
      tags: ["ol", "ul"],
      style: { listStyle: "none" }
    }
  ]

  const changeStyle = (comp: HTMLElement | null) => {
    const tag = comp?.tagName?.toLowerCase()
    if (!tag || !comp) return;
    if (styleForOne.hasOwnProperty(tag)) {
      Object.keys(styleForOne[tag]).forEach(value => {
        if (comp.textContent === "11111234") console.log(comp, comp.style["color"])
        // if (!comp.style[value as any]) comp.style[value as any] = styleForOne[tag][value]
      });
    }
    // styleForMany.forEach(({ style, tags }) => {
    //   if (tags.includes(tag)) Object.keys(style).forEach(key => {
    //     console.log(comp.style[key as any])
    //     // if (!comp.style[key as any]) comp.style[key as any] = style[key]
    //   })
    // })
    comp.childNodes.forEach(child => {
      changeStyle(child as HTMLElement | null)
    })
  }

  useEffect(() => {
    // const main = document.getElementById("__next")
    // changeStyle(main)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Header />
      <Main>
        <LeftSideBar />
        <DesignList>
          <h1 id="test">11111234</h1>
          {
            list?.map((value, key) => (
              <Design key={key} {...value} />
            ))
          }
        </DesignList>
      </Main>
    </Container>
  )
}

const Container = styled.main`
  width:100vw;
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  width:100%;
  display:flex;
`
const DesignList = styled.div`
  width:calc(100% - 240px);
  height:100%;
  max-height:calc(100vh - 48px);
  display:flex;
  overflow: scroll;
  flex-wrap: wrap;
  #test{
    color:red;
  }
`
