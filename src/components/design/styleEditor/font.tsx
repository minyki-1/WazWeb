import { useState } from 'react'
import styled from 'styled-components'
import { IColor } from '../../../types/design'
import ColorPicker from '../../common/colorPicker'
import { useStyler } from '../../../lib/useStyler'

const fontFamily = [
  `Default Style`,
  `serif`,
  `cursive`,
  `fantasy`,
  `monospace`,
  `sans-serif`,
  `Arial, Helvetica, sans-serif`,
  `'Times New Roman', Times, serif`,
  `'Courier New', Courier, monospace`,
  `Verdana, Geneva, Tahoma, sans-serif`,
  `Georgia, 'Times New Roman', Times, serif`,
  `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
]

export default function Font() {
  const color = useStyler("color")
  const [size, setSize] = useState("0px")
  const [weight, setWeight] = useState("normal")
  const [align, setAlign] = useState("start")
  const [style, setStyle] = useState("normal")
  const [decoration, setDecoration] = useState("none")
  const [family, setFamily] = useState("Default Style")
  const [overflow, setOverflow] = useState("clip")
  const [space, setSpace] = useState("normal")
  const [listStyle, setListStyle] = useState("none")

  return (
    <Container>
      <Topic>Font</Topic>
      <SizeGroup1>
        <div>
          <h4 title="font-size">Size</h4>
          <input value={size} type="text" onChange={e => setSize(e.target.value)} />
        </div>
        <div>
          <h4 title="font-weight">Weight</h4>
          <select value={weight} onChange={e => setWeight(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="200">Thin</option>
            <option value="400">Light</option>
            <option value="bold">Bold</option>
          </select>
        </div>
      </SizeGroup1>
      <SizeGroup1>
        <div>
          <h4 title="text-align">Align</h4>
          <select value={align} onChange={e => setAlign(e.target.value)}>
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="center">Center</option>
            <option value="justify">Justify</option>
          </select>
        </div>
        <div>
          <h4 title="font-style">Style</h4>
          <select value={style} onChange={e => setStyle(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>
      </SizeGroup1>
      <SizeGroup2>
        <h4>Color</h4>
        <ColorPicker styler={color} />
      </SizeGroup2>
      <SizeGroup3>
        <h4 title="text-decoration">Decoration</h4>
        <select value={decoration} onChange={e => setDecoration(e.target.value)}>
          <option value="none">None</option>
          <option value="underline">Underline</option>
        </select>
      </SizeGroup3>
      <SizeGroup3>
        <h4 title="font-family">Family</h4>
        <select value={family} onChange={e => setFamily(e.target.value)}>
          {
            fontFamily.map((value, index) => (
              <option key={index} value={value}>{value}</option>
            ))
          }
        </select>
      </SizeGroup3>
      <SizeGroup1>
        <div>
          <h4 title="text-overflow">Overflow</h4>
          <select value={overflow} onChange={e => setOverflow(e.target.value)}>
            <option value="clip">Clip</option>
            <option value="ellipsis">Ellipsis</option>
          </select>
        </div>
        <div>
          <h4 title="white-space">Space</h4>
          <select value={space} onChange={e => setSpace(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>
      </SizeGroup1>
      <SizeGroup3>
        <h4 title="list-style">List Style</h4>
        <select value={listStyle} onChange={e => setListStyle(e.target.value)}>
          <option value="none">None</option>
          <option value="square">Square</option>
          <option value="inside">Inside</option>
        </select>
      </SizeGroup3>
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
  justify-content: space-between;
  margin: 12px -8px;
  padding: 6px 8px;
  height:24px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  div{
    display:flex;
    align-items: center;
    h4{
      margin-right: 8px;
      padding: 4px;
      opacity: 0.7;
    }
    input{
      width:calc((100%) / 2);
    }
  }
`
const SizeGroup2 = styled.div`
  display: flex;
  align-items: center;
  margin: 12px -8px;
  padding: 6px 8px;
  height:24px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  h4{
    width:60px;
    margin-right: 4px;
    padding: 4px;
    opacity: 0.7;
  }
`
const SizeGroup3 = styled.div`
  display:flex;
  align-items: center;
  margin: 12px -8px;
  padding: 6px 8px;
  height:24px;
  &:hover{
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.05);
  }
  h4{
    width: 60px;
    margin-right: 8px;
    padding: 4px;
    opacity: 0.7;
  }
  select{
    width:50%;
    text-overflow: ellipsis;
  }
`