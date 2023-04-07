import Arrange from './styleEditor/arrange'
import Size from './styleEditor/size'
import Basic from './styleEditor/basic'
import Font from './styleEditor/font'
import Background from './styleEditor/background'
import PropertyList from "./styleEditor/propertyList"
import { useStore } from '../../zustand/store'

const compData: { [key: string]: ((props: any) => JSX.Element)[] } = {
  div: [Size, Basic, Arrange],
  span: [Size, Basic, Arrange],
  input: [Size, Basic, Font],
  img: [Size, Basic],
  a: [Size, Basic, Font],
  h1: [Size, Basic, Font],
  h2: [Size, Basic, Font],
  h3: [Size, Basic, Font],
  h4: [Size, Basic, Font],
  h5: [Size, Basic, Font],
  p: [Size, Basic, Font],
  li: [Size, Basic, Font],
  ol: [Size, Basic],
  ul: [Size, Basic],
  footer: [Size, Basic, Arrange],
  header: [Size, Basic, Arrange],
  aside: [Size, Basic, Arrange],
  nav: [Size, Basic, Arrange],
  select: [Size, Basic, Arrange],
  option: [Font],
  article: [Size, Basic, Arrange],
  section: [Size, Basic, Arrange],
  main: [Size, Basic, Arrange],
  button: [Size, Basic, Font],
  etc: [Size, Basic, Arrange, Font]
}


export default function EditorList({ show }: { show: boolean }) {
  const { selectComp } = useStore();
  const tagName = String(selectComp?.tagName.toLowerCase())
  const compKey = tagName in compData ? tagName : "etc"

  return (
    <div style={{ display: show ? "block" : "none" }}>
      {
        selectComp && selectComp.id !== "viewBg" ?
          <PropertyList /> : null
      }
      {
        selectComp === undefined || selectComp.id === "viewBg"
          ? <Background />
          : compData[compKey].map((Editor, key) => (
            <Editor key={key} />
          ))
      }
    </div>
  )
}