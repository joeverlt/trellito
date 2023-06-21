import styled from 'styled-components'
import { Card } from './Card'
import { AddCard } from '../AddCard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addCard,
  deleteCards,
  cardSelector as selector
} from '@/store/reducers/cards.reducer'
import { Draggable } from 'react-beautiful-dnd'
import { AnyAction, Dispatch, createSelector } from '@reduxjs/toolkit'
import { Droppable } from '../Droppable'
import { deleteList, updateList } from '@/store/reducers/lists.reducer'
import { IconButton } from '../IconButton'
import { FaTimesCircle } from 'react-icons/fa'
import { MouseEventHandler } from 'react'
import { EditableTitle } from '../EditableTitle'

interface IList {
  id: string
  title: string
  index: number
}

export const List: React.FC<IList> = ({ id, title, index }) => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const filter = (card: Card) => card.list == id
  const memoized = createSelector([selector], (data) => data.filter(filter))
  const cards: Card[] = useAppSelector(memoized)

  const onSave: Function = (data: Card) => {
    data.list = id
    dispatch(addCard(data))
  }
  const onEdit: Function = (title: string) =>
    dispatch(updateList({ id, title }))
  const onDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    dispatch(deleteCards({ list: id }))
    dispatch(deleteList({ id }))
  }

  return (
    <Draggable key={id} draggableId={`list-${id}`} index={index}>
      {(provided) => (
        <ListContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>
            <EditableTitle title={title} onSave={onEdit} />
            <IconButton
              size={18}
              severity="danger"
              icon={FaTimesCircle}
              onClick={onDelete}
            />
          </Title>
          <CardsContainer>
            <Droppable droppableId={`list-${id}`} direction="vertical">
              {(provided) => (
                <Cards ref={provided.innerRef} {...provided.droppableProps}>
                  {cards.map((card: Card, index: number) => (
                    <Card key={index} data={card} index={index} list={title} />
                  ))}
                  {provided.placeholder}
                </Cards>
              )}
            </Droppable>
            <AddCard title="Add card" onSave={onSave} />
          </CardsContainer>
        </ListContainer>
      )}
    </Draggable>
  )
}

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(22, 24, 28, 0.8);
  padding: 12px;
  gap: 12px;
  border-radius: 8px;
`

const Title = styled.h3`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const CardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 280px;
  gap: 12px;
`

const Cards = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 280px;
  gap: 12px;
  min-height: 20px;
`
