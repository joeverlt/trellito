import { Back } from '@/components/Back'
import { Board } from '@/components/board/Board'
import { Container } from '@/components/Container'
import { Title } from '@/components/Title'
import { Page } from '@/layouts/Page'
import { useAppSelector } from '@/store/hooks'
import { createSelector } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { boardSelector as selector } from '@/store/reducers/boards.reducer'

const BoardPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const find = (board: Board) => board.id == id
  const memoized = createSelector([selector], (data) => data.find(find))
  const board: Board | undefined = useAppSelector(memoized)

  return (
    <Page title={`Board: ${board?.title}`}>
      <Container>
        <Back />
        <Title title={board?.title as string} top="8px" />
        <Board id={id as string} />
      </Container>
    </Page>
  )
}

export default BoardPage
