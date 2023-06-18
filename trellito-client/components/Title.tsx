import styled from 'styled-components'

interface ITitle {
  title: string
}

export const Title: React.FC<ITitle> = ({ title }) => {
  return <TitleWrapper>{title}</TitleWrapper>
}

const TitleWrapper = styled.h1`
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
  margin-bottom: 36px;

  @media (max-width: 992px) {
    margin: 0 24px 32px 24px;
  }
`
