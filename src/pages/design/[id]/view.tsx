import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import NewView from "../../../components/design/newView"
import { getHistory } from "../../../lib/history";

export default function View() {
  const [html, setHtml] = useState("")
  const [style, setStyle] = useState("")
  const param = useRouter().query.id;
  const [doc, setDoc] = useState<Document>()
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
    if (history) {
      setHtml(history[0].html)
      setStyle(history[0].style)
    }
    setDoc(document)
  }, [param])

  return (
    <>{doc ? <NewView html={html} style={style} dom={document} /> : null}</>
  )
}