import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectTask,
  selectedTaskSelector as selector,
  updateTask
} from '@/store/reducers/tasks.reducer'
import { Dialog } from '../Dialog'
import { EditableParagraph } from '../EditableParagraph'
import { AnyAction, Dispatch, createSelector } from '@reduxjs/toolkit'
import { EditableTitle } from '../EditableTitle'
import { MouseEventHandler } from 'react'

export const TaskDialog: React.FC = () => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const memoizedTask = createSelector([selector], (data) => data)
  const data: Task | undefined = useAppSelector(memoizedTask)

  const onUpdateTask: Function = (description: string) =>
    dispatch(updateTask({ id: data?.id, description }))

  const onUpdateTitle: Function = (title: string) =>
    dispatch(updateTask({ id: data?.id, title }))

  const onClose: MouseEventHandler = () => dispatch(selectTask(undefined))

  return (
    <Dialog show={!!data} onClose={onClose}>
      <TitleWrapper>
        <EditableTitle title={data?.title} onSave={onUpdateTitle} />
      </TitleWrapper>
      <small>list: {data?.listId}</small>
      <EditableParagraph paragraph={data?.description} onSave={onUpdateTask} />
    </Dialog>
  )
}

const TitleWrapper = styled.div`
  padding-right: 40px;
  margin-bottom: 8px;
`
