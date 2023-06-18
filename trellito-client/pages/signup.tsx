import { SignUpForm } from '@/components/signup/SignUpForm'
import { Container } from '@/components/Container'
import { Page } from '@/layouts/Page'

const SignUpPage: React.FC = () => {
  return (
    <Page title="Sign Up">
      <Container>
        <SignUpForm />
      </Container>
    </Page>
  )
}

export default SignUpPage
