import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from './Button'

export const GoogleButton: React.FC = () => {
  const queryParams: ReadonlyURLSearchParams = useSearchParams()
  const callbackUrl: string = queryParams.get('callbackUrl') || '/'

  return (
    <Button
      block
      type="button"
      severity="danger"
      label="Continue with Google"
      onClick={() => signIn('google', { redirect: true, callbackUrl })}
    ></Button>
  )
}
