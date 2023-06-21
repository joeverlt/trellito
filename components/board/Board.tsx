import styled from 'styled-components'
import { List } from './List'
import { AddCard } from '../AddCard'
import {
  addList,
  listSelector as selector,
  sortList
} from '@/store/reducers/lists.reducer'
import {
  DragDropContext,
  OnDragEndResponder,
  DropResult
} from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Droppable } from '../Droppable'
import { moveCard, sortCard } from '@/store/reducers/cards.reducer'
import { AnyAction, createSelector } from '@reduxjs/toolkit'
import { CardDialog } from './CardDialog'
import { Dispatch } from 'react'

interface IBoard {
  id: string
}

export const Board: React.FC<IBoard> = ({ id }) => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const filter = (list: List) => list.board == id
  const memoized = createSelector([selector], (data) => data.filter(filter))
  const lists: List[] = useAppSelector(memoized)

  const onSave: Function = (data: List) => {
    data.board = id
    dispatch(addList(data))
  }

  const onSortList: Function = (data: { from: number; to: number }) =>
    dispatch(sortList({ ...data, board: id }))

  const onSortCard: Function = (data: {
    from: number
    to: number
    list: string
  }) => dispatch(sortCard(data))

  const onMoveCard = (data: {
    from: number
    to: number
    list: string
    id: string
  }) => dispatch(moveCard(data))

  const handleDragEnd: OnDragEndResponder = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result
    const [element, id] = result.draggableId.split('-')
    const [_, code] = result.destination.droppableId.split('-')

    switch (element) {
      case 'list':
        onSortList({ from: source.index, to: destination.index })
        break
      case 'card':
        if (source.droppableId === destination.droppableId)
          onSortCard({
            from: source.index,
            to: destination.index,
            list: code
          })
        else {
          onMoveCard({
            id,
            from: source.index,
            to: destination.index,
            list: code
          })
        }
        break
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <BoardContainer>
          <Droppable
            droppableId={`board-${id}`}
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <Lists ref={provided.innerRef} {...provided.droppableProps}>
                {lists.map((list, index) => (
                  <div key={list.id} style={{ maxWidth: '304px' }}>
                    <List
                      id={list.id as string}
                      index={index}
                      title={list.title as string}
                    />
                  </div>
                ))}
                {provided.placeholder}
                <div style={{ minWidth: '304px' }}>
                  <AddCard title="Add list" onSave={onSave} />
                </div>
              </Lists>
            )}
          </Droppable>
        </BoardContainer>
      </DragDropContext>
      <CardDialog />
    </>
  )
}

const BoardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px;
  height: 100%;

  @media (max-width: 992px) {
    flex: 1 1;
    gap: 0px;
  }
`

const Lists = styled.div`
  display: flex;
  min-width: 992px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 24px;
  padding-bottom: 24px;
  margin: 0 auto;
`
