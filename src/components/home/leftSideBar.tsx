import styled from 'styled-components'
import SVG_cube from "../../svg/cube.svg"
import SVG_plus_thin from "../../svg/plus_thin.svg"
import SVG_puzzle from "../../svg/puzzle.svg"
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LeftSideBar() {
  const { pathname } = useRouter()
  return (
    <Container>
      <Link href={"/"}>
        <NavBtn pathname={String(pathname === "/")}>
          <SVG_cube width={18} height={18} fill="#363636" />
          <h2>Project</h2>
        </NavBtn>
      </Link>
      <Link href={"/widget"}>
        <NavBtn pathname={String(pathname === "/widget")}>
          <SVG_puzzle width={18} height={18} fill="#363636" />
          <h2>Widget</h2>
        </NavBtn>
      </Link>
      <Team>
        <TeamTitle>
          <h2>Team</h2>
          <TeamAddBtn>
            <SVG_plus_thin width={10} height={10} fill={"#363636"} />
            <h5>New Team</h5>
          </TeamAddBtn>
        </TeamTitle>
      </Team>
    </Container>
  )
}

const Container = styled.section`
  width:240px;
  height:calc(100vh - 48px);
  display:flex;
  flex-direction: column;
  border-right: 2px solid rgba(54,54,54,0.1);
`
const NavBtn = styled.button < { pathname: string } > `
  width:100%;
  display:flex;
  align-items: center;
  padding: 15px 18px;
  margin-top: 20px;
  margin-bottom: -4px;
  border:none;
  cursor: pointer;
  background-color:${(props: { pathname: string }) => props.pathname === "true" ? "#4c7ef33d" : "white"};
  h2 {
    margin-left: 12px;
  }
  &:hover{
    background-color:${(props: { pathname: string }) => props.pathname === "true" ? "#4c7ef33d" : "#f2f2f2"};
  }
`
const Team = styled.article`
  margin-top: 90px;
  padding-top: 12px;
  border-top: 2px solid rgba(54,54,54,0.1);
`
const TeamTitle = styled.div`
  display:flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
`
const TeamAddBtn = styled.button`
  padding: 8px;
  display:flex;
  align-items: center;
  border: 1px solid rgba(54,54,54,0.5);
  border-radius: 2px;
  cursor: pointer;
  h5{
    margin-left: 6px;
  }
`