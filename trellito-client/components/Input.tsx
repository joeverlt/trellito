import { RegisterOptions, UseFormReturn } from 'react-hook-form'
import styled from 'styled-components'

interface IInput {
  name: string
  placeholder?: string
  type?: string
  form: UseFormReturn<any>
  rules?: RegisterOptions
}

export const Input: React.FC<IInput> = ({
  name,
  placeholder,
  type,
  rules,
  form
}) => {
  const { register } = form

  return (
    <StyledInput
      {...register(name, rules)}
      type={type}
      placeholder={placeholder}
      autoFocus
    />
  )
}

const StyledInput = styled.input`
  background-color: rgba(50, 50, 60, 0.5);
  border: black;
  color: white;
  border-radius: 8px;
  padding: 12px 16px;
  width: 100%;
  border: none;

  &:focus-visible {
    outline: 0;
  }
`
