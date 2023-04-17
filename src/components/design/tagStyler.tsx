import styled from "styled-components"

const namedTags = {
  skeleton: ["html", "body"],
  text: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "strong", "em", "li", "option"],
  box: ["div", "span", "table"],
  button: ["button", "form"],
  control: ["input", "textarea", "select"],
  image: ["img"],
  semantic: ["header", "nav", "main", "article", "aside", "section", "footer"],
}

// str.charAt(0).toUpperCase() + str.slice(1);


export default function TagStyler() {
  return (
    <Container>
      <Topic>H1</Topic>
      <SizeGroup1>
        <h4 title="color">Color</h4>
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