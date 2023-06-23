import { BoardCard } from './BoardCard'
import { AddCard } from '../AddCard'
import styled from 'styled-components'
import { useAddBoardMutation, useGetBoardsQuery } from '@/store/services'

interface BoardsProps {
  boards: Board[]
}

export const Boards: React.FC<BoardsProps> = ({ boards }) => {
  const [addBoard, { isLoading: isAdding }] = useAddBoardMutation()

  const onAddBoard: Function = (data: Board) => addBoard(data)

  return (
    <BoardsContainer>
      <BoardCards>
        {boards?.map((board: Board) => (
          <BoardCard key={board.id} board={board} />
        ))}
        <AddWrapper>
          <AddCard
            block
            title="Add board"
            onAdd={onAddBoard}
            loading={isAdding}
          />
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
