import styled from 'styled-components'

export default function Arrange() {
  return (
    <Container>
      <Topic>Arrange</Topic>
      <SizeGroup1>
        <h4>Display</h4>
        <select>
          <option value="flex">Flex Box</option>
          <option value="inline">Auto Size</option>
          <option value="none">None</option>
        </select>
      </SizeGroup1>
      <SizeGroup1>
        <h4>Row</h4>
        <select>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </SizeGroup1>
      <SizeGroup1>
        <h4>Colum</h4>
        <select>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="space-between">0:1:0</option>
          <option value="space-around">1:2:1</option>
          <option value="space-evenly">1:1:1</option>
        </select>
      </SizeGroup1>
      <SizeGroup1>
        <h4>Direction</h4>
        <select>
          <option value="row">Row</option>
          <option value="colum">Colum</option>
          <option value="row-reverse">Row Reverse</option>
          <option value="colum-reverse">Colum Reverse</option>
        </select>
      </SizeGroup1>
      <SizeGroup1>
        <h4>Position</h4>
        <select>
          <option value="static">Flow</option>
          <option value="relative">Flow (Offsettable)</option>
          <option value="absolute">X,Y (Scrollable)</option>
          <option value="fixed">X,Y (Fixed)</option>
        </select>
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
  margin: 12px 0px;
  h4{
    width:70px;
    margin-right: 8px;
    padding: 4px;
    opacity: 0.7;
  }
  select{
    text-overflow: ellipsis;
    width:32%;
    border: none;
  }
`