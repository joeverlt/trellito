import Link from 'next/link'
import styled from 'styled-components'
import { IconButton } from '../IconButton'
import { FaTimesCircle } from 'react-icons/fa'
import { useAppDispatch } from '@/store/hooks'
import { deleteBoard, updateBoard } from '@/store/reducers/boards.reducer'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { MouseEventHandler } from 'react'
import { EditableTitle } from '../EditableTitle'

interface IBoardCard {
  id: string
  title: string
}

export const BoardCard: React.FC<IBoardCard> = ({ title, id }) => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch()
  const onDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    event.nativeEvent.preventDefault()
    dispatch(deleteBoard({ id }))
  }

  const onSave: Function = (title: string) =>
    dispatch(updateBoard({ id, title }))

  return (
    <Link href={`/boards/${id}`}>
      <Card>
        <Title>
          <EditableTitle title={title} onSave={onSave} />
          <IconButton
            severity="muted"
            size={18}
            icon={FaTimesCircle}
            onClick={onDelete}
          />
        </Title>
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
