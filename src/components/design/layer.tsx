import styled from 'styled-components'

export default function Layer({ show }: { show: boolean }) {
  return (
    <Container style={{ display: show ? "block" : "none" }}>
      12345
    </Container>
  )
}

const Container = styled.div`
  margin: 14px;
`