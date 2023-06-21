import { Boards } from '@/components/boards/Boards'
import { Container } from '@/components/Container'
import { Title } from '@/components/Title'
import { Page } from '@/layouts/Page'

const BoardsPage: React.FC = () => {
  return (
    <Page title="Boards">
      <Container>
        <Title title="Boards" top="48px" />
        <Boards />
      </Container>
    </Page>
  )
}

export default BoardsPage
