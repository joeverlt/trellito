import { NextRouter, useRouter } from 'next/router'
import { MouseEventHandler } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import styled from 'styled-components'

export const Back: React.FC = () => {
  const router: NextRouter = useRouter()
  const handleGoBack: MouseEventHandler<HTMLButtonElement> = () => router.back()

  return (
    <BackButtonWrapper onClick={handleGoBack}>
      <IoIosArrowBack size={18} />
      <Label>Back</Label>
    </BackButtonWrapper>
  )
}

const BackButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    margin: 0 24px 18px 24px;
  }
`

const Label = styled.span`
  font-size: 16px;
  line-height: 16px;
`
