import styled from 'styled-components'
import { Card } from './Card'
import { AddCard } from '../AddCard'
import { Draggable } from 'react-beautiful-dnd'
import { Droppable } from '../Droppable'
import { IconButton } from '../IconButton'
import { FaTimesCircle } from 'react-icons/fa'
import { MouseEventHandler } from 'react'
import { EditableTitle } from '../EditableTitle'
import {
  useAddCardMutation,
  useDeleteListMutation,
  useUpdateListMutation
} from '@/store/services'
import { Loading } from '../Loading'

interface ListProps {
  list: List
}

export const List: React.FC<ListProps> = ({ list }) => {
  const [deleteList, { isLoading: isDeleting }] = useDeleteListMutation()
  const [updateList, { isLoading: isUpdating }] = useUpdateListMutation()
  const [addCard, { isLoading: isAdding }] = useAddCardMutation()

  const onAddCard: Function = (data: Card) => {
    data.list = list.id
    data.position = list.cards.length
    addCard(data)
  }
  const onUpdateList: Function = (title: string) =>
    updateList({ id: list.id, title })

  const onDeleteList: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    deleteList(list.id as string)
  }

  return (
    <Draggable
      key={list.id}
      draggableId={`list-${list.id}`}
      index={list.position as number}
    >
      {(provided) => (
        <ListContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>
            <EditableTitle title={list?.title} onEdit={onUpdateList} />
            <IconButton
              size={18}
              severity="danger"
              icon={FaTimesCircle}
              onClick={onDeleteList}
            />
          </Title>
          <CardsContainer>
            <Droppable droppableId={`list-${list.id}`} direction="vertical">
              {(provided) => (
                <Cards ref={provided.innerRef} {...provided.droppableProps}>
                  {list?.cards.map((card: Card, index: number) => (
                    <Card
                      key={index}
                      data={card}
                      list={list?.title as string}
                    />
                  ))}
                  {provided.placeholder}
                </Cards>
              )}
            </Droppable>
            <AddCard title="Add card" onAdd={onAddCard} loading={isAdding} />
          </CardsContainer>
          {(isDeleting || isUpdating) && <Loading />}
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
  position: relative;
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
