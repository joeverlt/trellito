import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch } from '@/store/hooks'
import { deleteCard, selectCard } from '@/store/reducers/cards.reducer'
import { MouseEventHandler } from 'react'
import { IconButton } from '../IconButton'
import { FaTimesCircle } from 'react-icons/fa'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'

interface ICard {
  data: Card
  index: number
  list: string
}

export const Card: React.FC<ICard> = ({ data, index }) => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const { title, description } = data

  const onDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    dispatch(deleteCard({ id: data.id }))
  }

  const onSelectCard: MouseEventHandler<HTMLDivElement> = () => {
    dispatch(selectCard(data))
  }

  return (
    <Draggable key={data.id} draggableId={`card-${data.id}`} index={index}>
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
            onClick={onDelete}
          />
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
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  line-height: 12px;
  gap: 10px;
`

const Description = styled.small`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
