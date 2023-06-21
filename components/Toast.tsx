import { MouseEventHandler, useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import styled from 'styled-components'

interface SeverityBarProps {
  severity?: 'error' | 'success' | 'warning' | 'info'
}

interface ToastProps extends SeverityBarProps {
  message: string
  duration?: number
  onClose?: Function
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onClose,
  severity
}) => {
  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    setVisible(false)
    if (onClose) onClose()
  }

  if (!visible) return null

  return (
    <ToastWrapper>
      <SeverityBar severity={severity} />
      <Message>{message}</Message>
      <CloseButton onClick={handleClose}>
        <IoIosCloseCircleOutline size={24} />
      </CloseButton>
    </ToastWrapper>
  )
}

const ToastWrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: rgba(50, 50, 60, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  overflow: hidden;

  @media (max-width: 992px) {
    right: 12px;
    max-width: calc(100vw - 24px);
  }
`

const SeverityBar = styled.div<SeverityBarProps>`
  position: absolute;
  left: 0px;
  width: 6px;
  height: 1140px;
  background-color: ${({ severity }) => {
    switch (severity) {
      case 'error':
        return 'rgb(206, 37, 71)'
      case 'success':
        return 'rgb(37, 206, 161)'
      case 'warning':
        return 'rgb(206, 113, 37)'
      case 'info':
        return 'rgb(37, 192, 206)'
      default:
        return 'rgb(42, 49, 56)'
    }
  }};
`

const Message = styled.span`
  padding: 10px 10px 10px 16px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`
