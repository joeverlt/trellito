import { SignInForm } from '@/components/signin/SignInForm'
import { Container } from '@/components/Container'
import { Page } from '@/layouts/Page'

const SignInPage: React.FC = () => {
  return (
    <Page title="Sign In">
      <Container>
        <SignInForm />
      </Container>
    </Page>
  )
}

export default SignInPage
