import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { User } from './User'
import { Button } from './Button'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface Route {
  label: string
  route: string
}

interface NavigationProps {
  routes: Route[]
}

export const Navigation: React.FC<NavigationProps> = ({ routes }) => {
  const [active, setActive] = useState<string>('')
  const path: string = usePathname()

  useEffect(() => {
    setActive(path)
  }, [path])

  return (
    <NavigationWrapper>
      {routes.map(({ route, label }: Route) => (
        <LinkItem active={active === route ? 'true' : undefined} key={route}>
          <Link href={route}>{label}</Link>
        </LinkItem>
      ))}
    </NavigationWrapper>
  )
}

const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 1 1;
`

const LinkItem = styled.div<{ active?: string }>`
  padding: 20px;
  color: ${({ active }) => (active ? '#fff' : '')} !important;

  @media (max-width: 992px) {
    padding: 20px 0px;
  }
`
