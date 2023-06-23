import { AnyAction, Dispatch, createSelector } from '@reduxjs/toolkit'
import { Dialog } from '../Dialog'
import { selectedCardSelector as selector } from '@/store/reducers/card.reducer'
import { EditableParagraph } from '../EditableParagraph'
import { EditableTitle } from '../EditableTitle'
import { MouseEventHandler } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectCard } from '@/store/reducers/card.reducer'
import styled from 'styled-components'
import { useUpdateCardMutation } from '@/store/services'

export const CardDialog: React.FC = () => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const memoizedCard = createSelector([selector], (data) => data)
  const [updateCard, { isLoading: isUpdating }] = useUpdateCardMutation()
  const data: Card | undefined = useAppSelector(memoizedCard)

  const onUpdateCard: Function = (description: string) =>
    updateCard({ id: data?.id, description })

  const onUpdateTitle: Function = (title: string) =>
    updateCard({ id: data?.id, title })

  const onClose: MouseEventHandler = () => dispatch(selectCard(undefined))

  return (
    <Dialog show={!!data} onClose={onClose}>
      <TitleWrapper>
        <EditableTitle title={data?.title} onEdit={onUpdateTitle} />
      </TitleWrapper>
      <small>list: {data?.list}</small>
      <EditableParagraph paragraph={data?.description} onEdit={onUpdateCard} />
    </Dialog>
  )
}

const TitleWrapper = styled.div`
  padding-right: 40px;
  margin-bottom: 8px;
`
