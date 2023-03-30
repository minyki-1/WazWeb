import { useState } from 'react'
import styled from 'styled-components'
import { IColor } from '../../../types/design'
import ColorPicker from '../../common/colorPicker'
import { useStyler } from '../../../lib/useStyler'
import { fontFamily } from '../widgetStyle'

export default function Font() {
  const colorStyler = useStyler("color")
  const size = useStyler("fontSize")
  const weight = useStyler("fontWeight")
  const align = useStyler("textAlign")
  const style = useStyler("fontStyle")
  const decoration = useStyler("decoration")
  const family = useStyler("fontFamily")
  const overflow = useStyler("textOverflow")
  const whiteSpace = useStyler("whiteSpace")
  const listStyle = useStyler("listStyle")

  return (
    <Container>
      <Topic>Font</Topic>
      <SizeGroup1>
        <div>
          <h4 title="font-size">Size</h4>
          <input {...size.input} />
        </div>
        <div>
          <h4 title="font-weight">Weight</h4>
          <select {...weight.select}>
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
          <select {...align.select}>
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="center">Center</option>
            <option value="justify">Justify</option>
          </select>
        </div>
        <div>
          <h4 title="font-style">Style</h4>
          <select {...style.select}>
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>
      </SizeGroup1>
      <SizeGroup2>
        <h4>Color</h4>
        <ColorPicker {...colorStyler.color} />
      </SizeGroup2>
      <SizeGroup3>
        <h4 title="text-decoration">Decoration</h4>
        <select {...decoration.select}>
          <option value="none">None</option>
          <option value="underline">Underline</option>
        </select>
      </SizeGroup3>
      <SizeGroup3>
        <h4 title="font-family">Family</h4>
        <select {...family.select}>
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
          <select {...overflow.select}>
            <option value="clip">Clip</option>
            <option value="ellipsis">Ellipsis</option>
          </select>
        </div>
        <div>
          <h4 title="white-space">Space</h4>
          <select {...whiteSpace.select}>
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </div>
      </SizeGroup1>
      <SizeGroup3>
        <h4 title="list-style">List Style</h4>
        <select {...listStyle.select}>
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
