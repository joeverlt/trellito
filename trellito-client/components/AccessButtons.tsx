import { Button } from './Button'
import styled from 'styled-components'
import Link from 'next/link'

export const AccessButtons: React.FC = () => {
  return (
    <AccessButtonsWrapper>
      <Link href="/signin">
        <Button label="Sign In" />
      </Link>
      <Link href="/signup">
        <Button label="Sign Up" />
      </Link>
    </AccessButtonsWrapper>
  )
}

const AccessButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 992px) {
    padding: 0 10px;
  }
`
