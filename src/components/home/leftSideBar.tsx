import styled from 'styled-components'
import SVG_project from "../../svg/project.svg"
import SVG_community from "../../svg/community.svg"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

export default function LeftSideBar() {
  const { pathname } = useRouter()
  useEffect(() => {
    console.log(pathname === "/")
  }, [pathname])
  return (
    <Container>
      <Link href={"/"}>
        <NavBtn pathname={String(pathname === "/")}>
          <SVG_project width={18} height={18} fill="#363636" />
          <h2>My Porject</h2>
        </NavBtn>
      </Link>
      <Link href={"/community"}>
        <NavBtn pathname={String(pathname === "/community")}>
          <SVG_community />
          <h2>Community</h2>
        </NavBtn>
      </Link>
    </Container>
  )
}

const Container = styled.section`
  width:220px;
  height:calc(100vh - 52px);
  display:flex;
  flex-direction: column;
  border-right: 2px solid rgba(54,54,54,0.2);
`
const NavBtn = styled.button < { pathname: string } > `
  width:100%;
  display:flex;
  align-items: center;
  padding: 16px 18px;
  margin-top: 20px;
  margin-bottom: -8px;
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