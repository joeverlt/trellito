import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { IoIosCloseCircleOutline } from 'react-icons/io'

interface IDialog {
  show: boolean
  children: React.ReactNode
  onClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement>
}

export const Dialog: React.FC<IDialog> = ({ show, onClose, children }) => {
  return (
    <DialogOverlay show={show ? 'true' : undefined} onClick={onClose}>
      <DialogContent
        show={show ? 'true' : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>
          <IoIosCloseCircleOutline size={24} />
        </CloseButton>
        {children}
      </DialogContent>
    </DialogOverlay>
  )
}

const DialogOverlay = styled.div<{ show?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'block' : 'none')};
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`

const DialogContent = styled.div<{ show?: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(22, 24, 28, 1);
  padding: 20px;
  width: 80%;
  max-width: 500px;
  border-radius: 4px;
  display: ${({ show }) => (show ? 'block' : 'none')};

  @media (max-width: 992px) {
    width: 100%;
    height: 100%;
    max-width: none;
    border-radius: 0;
  }
`
