import { IDesgin } from "../types/design"
import { createNewView } from "./createNewView"
import { getHistory, saveHistory } from "./history"
import { refreshExpired, setRefresh } from "./refresh"

const temp1: IDesgin[] = [
  {
    id: "0",
    title: "test1",
    makerId: "0",
    html: `<main class="App app"><h1 class="test Qsgold">test1</h1><h1 class="test Qsgols">test2</h1></main>`,
    style: `.app{width:100vw;height:100vh;background-color:black;display:flex;align-items:center;justify-content:center;}.Qsgold{color:red}.Qsgols{color:white}`,
    updatedAt: "1",
    createdAt: "1"
  },
  {
    id: "1",
    title: "test2",
    makerId: "0",
    html: `<main class="App app"><h1 class="test Qsgold">test2</h1></main>`,
    style: `.app{width:100vw;height:100vh;background-color:blue;display:flex;align-items:center;justify-content:center;}.Qsgold{color:red}`,
    updatedAt: "2",
    createdAt: "2"
  },
]

const temp2: IDesgin[] = [
  {
    id: "3",
    title: "widget1",
    makerId: "0",
    html: `<header class="Header lsasw_"><h1 class="title scsaqe">Header</h1></header>`,
    style: `.lsasw_{background-color:green;width:100vw;border-bottom:2px solid gray;align-items:center;justify-content:center;}.scsaqe{font-size:18px;}`,
    descript: "test widget",
    updatedAt: "1",
    createdAt: "1"
  }
]

export function setupValue(id: "design" | "widget" = "design"): IDesgin[] {
  const list = id === "design" ? temp1 : temp2
  const listStorage: IDesgin[] = JSON.parse(sessionStorage.getItem(`${id}List`) || JSON.stringify(null))
  if (listStorage && !refreshExpired({ id })) return listStorage
  else { //* 새롭게 리프레시 값을 만들어 주고 값도 새로 받아와야함
    sessionStorage.removeItem(`${id}List`)
    setRefresh({ id })
    sessionStorage.setItem(`${id}List`, JSON.stringify(list))
    list.forEach(({ html, style, id }) => saveHistory({ id, value: { html, style } }))
    return list
  }
}

export function setupView(id: string, viewId: string, resize: () => void, type: "design" | "widget" = "design") {
  const history = getHistory({ id })
  resize()
  const handleResize = () => { resize() }
  if (history) createNewView({ ...history[0], id, viewId, type })
  window.addEventListener('resize', handleResize)
  return () => { window.removeEventListener('resize', handleResize) }
}

export function setupView1(id: string, viewId: string, resize: () => void, type: "design" | "widget" = "design") {
  resize()
  const handleResize = () => { resize() }
  return {
    useEffect: () => {
      window.addEventListener('resize', handleResize)
      return () => { window.removeEventListener('resize', handleResize) }
    },
    // onLoad: ({ target }) => {
    //   const history = getHistory({ id })
    //   if (history) createNewView({ ...history[0], id, viewId, type })
    // }
  }
}