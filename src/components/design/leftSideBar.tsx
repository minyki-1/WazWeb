import { useState } from 'react'
import styled from 'styled-components'
import Basic from './defaultCompList'
import Layer from './layer'
import Widget from './widgetList'
import { useStore } from '../../zustand/store'

export default function LeftSideBar() {
  const pageTypes: { name: string, Page: ((props: any) => JSX.Element) }[] = [
    { name: "Basic", Page: Basic },
    { name: "Widget", Page: Widget },
    { name: "Layer", Page: Layer }
  ]
  const { setLeftPage } = useStore()
  const [select, setSelect] = useState(pageTypes[0].name)
  const textProps = (name: string) => ({
    onClick: () => {
      setSelect(name)
      setLeftPage(name)
    },
    style: { opacity: select === name ? "1" : "0.6" }
  })
  return (
    <Container>
      <Nav>
        {
          pageTypes.map(({ name }, key) => (
            <PageName key={key} {...textProps(name)}>{name}</PageName>
          ))
        }
      </Nav>
      {
        pageTypes.map(({ name, Page }, key) => (
          <Page key={key} show={select === name}>{name}</Page>
        ))
      }
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