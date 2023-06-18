import styled from 'styled-components'

interface IContainer {
  children: React.ReactNode
}

export const Container: React.FC<IContainer> = ({ children }) => {
  return (
    <ContainerWrapper>
      <ContainerContent>{children}</ContainerContent>
    </ContainerWrapper>
  )
}

const ContainerWrapper = styled.div`
  width: 100vw;
  flex: 1 1;
  overflow: auto;
  height: 100%;
`

const ContainerContent = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 30px 0 0 0;
  height: 100%;

  @media (max-width: 992px) {
    height: calc(100vh - 123px);
  }
`
