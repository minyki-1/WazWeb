import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { getHistory } from "../../../lib/history";
import { createNewView } from "../../../lib/createNewView"

export default function CompyView() {
  const param = useRouter().query.id;

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user") || JSON.stringify(null))
    // const id = "0"
    // if (!user.id || id !== user.id) {
    //   console.log("옳바른 사용자가 아닙니다.")
    //   return
    // }
    if (typeof param !== "string") return;
    const history = getHistory({ id: param })
    // if (!history || refreshExpired({ id: "design" })) {
    //   sessionStorage.clear()
    //   setRefresh({ id: "design" })
    //   const temp = `<div class="App app" style="width:100%;height:100%;background-color:red;border-radius:12px;"><h1 style="font-color:black">CHange!!!</h1></div>`
    //   view.innerHTML = temp
    //   saveHistory({ id: temp, value: temp })
    // } else if (history) view.innerHTML = history[0];
    const iView = document.getElementById("mainIframeView") as HTMLIFrameElement | null
    const dom = iView?.contentWindow?.document
    if (!history || !dom) return
    const { html, style } = history[0]
    createNewView({ html, style, dom })

  }, [param])

  return (
    <IframeView id="mainIframeView" />
  )
}

const IframeView = styled.iframe`
  min-width:100vw;
  min-height:100vh;
  z-index: 2;
  background-color:white;
`