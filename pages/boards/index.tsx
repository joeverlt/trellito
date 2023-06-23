import { Boards } from '@/components/boards/Boards'
import { Container } from '@/components/Container'
import { Loading } from '@/components/Loading'
import { Title } from '@/components/Title'
import Page from '@/layouts/Page'
import { useGetBoardsQuery } from '@/store/services'

const BoardsPage: React.FC = () => {
  const { data: boards, isLoading } = useGetBoardsQuery()

  return (
    <Page title="Boards">
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Title title="Boards" top="48px" />
            <Boards boards={boards as Board[]} />
          </>
        )}
      </Container>
    </Page>
  )
}

export default BoardsPage
