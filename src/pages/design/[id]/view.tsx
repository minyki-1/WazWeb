import { useRouter } from "next/router";
import { useEffect } from "react"
import styled from "styled-components"
import { getHistory } from "../../../lib/history";
import { createNewView } from "../../../lib/createNewView"
import NewView from "../../../components/design/newView";

export default function CompyView() {
  const param = useRouter().query.id;

  useEffect(() => {
    if (typeof param !== "string") return;
    const history = getHistory({ id: param })
    // if (!history || refreshExpired({ id: "design" })) {
    //   sessionStorage.clear()
    //   setRefresh({ id: "design" })
    //   const temp = `<div class="App app" style="width:100%;height:100%;background-color:red;border-radius:12px;"><h1 style="font-color:black">CHange!!!</h1></div>`
    //   view.innerHTML = temp
    //   saveHistory({ id: temp, value: temp })
    // } else if (history) view.innerHTML = history[0];
    if (history) createNewView({ ...history[0], id: param, viewId: "mfv" })

  }, [param])

  return (
    <IframeView id="mfv" />
  )
}

const IframeView = styled.iframe`
  min-width:100vw;
  min-height:100vh;
  z-index: 2;
  background-color:white;
`