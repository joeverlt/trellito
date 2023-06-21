import { styled } from 'styled-components'

interface IParagraph {
  children: React.ReactNode
}
export const Paragraph: React.FC<IParagraph> = ({ children }) => {
  return <ParagraphWrapper>{children}</ParagraphWrapper>
}

const ParagraphWrapper = styled.p`
  width: 100%;
  margin: 10px auto;
  max-width: 992px;
  padding: 0px 24px;
`
