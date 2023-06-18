import styled from 'styled-components'

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <p>© 2023 by Joeverlt</p>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  background-color: #161a1d;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  border-top: 1px solid #9fadbc29;
`
