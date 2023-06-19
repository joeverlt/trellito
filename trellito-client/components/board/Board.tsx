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
import { moveTask, sortTask } from '@/store/reducers/tasks.reducer'
import { AnyAction, createSelector } from '@reduxjs/toolkit'
import { TaskDialog } from './TaskDialog'
import { Dispatch } from 'react'

interface IBoard {
  id: string
}

export const Board: React.FC<IBoard> = ({ id }) => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const filter = (list: List) => list.boardId == id
  const memoized = createSelector([selector], (data) => data.filter(filter))
  const lists: List[] = useAppSelector(memoized)

  const onSave: Function = (data: List) => {
    data.boardId = id
    dispatch(addList(data))
  }

  const onSortList: Function = (data: { from: number; to: number }) =>
    dispatch(sortList({ ...data, boardId: id }))

  const onSortTask: Function = (data: {
    from: number
    to: number
    listId: string
  }) => dispatch(sortTask(data))

  const onMoveTask = (data: {
    from: number
    to: number
    listId: string
    id: string
  }) => dispatch(moveTask(data))

  const handleDragEnd: OnDragEndResponder = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result
    const [element, id] = result.draggableId.split('-')
    const [_, code] = result.destination.droppableId.split('-')

    switch (element) {
      case 'list':
        onSortList({ from: source.index, to: destination.index })
        break
      case 'task':
        if (source.droppableId === destination.droppableId)
          onSortTask({
            from: source.index,
            to: destination.index,
            listId: code
          })
        else {
          onMoveTask({
            id,
            from: source.index,
            to: destination.index,
            listId: code
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
                  <div style={{ maxWidth: '304px' }}>
                    <List
                      id={list.id as string}
                      key={list.id}
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
      <TaskDialog />
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
