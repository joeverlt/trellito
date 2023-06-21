import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import { IconButton } from './IconButton'
import { FaCheckCircle, FaEdit, FaTimesCircle } from 'react-icons/fa'

interface EditableParagraphProps {
  paragraph?: string
  onSave: Function
}

export const EditableParagraph: React.FC<EditableParagraphProps> = ({
  paragraph,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [text, setText] = useState<string>(paragraph || '')

  const handleTextClick: MouseEventHandler<
    HTMLDivElement | HTMLParagraphElement | HTMLButtonElement
  > = () => setIsEditing(true)

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setText(event.target.value)
  }

  useEffect(() => {
    setText(paragraph || '')
  }, [paragraph])

  return (
    <ParagraphWrapper>
      {isEditing ? (
        <EditableTextareaWrapper>
          <EditableTextarea
            value={text}
            onChange={handleTextareaChange}
            autoFocus
          />
          <ButtonContainer>
            <IconButton
              icon={FaCheckCircle}
              severity="success"
              onClick={() => {
                setIsEditing(false)
                onSave(text)
              }}
            />
            <IconButton
              icon={FaTimesCircle}
              severity="danger"
              onClick={() => setIsEditing(false)}
            />
          </ButtonContainer>
        </EditableTextareaWrapper>
      ) : !text ? (
        <ParagraphTextEmpty onClick={handleTextClick}>
          [ add description ]
        </ParagraphTextEmpty>
      ) : (
        <ParagraphTextWrapper onClick={handleTextClick}>
          <ParagraphText>{text}</ParagraphText>
          <IconButton
            icon={FaEdit}
            severity="muted"
            size={16}
            onClick={handleTextClick}
          />
        </ParagraphTextWrapper>
      )}
    </ParagraphWrapper>
  )
}

const ParagraphWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin: 18px 0px 0px 0px;
  width: 100%;
`

const ParagraphText = styled.p<{ hasText?: string }>`
  font-size: 16px;
  position: relative;
  color: #9fadbc55;
  text-transform: capitalize;
  margin-right: 12px;
  height: 20px;
`

const ParagraphTextEmpty = styled.p`
  font-size: 16px;
  position: relative;
  color: #9fadbc55;
`

const ParagraphTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const EditableTextarea = styled.textarea`
  font-size: 16px;
  resize: vertical;
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

const EditableTextareaWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
