import styled from 'styled-components'
import Widget from './widget'
import next from 'next/types'
const defaultComp: { name: string, descript: string, html: string, style: string }[] = [
  {
    name: "Box",
    descript: "Basic box component. Default size is 50px x 50px.",
    html: `<div class="Box basicC"/>`,
    style: `.basicC{width:50px;height:50px;border:2px solid #858585;border-radius:5px;}`
  },
  {
    name: "Text",
    descript: "Text-only basic component. Default color is black.",
    html: `<h1 class="Text basicC">Text</h1>`,
    style: `.basicC{color:#494949;}`
  },
  {
    name: "Image",
    descript: "Basic component for image. Default size is 200px x 200px.",
    html: `<img src="https://images.unsplash.com/photo-1618614944895-fc409a83ad80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MSUzQTF8ZW58MHx8MHx8&w=1000&q=80" alt="image" class="Image basicC"/>`,
    style: `.basicC{width:200px;height:200px;}`
  },
  {
    name: "HyperLink",
    descript: "Create a hyperlink with its href attribute.",
    html: `<a href="#" class="Link basicC">Link</a>`,
    style: `.basicC{text-decoration:none;}`
  },
  {
    name: "Input",
    descript: "Component that allow you to enter text, numbers, dates, etc. Default is text.",
    html: `<input type="text" value="" placeholder="input text" class="Input basicC" />`,
    style: `.basicC{border:1.5px solid #B4B4B4;padding:8px 12px;border-radius:5px; width:80%;background-color:initial;}`
  },
  {
    name: "Button",
    descript: "1",
    html: `<button class="Button basicC">Button</button>`,
    style: `.basicC{padding:8px 12px;background-color:white;border:1.5px solid #B4B4B4;border-radius:5px;}.basicC:hover{background-color:#f5f5f5;cursor:pointer;}`
  }
]

export default function WidgetList({ show }: { show: boolean }) {
  return (
    <div style={{ display: show ? "block" : "none" }}>
      {
        defaultComp.map((data, key) => (
          <Widget key={key} {...data} id={key} />
        ))
      }
    </div>
  )
}
