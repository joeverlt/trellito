import { Back } from '@/components/Back'
import { Board } from '@/components/board/Board'
import { Container } from '@/components/Container'
import { Title } from '@/components/Title'
import { useGetBoardQuery } from '@/store/services'
import { useRouter } from 'next/router'
import Page from '@/layouts/Page'
import { Loading } from '@/components/Loading'

const BoardPage: React.FC = () => {
  const router = useRouter()
  const id: string = router.query.id as string
  const { data: board, isLoading } = useGetBoardQuery(id)

  return (
    <Page title={`Board: ${board?.title}`}>
      <Container>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Back />
            <Title title={`Board: ${board?.title}`} top="22px" />
            <Board board={board as Board} />
          </>
        )}
      </Container>
    </Page>
  )
}

export default BoardPage
