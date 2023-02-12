import styled from 'styled-components'
import Comp from './comp/comp'

const defaultComp: { name: string, descript: string, html: string }[] = [
  {
    name: "Box (div)",
    descript: "Basic box component. Default size is 50px x 50px.",
    html: `<div style="width:50px;height:50px;background:gray" />`
  },
  {
    name: "Text (h1)",
    descript: "Text-only basic component. Default color is black.",
    html: `<h1 style="color:black;">Text</h1>`
  },
  {
    name: "Image (img)",
    descript: "Basic component for image. Default size is 200px x 200px.",
    html: `<img src="" alt="image" style="width:200px;height:200px" />`
  },
  {
    name: "Link (a)",
    descript: "Create a hyperlink with its href attribute.",
    html: `<a href="#">Link</a>`
  },
  {
    name: "Input (input)",
    descript: "Component that allow you to enter text, numbers, dates, etc. Default is text.",
    html: `<input type="text" value="Input" style="border:2px solid grey" />`
  }
]

export default function RightSideBar() {
  return (
    <Container>
      {
        defaultComp.map((data, key) => (
          <Comp key={key} {...data} id={key} />
        ))
      }
      {/* <Comp {...defaultComp[1]} />
      <Comp {...defaultComp[2]} /> */}
    </Container>
  )
}

const Container = styled.section`
  width:280px;
  z-index: 2;
  overflow-y: scroll;
  display:flex;
  flex-direction: column;
  box-shadow: -2px 0px 10px rgba(0,0,0,0.25);
  background-color: #F5F5F5;
  display:flex;
  flex-direction: column;
`
