import styled from 'styled-components'

export default function Size() {
  return (
    <Container>
      <Topic>Size</Topic>
      <SizeGroup>
        <div>
          <h4>W</h4>
          <input type="text" value={"300px"} />
        </div>
        <div>
          <h4>H</h4>
          <input type="text" value={"300px"} />
        </div>
      </SizeGroup>
    </Container>
  )
}

const Container = styled.section`
  width:100%;
  display:flex;
  flex-direction: column;
  border-bottom: 2px solid rgba(54,54,54,0.1);
  padding-left: 20px;
`
const Topic = styled.h2`
  margin: 28px 0px;
`
const SizeGroup = styled.div`
  display:flex;
  justify-content: space-between;
  margin-bottom: 12px;
  div{
    display: flex;
    align-items: center;
    width:calc(50% - 10px);
    margin-right: 10px;
    h4{
      margin-right: 10px;
    }
    input{
      width:100px;
      font-size: 14px;
    }
  }
`