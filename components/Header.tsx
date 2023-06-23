import { useSession } from 'next-auth/react'
import { User } from './User'
import { Navigation } from './Navigation'
import { AccessButtons } from './AccessButtons'
import styled from 'styled-components'

interface Route {
  label: string
  route: string
}

interface HeaderProps {
  routes: Route[]
}

export const Header: React.FC<HeaderProps> = ({ routes }) => {
  const { data } = useSession()

  return (
    <HeaderWrapper>
      <Brand>TRELLITO</Brand>
      <Navigation routes={routes} />
      {data?.user ? <User data={data.user} /> : <AccessButtons />}
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  background-color: #161a1d;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  width: 100vw;
  border-bottom: 1px solid #9fadbc29;

  @media (max-width: 992px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`

const Brand = styled.h3`
  padding: 20px;
  margin-right: 20px;

  @media (max-width: 992px) {
    margin-right: 0px;
    padding: 20px 15px;
  }
`
