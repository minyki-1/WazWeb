import { useRouter } from "next/router";
import { useEffect } from "react"
import styled from "styled-components"
<<<<<<<< HEAD:src/pages/design/view.tsx
import { setupView } from "../../lib/setup";
import { getViewName } from "../../lib/getMainComp";
========
import { setupView } from "../lib/setup";
import { getViewName } from "../lib/getMainComp";
>>>>>>>> 1960b377ffd12fc1079802caf45fd854f523fcb7:src/pages/view.tsx

export default function CompyView() {
  const param = useRouter().query.id;

  useEffect(() => {
    if (typeof param === "string") return setupView({ id: param, type: "widget" });
  }, [param])

  return (
    <IframeView id={getViewName()} />
  )
}

const IframeView = styled.iframe`
  min-width:100vw;
  min-height:100vh;
  z-index: 2;
  background-color:white;
`