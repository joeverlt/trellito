import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectCard,
  selectedCardSelector as selector,
  updateCard
} from '@/store/reducers/cards.reducer'
import { Dialog } from '../Dialog'
import { EditableParagraph } from '../EditableParagraph'
import { AnyAction, Dispatch, createSelector } from '@reduxjs/toolkit'
import { EditableTitle } from '../EditableTitle'
import { MouseEventHandler } from 'react'

export const CardDialog: React.FC = () => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const memoizedCard = createSelector([selector], (data) => data)
  const data: Card | undefined = useAppSelector(memoizedCard)

  const onUpdateCard: Function = (description: string) =>
    dispatch(updateCard({ id: data?.id, description }))

  const onUpdateTitle: Function = (title: string) =>
    dispatch(updateCard({ id: data?.id, title }))

  const onClose: MouseEventHandler = () => dispatch(selectCard(undefined))

  return (
    <Dialog show={!!data} onClose={onClose}>
      <TitleWrapper>
        <EditableTitle title={data?.title} onSave={onUpdateTitle} />
      </TitleWrapper>
      <small>list: {data?.list}</small>
      <EditableParagraph paragraph={data?.description} onSave={onUpdateCard} />
    </Dialog>
  )
}

const TitleWrapper = styled.div`
  padding-right: 40px;
  margin-bottom: 8px;
`
