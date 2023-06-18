import { Container } from '@/components/Container'
import { Title } from '@/components/Title'
import { Page } from '@/layouts/Page'

const HomePage: React.FC = () => {
  return (
    <Page title="Boards">
      <Container>
        <Title title="Welcome to TRELLITO" />
      </Container>
    </Page>
  )
}

export default HomePage
