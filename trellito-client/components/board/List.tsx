import styled from 'styled-components'
import { TaskCard } from './TaskCard'
import { AddCard } from '../AddCard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addTask,
  deleteTasks,
  taskSelector as selector
} from '@/store/reducers/tasks.reducer'
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
  const filter = (task: Task) => task.listId == id
  const memoized = createSelector([selector], (data) => data.filter(filter))
  const tasks: Task[] = useAppSelector(memoized)

  const onSave: Function = (data: Task) => {
    data.listId = id
    dispatch(addTask(data))
  }
  const onEdit: Function = (title: string) =>
    dispatch(updateList({ id, title }))
  const onDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    dispatch(deleteTasks({ listId: id }))
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
          <TasksContainer>
            <Droppable droppableId={`list-${id}`} direction="vertical">
              {(provided) => (
                <Tasks ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map((task: Task, index: number) => (
                    <TaskCard
                      key={index}
                      data={task}
                      index={index}
                      list={title}
                    />
                  ))}
                  {provided.placeholder}
                </Tasks>
              )}
            </Droppable>
            <AddCard title="Add task" onSave={onSave} />
          </TasksContainer>
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

const TasksContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 280px;
  gap: 12px;
`

const Tasks = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 280px;
  gap: 12px;
  min-height: 20px;
`
