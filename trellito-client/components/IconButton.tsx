import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { IconType } from 'react-icons'

interface IIconButton {
  icon: IconType
  size?: number
  severity?: string
  type?: 'reset' | 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const IconButton: React.FC<IIconButton> = ({
  icon: Icon,
  size = 24,
  severity = 'muted',
  type = 'button',
  onClick
}) => {
  const severities: { [key: string]: string } = {
    danger: '#ce2547',
    success: '#25cea1',
    info: '#25c0ce',
    warning: '#ce7125',
    muted: '#9fadbc55',
    white: '#ffffff'
  }

  const color: string = severities[severity]

  return (
    <IconButtonWrapper type={type} onClick={onClick}>
      <Icon size={size} style={{ color: color, fill: color, stroke: color }} />
    </IconButtonWrapper>
  )
}

const IconButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
