import styled from 'styled-components'
import { AiOutlineLoading } from 'react-icons/ai'

export const Loading = () => {
  return (
    <Overlay>
      <SpinnerIcon />
      <LoadingText>Loading...</LoadingText>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`

const LoadingText = styled.span`
  color: white;
  font-weight: bold;
  margin-left: 6px;
`

const SpinnerIcon = styled(AiOutlineLoading)`
  color: white;
  font-size: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
