import styled from 'styled-components'
import EditorList from './editorList'
import { useState } from 'react'
import TagStyler from './tagStyler'

export default function RightSideBar() {
  const [select, setSelect] = useState("Style")
  const textProps = (name: string) => ({
    onClick: () => setSelect(name),
    style: { opacity: select === name ? "1" : "0.6" }
  })
  return (
    <Container>
      <Nav>
        <PageName {...textProps("Style")}>Style</PageName>
        <PageName {...textProps("Tag")}>Tag</PageName>
      </Nav>
      <EditorList show={select === "Style"} />
      {select === "Tag" ? <TagStyler /> : null}
    </Container>
  )
}

const Container = styled.section`
  width:310px;
  z-index: 2;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  background-color: white;
  margin-top: 40px;
  @media screen and (max-width: 990px) {
    display: none;
  }
`
const Nav = styled.div`
  display:flex;
  align-items:center;
  padding:0px 18px;
  height:44px;
  border-bottom: 1.5px solid rgba(0,0,0,0.1);
  position: fixed;
  width:calc(310px - 36px);
  z-index: 2;
  background-color: white;
  margin-top: -40px;
`
const PageName = styled.h4`
  cursor:pointer;
  margin-right:16px;
  font-weight: bold;
`