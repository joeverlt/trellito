import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconButton } from './IconButton'
import { FaCheckCircle, FaEdit, FaTimesCircle } from 'react-icons/fa'

interface EditableParagraphProps {
  title?: string
  onSave: Function
}

export const EditableTitle: React.FC<EditableParagraphProps> = ({
  title,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [text, setText] = useState<string>(title || '')

  const handleTextClick: MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    setIsEditing(true)
  }

  const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    setText(event.currentTarget.value)
  }

  const handleInputClick: MouseEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
  }

  useEffect(() => {
    setText(title || '')
  }, [title])

  return (
    <EditableTitleWrapper>
      {isEditing ? (
        <EditableInputWrapper>
          <EditableInput
            value={text}
            onInput={handleInput}
            onClick={handleInputClick}
            autoFocus
          />
          <ButtonContainer>
            <IconButton
              icon={FaCheckCircle}
              severity="success"
              size={16}
              onClick={(event) => {
                event.stopPropagation()
                event.nativeEvent.preventDefault()
                setIsEditing(false)
                onSave(text)
              }}
            />
            <IconButton
              icon={FaTimesCircle}
              severity="danger"
              size={16}
              onClick={(event) => {
                event.stopPropagation()
                event.nativeEvent.preventDefault()
                setIsEditing(false)
              }}
            />
          </ButtonContainer>
        </EditableInputWrapper>
      ) : (
        <TitleWrapper onClick={handleTextClick}>
          <Title>{text}</Title>
          <IconButton
            icon={FaEdit}
            severity="muted"
            size={16}
            onClick={handleTextClick}
          />
        </TitleWrapper>
      )}
    </EditableTitleWrapper>
  )
}

const EditableTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  margin-right: 8px;
`

const Title = styled.h3<{ hasText?: string }>`
  font-size: 16px;
  position: relative;
  text-transform: capitalize;
  margin-right: 12px;
  height: 20px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const EditableInput = styled.input`
  font-size: 16px;
  background-color: rgba(50, 50, 60, 0.5);
  color: white;
  border-radius: 8px;
  padding: 12px 16px;
  width: 100%;
  border: none;
  flex: 1 1;

  &:focus-visible {
    outline: 0;
  }
`

const EditableInputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
