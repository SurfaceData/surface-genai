import { Container, Flex } from '@chakra-ui/react'

import NavBar from 'src/components/NavBar'

type StandardLayoutProps = {
  children?: React.ReactNode
}

const StandardLayout = ({ children }: StandardLayoutProps) => {
  return (
    <Flex direction="column" flex="1" h="100vh">
      <NavBar />
      <Flex as="main" role="main" direction="column" flex="1" pt="2">
        <Container flex="1" maxW="full">
          {children}
        </Container>
      </Flex>
    </Flex>
  )
}

export default StandardLayout
