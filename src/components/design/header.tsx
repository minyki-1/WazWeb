import styled from 'styled-components'
import Image from 'next/image'
import SVG_down_angle from "../../svg/down_angle.svg"

export default function Header() {
  return (
    <Container>
      <h1></h1>
      <h1>New Project</h1>
      <Profile>
        <Image style={{ borderRadius: 8 }} width={30} height={30} alt="profile" src={`https://lh3.googleusercontent.com/a-/AOh14GhNSjWAGbrfqbT6j186QBK8iPJBQIAQzCC6EOxheQ=s96-c`} />
        <SVG_down_angle fill="#FFFFFF" width="16px" height="16px" style={{ marginLeft: 8 }} />
      </Profile>
    </Container>
  )
}

const Container = styled.section`
  width:100vw;
  height:48px;
  z-index: 2;
  background-color: #242424;
  display:flex;
  align-items: center;
  justify-content: space-between;
  h1{
    color:white;
  }
`
const Profile = styled.article`
  display:flex;
  align-items: center;
  justify-content: center;
  padding: 0px 14px;
  height:100%;
  &:hover{
    background-color: #181818;
    cursor: pointer;
  }
`
