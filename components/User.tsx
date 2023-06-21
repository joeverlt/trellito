import styled from 'styled-components'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { Button } from './Button'

interface IUser {
  data: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export const User: React.FC<IUser> = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const handleToggleDropdown = () => setShowDropdown(!showDropdown)
  const handleSignOut = () => signOut({ callbackUrl: '/signin' })

  return (
    <UserWrapper onClick={handleToggleDropdown}>
      <UserInfo>
        <UserName mobile="false">{data.name}</UserName>
        <UserEmail mobile="false">{data.email}</UserEmail>
      </UserInfo>
      <UserAvatar>
        {data.image ? (
          <Image
            width="32"
            height="32"
            alt="User image"
            src={data.image as string}
          />
        ) : (
          <h3>{data.name?.slice(0, 1)}</h3>
        )}
      </UserAvatar>

      <UserDropdown show={showDropdown ? 'true' : undefined}>
        <Button
          label="Sign Out"
          onClick={handleSignOut}
          severity="mute"
          block
        />
      </UserDropdown>
    </UserWrapper>
  )
}

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  gap: 8px;
  position: relative;
  cursor: pointer;

  @media (max-width: 992px) {
    align-items: center;
  }
`

const UserInfo = styled.div<{ mobile?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  user-select: none;

  @media (max-width: 992px) {
    display: ${({ mobile }) => (mobile ? 'none' : 'flex')};
    align-items: center;
  }
`

const UserName = styled.span<{ mobile?: string }>`
  font-size: 0.8rem;

  @media (max-width: 992px) {
    display: ${({ mobile }) => (mobile ? 'none' : 'block')};
  }
`

const UserEmail = styled.small<{ mobile?: string }>`
  font-size: 0.6rem;

  @media (max-width: 992px) {
    display: ${({ mobile }) => (mobile ? 'none' : 'block')};
  }
`

const UserDropdown = styled.div<{ show?: string }>`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 9999;
  background-color: rgba(50, 50, 60, 0.5);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 12px 12px;
  padding: 8px;
  width: 128px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(125, 125, 154, 0.5);
  border-radius: 36px;
  overflow: hidden;
`
