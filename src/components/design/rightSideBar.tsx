import styled from 'styled-components'
import EditorList from './editorList'
import SVG_world from "../../svg/world.svg"
import SVG_cube from "../../svg/cube.svg"
import SVG_comps from "../../svg/comps.svg"
import { useState } from 'react'

export default function RightSideBar() {
  const [select, setSelect] = useState("design")
  const textProps = (name: string) => ({
    onClick: () => setSelect(name),
    style: { backgroundColor: select === name ? "#282828" : null }
  })
  return (
    <Container>
      <Nav>
        {/* <h4 {...textProps("design")}>Design</h4>
        <h4 {...textProps("design")}>Else</h4> */}
      </Nav>
      <EditorList show={select === "design"} />
    </Container>
  )
}

const Container = styled.section`
  width:310px;
  z-index: 2;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  box-shadow: -2px 10px 10px rgba(0,0,0,0.25);
  background-color: white;
  margin-top: 52px;
`
const Nav = styled.div`
  display:flex;
  align-items:center;
  padding:16px 18px;
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  position: fixed;
  width:calc(310px - 24px);
  z-index: 2;
  margin-top: -52px;
  h4{
    cursor:pointer;
    margin-right:14px;
  }
`