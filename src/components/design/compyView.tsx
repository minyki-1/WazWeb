import { useEffect } from "react"
import styled from "styled-components"
export default function CompyView() {
  useEffect(() => {
    document.getElementById("view")?.addEventListener("mouseover", (e) => {
      console.log(e)
    })
  }, [])

  return (
    <Container>
      <View id="view"></View>
    </Container>
  )
}

const Container = styled.div`
  width:calc(100% - 300px - 310px);
  display: flex;
  align-items: center;
  justify-content: center;
`
const View = styled.div`
  width:360px;
  height:720px;
  background-color: white;
  border-radius: 12px;
`