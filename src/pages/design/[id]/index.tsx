import styled from 'styled-components'
import Header from '../../../components/design/header'
import RightSideBar from '../../../components/design/rightSideBar'
import MainView from '../../../components/design/mainView'
import LeftSideBar from '../../../components/design/leftSideBar'
import { useRouter } from 'next/router'
import { keyDownFunc } from '../../../lib/keyDown'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'

const Container = styled.main`
  width:100vw;
  min-height:100vh;
  display: flex;
  flex-direction: column;
`
const Main = styled.div`
  width:100vw;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: space-between;
`
export default function Design(props: any) {
  const param = useRouter().query.id

  return (
    <Container tabIndex={0} {...keyDownFunc(param)}>
      <Header />
      <Main>
        <LeftSideBar />
        <MainView id={param} />
        <RightSideBar />
      </Main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query.id)
  return {
    props: { data: context.query.id }
  }
}
