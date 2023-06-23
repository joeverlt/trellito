import styled from 'styled-components'

interface TitleProps {
  title: string
  top?: string
}

export const Title: React.FC<TitleProps> = ({ title, top = '48px' }) => {
  return <TitleWrapper top={top}>{title}</TitleWrapper>
}

const TitleWrapper = styled.h1<{ top: string }>`
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
  margin-bottom: 36px;
  margin-top: ${(props) => props.top};
  padding: 0px 24px;
`
