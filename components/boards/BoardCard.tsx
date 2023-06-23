import Link from 'next/link'
import styled from 'styled-components'
import { IconButton } from '../IconButton'
import { FaTimesCircle } from 'react-icons/fa'
import { MouseEventHandler } from 'react'
import { EditableTitle } from '../EditableTitle'
import {
  useDeleteBoardMutation,
  useUpdateBoardMutation
} from '@/store/services'
import { Loading } from '../Loading'

interface BoardCardProps {
  board: Board
}

export const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const [deleteBoard, { isLoading: isDeleting }] = useDeleteBoardMutation()
  const [updateBoard, { isLoading: isUpdating }] = useUpdateBoardMutation()
  const { title, id } = board

  const onDeleteBoard: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    deleteBoard(id as string)
  }

  const onUpdate: Function = (title: string) => updateBoard({ id, title })

  return (
    <Link href={`/boards/${id}`}>
      <Card>
        <Title>
          <EditableTitle title={title} onEdit={onUpdate} />
          <IconButton
            severity="muted"
            size={18}
            icon={FaTimesCircle}
            onClick={onDeleteBoard}
          />
        </Title>
        {(isDeleting || isUpdating) && <Loading />}
      </Card>
    </Link>
  )
}

const Card = styled.div`
  padding: 16px;
  background-color: rgba(50, 50, 60, 0.5);
  width: 256px;
  height: 128px;
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  @media (max-width: 992px) {
    width: 320px;
  }
`

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
