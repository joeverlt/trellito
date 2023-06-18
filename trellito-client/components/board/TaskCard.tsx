import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch } from '@/store/hooks'
import {
  deleteTask,
  selectTask,
  updateTask
} from '@/store/reducers/tasks.reducer'
import { MouseEventHandler } from 'react'
import { IconButton } from '../IconButton'
import { FaTimesCircle } from 'react-icons/fa'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'

interface ITaskCard {
  data: Task
  index: number
  list: string
}

export const TaskCard: React.FC<ITaskCard> = ({ data, index }) => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const { title, description } = data

  const onDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    dispatch(deleteTask({ id: data.id }))
  }

  const onSelectTask: MouseEventHandler<HTMLDivElement> = () => {
    dispatch(selectTask(data))
  }

  return (
    <Draggable key={data.id} draggableId={`task-${data.id}`} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onSelectTask}
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
        </Card>
      )}
    </Draggable>
  )
}

const Card = styled.div`
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
