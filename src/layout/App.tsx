import { Container, Flex } from 'theme-ui'

import { Gallery } from '../components'
import { useStateContext } from '../state'

const App = () => {
  const {
    state: { user },
  } = useStateContext()


  return (
    <Container>
      {!user ? (
        <>
          <Flex sx={{ justifyContent: 'center' }}>
            Hi! am gonna be a sexy index!
          </Flex>
        </>
      ) : (
        <Gallery />
      )}
    </Container>
  )
}

export default App
