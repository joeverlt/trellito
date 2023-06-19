import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { GoogleButton } from '../GoogleButton'
import { Button } from '../Button'
import { Input } from '../Input'
import styled from 'styled-components'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const isDevelopmentMode = process.env.ENVIRONMENT === 'development'

export const SignUpForm: React.FC = () => {
  const form: UseFormReturn<SignUpFormData> = useForm()
  const { handleSubmit } = form

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    await signIn('signup', {
      callbackUrl: '/boards',
      ...data
    })
  }

  return (
    <SignUpWrapper>
      <Title>Sign up</Title>
      {isDevelopmentMode && (
        <>
          <SignUpFormContainer onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="name"
              placeholder="name"
              form={form}
              rules={{ required: true }}
            />
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
          </SignUpFormContainer>
          <span>- or -</span>
        </>
      )}
      <GoogleButton />
    </SignUpWrapper>
  )
}

const SignUpWrapper = styled.div`
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

const SignUpFormContainer = styled.form`
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
