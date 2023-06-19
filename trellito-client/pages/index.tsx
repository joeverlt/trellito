import { Container } from '@/components/Container'
import { Paragraph } from '@/components/Paragraph'
import { Title } from '@/components/Title'
import { Page } from '@/layouts/Page'

const HomePage: React.FC = () => {
  return (
    <Page title="Boards">
      <Container>
        <Title title="TRELLITO" />
        <Paragraph>
          Trellito is an application inspired by Trello that allows you to
          organize your tasks and projects efficiently and collaboratively.
        </Paragraph>
        <Paragraph>
          With an intuitive and user-friendly interface, Trellito helps you
          maintain control and visibility of your projects, allowing you to
          manage your tasks effectively.
        </Paragraph>
      </Container>
    </Page>
  )
}

export default HomePage
