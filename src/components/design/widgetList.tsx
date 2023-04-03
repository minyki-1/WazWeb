import styled from 'styled-components'
import Widget from './widget'

const defaultComp: { name: string, descript: string, html: string, style: string }[] = [
  {
    name: "Box",
    descript: "Basic box component. Default size is 50px x 50px.",
    html: `<div class="Box basicC"/>`,
    style: `.basicC{width:50px;height:50px;background-color:gray;}`
  },
  {
    name: "Text",
    descript: "Text-only basic component. Default color is black.",
    html: `<h1 class="Text basicC">Text</h1>`,
    style: `.basicC{color:black;}`
  },
  {
    name: "Image",
    descript: "Basic component for image. Default size is 200px x 200px.",
    html: `<img src="" alt="image" class="Image basicC"/>`,
    style: `.basicC{width:200px;height:200px;}`
  },
  {
    name: "Link",
    descript: "Create a hyperlink with its href attribute.",
    html: `<a href="#" class="Link basicC">Link</a>`,
    style: ``
  },
  {
    name: "Input",
    descript: "Component that allow you to enter text, numbers, dates, etc. Default is text.",
    html: `<input type="text" value="Input" class="Input basicC" />`,
    style: `.basicC{border:2px solid grey;}`
  },
  {
    name: "Button",
    descript: "1",
    html: `<button class="Button basicC">Button</button>`,
    style: ``
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