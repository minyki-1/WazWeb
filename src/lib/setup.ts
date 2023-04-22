import { IDesign } from "../types/design"
import { createNewView } from "./createNewView"
import { getViewName } from "./getMainComp"
import { getHistory, saveHistory } from "./history"
import { refreshExpired, setRefresh } from "./refresh"

const temp1: IDesign[] = [
  {
    id: "0",
    title: "test1",
    makerId: "0",
    html: `<main class="App app"><h1 class="test Qsgold">Project 1</h1></main>`,
    style: `.app{width:100vw;height:100vh;background-color:black;display:flex;align-items:center;justify-content:center;}.Qsgold{color:white}`,
    updatedAt: "1",
    createdAt: "1"
  },
  {
    id: "1",
    title: "test2",
    makerId: "0",
    html: `<main class="App app"><h1 class="test Qsgold">Project 2</h1></main>`,
    style: `.app{width:100vw;height:100vh;background-color:tomato;display:flex;align-items:center;justify-content:center;}.Qsgold{color:white}`,
    updatedAt: "2",
    createdAt: "2"
  },
]

const temp2: IDesign[] = [
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

export function setupValue(id: "design" | "widget" = "design"): IDesign[] {
  const list = id === "design" ? temp1 : temp2
  const listStorage: IDesign[] = JSON.parse(sessionStorage.getItem(`${id}List`) || JSON.stringify(null))
  if (listStorage && !refreshExpired({ id })) return listStorage
  else { //* 새롭게 리프레시 값을 만들어 주고 값도 새로 받아와야함
    sessionStorage.removeItem(`${id}List`)
    setRefresh({ id })
    sessionStorage.setItem(`${id}List`, JSON.stringify(list))
    list.forEach(({ html, style, id }) => saveHistory({ id, value: { html, style } }))
    return list
  }
}

export function setupView({ id, viewId = getViewName(), resize = () => { }, type = "design" }: { id: string, viewId?: string, resize?: () => void, type?: "design" | "widget" }) {
  const history = getHistory({ id })
  resize()
  if (history) createNewView({ ...history[0], id, viewId, type })
  window.addEventListener('resize', resize)
  return () => { window.removeEventListener('resize', resize) }
}