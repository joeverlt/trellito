import { styled } from 'styled-components'

interface IParagraph {
  children: React.ReactNode
}
export const Paragraph: React.FC<IParagraph> = ({ children }) => {
  return <ParagraphWrapper>{children}</ParagraphWrapper>
}

const ParagraphWrapper = styled.p`
  width: 100%;
  max-width: 992px;
  margin: 10px auto;
  margin-bottom: 36px;

  @media (max-width: 992px) {
    margin: 0 24px 32px 24px;
  }
`
