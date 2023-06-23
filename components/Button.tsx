import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps {
  label?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
  severity?: 'danger' | 'warning' | 'info' | 'success' | 'mute'
  onClick?: MouseEventHandler
}

export const Button: React.FC<ButtonProps> = ({
  size,
  label,
  severity,
  block,
  type = 'button',
  onClick = () => {}
}) => {
  return (
    <ButtonWrapper
      type={type}
      block={block ? 'true' : undefined}
      className={`${severity} ${size}`}
      onClick={onClick}
    >
      {label}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button<{
  severity?: string
  size?: string
  block?: string
}>`
  background-color: rgb(23, 113, 174);
  color: white;
  border-radius: 6px;
  padding: 12px;
  border: none;
  min-width: 20px;
  min-height: 20px;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `}

  &.success {
    background-color: rgb(37, 206, 161);
  }

  &.danger {
    background-color: rgb(206, 37, 71);
  }

  &.warning {
    background-color: rgb(206, 113, 37);
  }

  &.info {
    background-color: rgb(37, 192, 206);
  }

  &.mute {
    background-color: rgb(42, 49, 56);
  }

  &.xs {
    padding: 2px;
  }

  &.sm {
    padding: 8px;
  }

  &.md {
    padding: 12px;
  }

  &.lg {
    padding: 16px;
  }

  &.xl {
    padding: 18px;
  }
}`
