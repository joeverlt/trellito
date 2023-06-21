import { MouseEventHandler, useState } from 'react'
import { Input } from './Input'
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { Button } from './Button'
import { FaTimesCircle } from 'react-icons/fa'
import { IconButton } from './IconButton'
import styled, { css } from 'styled-components'

interface IAddCardData {
  title: string
}

interface IAddCard {
  block?: boolean
  title?: string
  onSave: Function
}

export const AddCard: React.FC<IAddCard> = ({ block, title, onSave }) => {
  const [adding, setAdding] = useState<boolean>(false)
  const form: UseFormReturn<IAddCardData> = useForm()
  const { handleSubmit, setValue } = form

  const onAdd: MouseEventHandler<HTMLFormElement> = () => setAdding(true)

  const onCancel: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    setValue('title', '')
    setAdding(false)
  }

  const onSubmit: SubmitHandler<IAddCardData> = (data) => {
    onSave(data)
    setValue('title', '')
  }

  return (
    <AddCardWrapper
      block={block ? 'true' : undefined}
      adding={adding ? 'true' : undefined}
      onSubmit={handleSubmit(onSubmit)}
      onClick={onAdd}
    >
      {!adding && <span>{title}</span>}
      {adding && (
        <>
          <Input
            name="title"
            placeholder="Title"
            form={form}
            rules={{ required: true }}
          />
          <Footer>
            <Button label="Save" type="submit" />
            <IconButton
              size={24}
              severity="danger"
              icon={FaTimesCircle}
              onClick={onCancel}
            />
          </Footer>
        </>
      )}
    </AddCardWrapper>
  )
}

const AddCardWrapper = styled.form<{ block?: string; adding?: string }>`
  cursor: pointer;
  padding: 16px;
  border: 2px dashed rgba(50, 50, 60, 0.5);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;

  ${({ block }) =>
    block &&
    css`
      height: 128px;
    `}

  ${({ adding }) =>
    adding &&
    css`
      cursor: pointer;
      padding: 16px;
      border: 2px dashed rgba(50, 50, 60, 0.5);
      border-radius: 8px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    `};

  @media (max-width: 992px) {
    border: 3px dashed rgba(50, 50, 60, 0.5);
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`
