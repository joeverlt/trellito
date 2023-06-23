import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { MouseEventHandler } from 'react'
import { IconButton } from '../IconButton'
import { FaTimesCircle } from 'react-icons/fa'
import { useDeleteCardMutation } from '@/store/services'
import { Loading } from '../Loading'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { useAppDispatch } from '@/store/hooks'
import { selectCard } from '@/store/reducers/card.reducer'

interface CardProps {
  data: Card
  list: string
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const { title, description } = data
  const [deleteCard, { isLoading: isDeleting }] = useDeleteCardMutation()

  const onDeleteCard: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    deleteCard(data.id as string)
  }

  const onSelectCard: MouseEventHandler<HTMLDivElement> = () =>
    dispatch(selectCard(data))

  return (
    <Draggable
      key={data.id}
      draggableId={`card-${data.id}`}
      index={data.position as number}
    >
      {(provided) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onSelectCard}
        >
          <Info>
            <span>{title}</span>
            {description && <Description>{description}</Description>}
          </Info>
          <IconButton
            severity="danger"
            size={18}
            icon={FaTimesCircle}
            onClick={onDeleteCard}
          />
          {isDeleting && <Loading />}
        </CardWrapper>
      )}
    </Draggable>
  )
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  padding: 12px;
  background-color: rgba(50, 50, 60, 0.5);
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 12px;
  gap: 10px;
`

const Description = styled.small`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
