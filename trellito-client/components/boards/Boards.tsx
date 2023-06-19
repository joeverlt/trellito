import { BoardCard } from './BoardCard'
import { AddCard } from '../AddCard'
import {
  addBoard,
  boardSelector as selector
} from '@/store/reducers/boards.reducer'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AnyAction, Dispatch, createSelector } from '@reduxjs/toolkit'
import styled from 'styled-components'

export const Boards: React.FC = () => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const memoized = createSelector([selector], (data) => data)
  const boards: Board[] = useAppSelector(memoized)

  const onSave: Function = (data: Board) => dispatch(addBoard(data))

  return (
    <BoardsContainer>
      <BoardCards>
        {boards.map((board: Board) => (
          <BoardCard
            key={board.id}
            title={board.title as string}
            id={board.id as string}
          />
        ))}
        <AddWrapper>
          <AddCard block title="Add board" onSave={onSave} />
        </AddWrapper>
      </BoardCards>
    </BoardsContainer>
  )
}

const BoardsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0px;
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
  height: 100%;
  padding: 0 24px;

  @media (max-width: 992px) {
    flex-direction: column;
    width: 100%;
    flex: 1 1;
    margin: 0 auto;
    padding: 0 20px;
    gap: 0px;
  }
`

const BoardCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding-bottom: 20px;

  @media (max-width: 992px) {
    gap: 20px;
  }
`

const AddWrapper = styled.div`
  width: 256px;

  @media (max-width: 992px) {
    width: 320px;
  }
`
