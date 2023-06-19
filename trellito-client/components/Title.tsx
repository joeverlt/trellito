import styled from 'styled-components'

interface ITitle {
  title: string
  marginTop?: string
}

export const Title: React.FC<ITitle> = ({ title, marginTop = '48px' }) => {
  return <TitleWrapper marginTop={marginTop}>{title}</TitleWrapper>
}

const TitleWrapper = styled.h1<{ marginTop: string }>`
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
  margin-bottom: 36px;
  margin-top: ${(props) => props.marginTop};
  padding: 0px 24px;
`
