import { useEffect, useState } from 'react'
import styled from "styled-components"
import { IColor } from "../../../types/design"
import { useStore } from '../../../zustand/store'
import ColorPicker from '../../common/colorPicker'
import { hexToRgb, rgbToHex } from "../../../lib/colorChange"
import { useRouter } from 'next/router'

export default function Background() {
  const [bgColor, setBgColor] = useState<IColor>({ r: 199, g: 199, b: 199, a: 0 })
  // const { selectComp } = useStore();
  const router = useRouter();

  const defaultColorSetting = () => {
    const viewBg = document.getElementById("viewBg")
    const storage = localStorage.getItem(router.query.id + "_background")
    if (bgColor.a === 1 || !viewBg || !router.query.id) return;
    if (storage) {
      const storageColor = hexToRgb(storage)
      if (storageColor) setBgColor({ ...storageColor, a: 1 })
      viewBg.style.backgroundColor = storage
    } else {
      viewBg.style.backgroundColor = rgbToHex(bgColor);
      setBgColor({ ...bgColor, a: 1 });
    }
  }

  useEffect(() => {
    const viewBg = document.getElementById("viewBg")
    if (!viewBg || !router.query.id) return;
    defaultColorSetting()
    if (bgColor.a !== 1) return
    localStorage.setItem(router.query.id + "_background", rgbToHex(bgColor))
    viewBg.style.backgroundColor = rgbToHex(bgColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgColor, router.query.id])

  return (
    <Container>
      <Topic>Background</Topic>
      <SizeGroup1>
        <h4 title="color">Color</h4>
        {/* <ColorPicker color={bgColor} setColor={setBgColor} disable={false} /> */}
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