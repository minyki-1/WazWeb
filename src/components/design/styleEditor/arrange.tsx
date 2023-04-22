import styled from 'styled-components'
import { useStyler } from '../../../lib/useStyler'
import { useEffect } from 'react'

export default function Arrange() {
  const display = useStyler("display", "block")
  const justifyContent = useStyler("justifyContent")
  const alignItems = useStyler("alignItems")
  const flexDirection = useStyler("flexDirection")
  const position = useStyler("position", "static")
  const offsetTop = useStyler("top", "")
  const offsetRight = useStyler("right", "")
  const offsetBottom = useStyler("bottom", "")
  const offsetLeft = useStyler("left", "")

  return (
    <Container>
      <Topic>Arrange</Topic>
      <SizeGroup1>
        <h4 title="display">Display</h4>
        <select {...display.select}>
          <option title="block" value="block">Block</option>
          <option title="flex" value="flex">Flex Box</option>
          <option title="inline" value="inline">Auto Size</option>
          <option title="none" value="none">Hidden</option>
        </select>
      </SizeGroup1>
      {
        display.value === "flex" ?
          <>
            <SizeGroup1>
              <h4 title='justify-content'>Row</h4>
              <select {...justifyContent.select}>
                <option title="None" value="None">None</option>
                <option title="flex-start" value="flex-start">Left</option>
                <option title="flex-end" value="flex-end">Right</option>
                <option title="center" value="center">Center</option>
                <option title="space-between" value="space-between">0:1:0</option>
                <option title="space-around" value="space-around">1:2:1</option>
                <option title="space-evenly" value="space-evenly">1:1:1</option>
              </select>
            </SizeGroup1>
            <SizeGroup1>
              <h4 title='align-items'>Colum</h4>
              <select {...alignItems.select}>
                <option title="None" value="None">None</option>
                <option title="flex-start" value="flex-start">Top</option>
                <option title="flex-end" value="flex-end">Bottom</option>
                <option title="center" value="center">Center</option>
              </select>
            </SizeGroup1>
            <SizeGroup1>
              <h4 title="flex-direction">Direction</h4>
              <select {...flexDirection.select}>
                <option title="None" value="None">None</option>
                <option title="row" value="row">Row</option>
                <option title="column" value="column">Column</option>
                <option title="row-reverse" value="row-reverse">Row Reverse</option>
                <option title="column-reverse" value="column-reverse">Column Reverse</option>
              </select>
            </SizeGroup1>
          </> : null
      }
      <SizeGroup1>
        <h4 title="position">Position</h4>
        <select {...position.select}>
          <option title="static" value="static">Flow</option>
          <option title="relative" value="relative">Flow (Offsettable)</option>
          <option title="absolute" value="absolute">X,Y (Scrollable)</option>
          <option title="fixed" value="fixed">X,Y (Fixed Scroll)</option>
        </select>
      </SizeGroup1>
      {
        position.value !== "static" ?
          <SizeGroup2>
            <div>
              <h4 title="top">T</h4>
              <input {...offsetTop.input} />
            </div>
            <div>
              <h4 title="right">R</h4>
              <input {...offsetRight.input} />
            </div>
            <div>
              <h4 title="bottom">B</h4>
              <input {...offsetBottom.input} />
            </div>
            <div>
              <h4 title="left">L</h4>
              <input {...offsetLeft.input} />
            </div>
          </SizeGroup2> : null
      }
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
  margin: 6px -8px;
  padding: 6px 8px;
  height:24px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  h4{
    width:60px;
    margin-right: 8px;
    padding: 4px;
    opacity: 0.7;
  }
  select{
    text-overflow: ellipsis;
    width:calc(100% - 60px);
    padding: 8px 0px;
    cursor: pointer;
  }
`
const SizeGroup2 = styled.div < { state: string } > `
  margin: 12px 0px;
  display:flex;
  align-items: center;
  margin: 6px -8px;
  padding: 6px 8px;
  margin-top: 8px;
  height:24px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  div{
    width:calc(100% / 4);
    display:flex;
    align-items: center;
    h4{
      padding:4px;
      margin-right: 8px;
      opacity: 0.7;
    }
    input{
      width:100%;
    }
  }
`