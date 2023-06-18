import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { GoogleButton } from '../GoogleButton'
import { Button } from '../Button'
import { Input } from '../Input'
import { useSearchParams } from 'next/navigation'
import { Toast } from '../Toast'
import styled from 'styled-components'

interface SignInFormData {
  email: string
  password: string
}

export const SignInForm: React.FC = () => {
  const searchParams = useSearchParams()
  const callbackUrl: string = searchParams.get('callbackUrl') as string
  const error: string = searchParams.get('error') as string
  const form: UseFormReturn<SignInFormData> = useForm()
  const { handleSubmit } = form

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    signIn('signin', {
      callbackUrl: callbackUrl || '/boards',
      ...data
    })
  }

  return (
    <SignInWrapper>
      <Title>Sign in</Title>
      <SignInFormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          placeholder="email"
          form={form}
          rules={{ required: true }}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          form={form}
          rules={{ required: true }}
        />
        <Button type="submit" label="Sign In" block />
      </SignInFormContainer>
      <span>- or -</span>
      <GoogleButton />
      {error && (
        <Toast
          duration={1000000}
          severity="error"
          message="Invalid username or password. Please make sure you've entered the correct credentials"
        />
      )}
    </SignInWrapper>
  )
}

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 450px;
  margin: 100px auto;

  @media (max-width: 992px) {
    min-width: 290px;
    margin: 50px auto;
  }
`

const SignInFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
`

const Title = styled.h2`
  width: 100%;
  margin-bottom: 20px;
`
