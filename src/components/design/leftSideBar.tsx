import { useState } from 'react'
import styled from 'styled-components'
import CompList from './widgetList'
import SVG_world from "../../svg/world.svg"
import SVG_cube from "../../svg/cube.svg"
import SVG_comps from "../../svg/comps.svg"

export default function RightSideBar() {
  const [select, setSelect] = useState("cube")
  const iconProps = (name: string) => ({
    fill: "white", width: 24, height: 24,
    onClick: () => setSelect(name),
    style: { padding: 14, cursor: "pointer", backgroundColor: select === name ? "#282828" : null }
  })
  return (
    <Container>
      <Nav>
        <SVG_cube {...iconProps("cube")} />
        <SVG_world {...iconProps("world")} />
        <SVG_comps {...iconProps("comps")} />
      </Nav>
      {select === "cube" ? <CompList /> : null}
    </Container>
  )
}

const Container = styled.section`
  width:300px;
  z-index: 2;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  box-shadow: -2px 0px 10px rgba(0,0,0,0.25);
  background-color: white;
  display:flex;
  flex-direction: column;
  margin-top: 52px;
`
const Nav = styled.div`
  display:flex;
  padding:0px 12px;
  background-color: #363636;
  position: fixed;
  width:calc(300px - 24px);
  z-index: 2;
  margin-top: -52px;
  svg{
    &:hover{
      background-color: #282828;
    }
  }
`