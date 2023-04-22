import styled from "styled-components"
import ColorPicker from '../../common/colorPicker'
import { useStyler } from '../../../lib/useStyler'

export default function Background() {
  const bgColorStyler = useStyler("background-color", "None", "viewBg")
  return (
    <Container>
      <Topic>Background</Topic>
      <SizeGroup1>
        <h4 title="color">Color</h4>
        <ColorPicker {...bgColorStyler.color} />
      </SizeGroup1>
    </Container>
  )
}

const Container = styled.section`
  width:calc(100% - 40px);
  display:flex;
  flex-direction: column;
  border-bottom: 2px solid rgba(54,54,54,0.1);
  padding: 0px 20px;
  padding-bottom: 28px;
`
const Topic = styled.h2`
  margin-top: 28px;
  margin-bottom: 20px;
`
const SizeGroup1 = styled.div`
  display: flex;
  align-items: center;
  margin: 12px -8px;
  padding: 6px 8px;
  height:24px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  h4{
    width:45px;
    margin-right: 4px;
    padding: 4px;
    opacity: 0.7;
  }
`