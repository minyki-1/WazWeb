import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { getHistory } from "../../../lib/history";

export default function CompyView() {
  const [mouseoverComp, setMouseoverComp] = useState<HTMLElement | undefined>();
  const [selectComp, setSelectComp] = useState<HTMLElement | undefined>();
  const canEditTag = ["H1", "H2", "H3", "H4", "H5", "P", "A"];
  const param = useRouter().query.id

  const resetSelectComp = () => { //* 기존에 선택되어있던 컴포넌트가 있을경우에 초기화 해줌
    if (!selectComp) return;
    if (canEditTag.includes(selectComp.tagName)) selectComp.contentEditable = "false"; //* 글수정 상태에서 바꿀때 그걸 false해줌
    selectComp.style.boxShadow = "";
    selectComp.style.cursor = ""
  }

  const handleMouseOver = ({ target }: { target: HTMLElement }) => {
    //* view는 이벤트 적용용이라 제외, selectComp가 mouseoverComp가 되어선 안되기 때문에 제외함
    if (target.id === "view" || target === selectComp) return;
    if (mouseoverComp) mouseoverComp.style.boxShadow = ""; //* 기존 mouseOverComp의 boxShadow을 초기화해줌
    target.style.boxShadow = "inset 0px 0px 0px 2.8px #6A9BF5";
    setMouseoverComp(target)
  }

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    const target = e.target as HTMLElement | null
    //* target === selectComp : target이 selectComp일 경우 굳이 다시 바꿀 필요가 없어서 제외
    if (!target || target.id === "view" || target === selectComp) return;
    resetSelectComp();
    if (mouseoverComp) mouseoverComp.style.boxShadow = ""
    setSelectComp(target)
    setMouseoverComp(undefined)
    target.style.boxShadow = "inset 0px 0px 0px 2.8px #2B70F0"
  }
  const handleMouseOut = () => {
    if (mouseoverComp) mouseoverComp.style.boxShadow = "";
    setMouseoverComp(undefined);
  }

  const handleDoubleClick = () => {
    if (selectComp && canEditTag.includes(selectComp.tagName)) {
      selectComp.contentEditable = "true";
      selectComp.style.cursor = "text";
    }
  }

  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify({ id: "0", name: "CWIN77", img: "http://localhost:4000/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa-%2FAOh14GhNSjWAGbrfqbT6j186QBK8iPJBQIAQzCC6EOxheQ%3Ds96-c&w=64&q=75" }))
    const user = JSON.parse(localStorage.getItem("user") || JSON.stringify(null))
    const id = "0"
    if (!user.id || id !== user.id) {
      console.log("옳바른 사용자가 아닙니다.")
      return
    }

    const view = document.getElementById("view")
    if (typeof param !== "string" || !view) return;
    const history = getHistory({ id: param })
    // if (!history || refreshExpired({ id: "design" })) {
    //   sessionStorage.clear()
    //   setRefresh({ id: "design" })
    //   const temp = `<div class="App app" style="width:100%;height:100%;background-color:red;border-radius:12px;"><h1 style="font-color:black">CHange!!!</h1></div>`
    //   view.innerHTML = temp
    //   saveHistory({ id: temp, value: temp })
    // } else if (history) view.innerHTML = history[0];
    if (history) view.innerHTML = history[0];
  }, [param])

  return (
    <View
      id="view"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onDoubleClick={handleDoubleClick}
    />
  )
}

const View = styled.div`
  border-radius: 12px;
`