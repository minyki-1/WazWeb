import styled from 'styled-components'
import Arrange from './styleEditor/arrange'
import Size from './styleEditor/size'
import Basic from './styleEditor/basic'
import Font from './styleEditor/font'
import Background from './styleEditor/background'
import { useStore } from '../../zustand/store'

const compData: { [key: string]: (() => JSX.Element)[] } = {
  div: [Size, Basic, Arrange],
  span: [Size, Basic, Arrange],
  input: [Size, Basic, Arrange, Font],
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
  main: [Size, Basic, Arrange]
}

export default function RightSideBar() {
  const { selectComp } = useStore();

  return (
    <Container id="rightSideBar">
      {
        selectComp ? selectComp &&
          compData[selectComp.tagName.toLowerCase()]
            .map((Editor, key) => (
              <Editor key={key} />
            ))
          : <Background />
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
  box-shadow: -2px 0px 10px rgba(0,0,0,0.25);
  background-color: #F5F5F5;
`