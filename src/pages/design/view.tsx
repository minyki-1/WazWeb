import { useRouter } from "next/router";
import { useEffect } from "react"
import styled from "styled-components"
import { setupView } from "../../lib/setup";
import { getViewName } from "../../lib/getMainComp";

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