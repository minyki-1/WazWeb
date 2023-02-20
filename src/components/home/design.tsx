import styled from 'styled-components'

export default function Design() {
  return (
    <Container>
      <DesignView></DesignView>
      <DesignInfo>Desgin Name</DesignInfo>
    </Container>
  )
}

const Container = styled.div`
  width:calc(100% / 2 - 48px);
  margin: 24px;
  margin-top: 28px;
  outline: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`
const DesignView = styled.div`
  width:100%;
  aspect-ratio: 3 / 2;
  background-color: #F8FAFB;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
`
const DesignInfo = styled.h2`
  width:calc(100% - 28px);
  padding: 14px;
  color:#363636;
`