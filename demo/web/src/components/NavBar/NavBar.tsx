import { Text } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { Navigation } from '@surfacedata/sd-components'

const NavBar = () => {
  return (
    <Navigation
      logo={
        <Link to={routes.home()}>
          <Text>LLM Demo</Text>
        </Link>
      }
    />
  )
}

export default NavBar
