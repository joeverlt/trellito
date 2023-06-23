import styled from 'styled-components'
import { List } from './List'
import { AddCard } from '../AddCard'
import {
  DragDropContext,
  OnDragEndResponder,
  DropResult
} from 'react-beautiful-dnd'
import { Droppable } from '../Droppable'
import { CardDialog } from './CardDialog'
import {
  useAddListMutation,
  useMoveCardMutation,
  useSortCardMutation,
  useSortListMutation
} from '@/store/services'

interface BoardProps {
  board: Board
}

interface MoveCardData {
  fromPosition: number
  toPosition: number
  cardId: string
  fromListId: string
  toListId: string
}

interface SortData {
  from: number
  to: number
}

interface SortCardData extends SortData {
  listId: string
}

export const Board: React.FC<BoardProps> = ({ board }) => {
  const [addList, { isLoading: isUpdating }] = useAddListMutation()
  const [sortList] = useSortListMutation()
  const [sortCard] = useSortCardMutation()
  const [moveCard] = useMoveCardMutation()
  const { id, lists } = board

  const onAddList: Function = (data: List) => {
    data.board = id
    data.position = lists?.length
    addList(data)
  }

  const onSortList: Function = (data: SortData) =>
    sortList({ ...data, boardId: id as string })

  const onSortCard: Function = (data: SortCardData) =>
    sortCard({ ...data, boardId: id as string })

  const onMoveCard = (data: MoveCardData) =>
    moveCard({ ...data, boardId: id as string })

  const handleDragEnd: OnDragEndResponder = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result
    const [element, id] = result.draggableId.split('-')
    const [_a, destinationId] = result.destination.droppableId.split('-')
    const [_b, sourceId] = result.source.droppableId.split('-')

    switch (element) {
      case 'list':
        onSortList({
          from: source.index,
          to: destination.index
        })
        break
      case 'card':
        if (source.droppableId === destination.droppableId) {
          onSortCard({
            from: source.index,
            to: destination.index,
            listId: destinationId
          })
        } else {
          onMoveCard({
            cardId: id,
            fromPosition: source.index,
            toPosition: destination.index,
            fromListId: sourceId,
            toListId: destinationId
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
                {lists &&
                  lists.map((list) => (
                    <div key={list.id} style={{ maxWidth: '304px' }}>
                      <List list={list} />
                    </div>
                  ))}
                {provided.placeholder}
                <div style={{ minWidth: '304px' }}>
                  <AddCard
                    title="Add list"
                    loading={isUpdating}
                    onAdd={onAddList}
                  />
                </div>
              </Lists>
            )}
          </Droppable>
        </BoardContainer>
      </DragDropContext>
      <CardDialog />
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
