import styled from 'styled-components'
import Header from '../../components/design/header'
import RightSideBar from '../../components/design/rightSideBar'
import MainView from '../../components/design/mainView'
import LeftSideBar from '../../components/design/leftSideBar'
import { useRouter } from 'next/router'
import { keyDownFunc } from '../../lib/keyDown'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import { IDesign } from '../../types/design'

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
  useEffect(() => {
    console.log(props)
  }, [props])
  return (
    <Container tabIndex={0} {...keyDownFunc(param)}>
      <Header />
      <Main>
        <LeftSideBar />
        <MainView data={props.design} />
        <RightSideBar />
      </Main>
    </Container>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { id: string } }[] = [];
  try {
    const res = await fetch(`http://localhost:4000/api/designList`)
    const { data }: { data: IDesign[] } = await res.json()
    paths = data.map(({ id }) => ({ params: { id } }))
  } catch (err) {
    console.error(err);
  }
  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let data = null;
  try {
    const res = await fetch(`http://localhost:4000/api/design/${params?.id}`)
    data = await res.json()
    return { props: { data: data }, revalidate: 20 }
  } catch (err) {
    console.error(err);
  }

  return { props: { data }, revalidate: 20 }
}