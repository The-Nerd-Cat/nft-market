import { Container, Flex, Box, Text, Link, Button, Image, Spinner } from 'theme-ui'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { ActionType, useStateContext } from '../state/'
import { connectorsByName } from '../connectors/'

const SignIn = () => {
  const {
    dispatch,
    state: { user, activatingConnector },
  } = useStateContext()
  const { connector, activate } = useWeb3React()
  return (
    <Container>
      {!user ? (
        <Box>
          {Object.keys(connectorsByName).map((name: string) => {
            const currentConnector = connectorsByName[name as keyof typeof connectorsByName]
            const activating = currentConnector === activatingConnector
            const connected = currentConnector === connector
            return (
              <Flex
                sx={{
                  flexDirection: 'column',
                  height: '50vh',
                  mt: 60,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text variant="bold" sx={{ textAlign: 'center' }} as="h1">
                  Welcome! Let's begin with your wallet.
                </Text>

                <Button
                  variant="primary"
                  sx={{
                    borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                    position: 'relative',
                    maxWidth: 250,
                  }}
                  key={name}
                  onClick={() => {
                    dispatch({ type: ActionType.SET_CONNECTOR, payload: currentConnector })
                    activate(
                      connectorsByName[name as keyof typeof connectorsByName] as AbstractConnector
                    )
                  }}
                >
                  {currentConnector === connectorsByName.Metamask && (
                    <Image
                      sx={{ height: 20 }}
                      mr={2}
                      src="https://docs.metamask.io/metamask-fox.svg"
                    />
                  )}
                  {'Connect Wallet '}
                  {name}
                  {activating && <Spinner size={20} color="white" sx={{ ml: 3 }} />}
                </Button>

                <Text mt={2}>
                  You Don't Have a Wallet?{'\n'}
                  Get the fack up from here or get a wallet here! {'  '}
                  <Link
                    sx={{ textDecoration: 'underline' }}
                    href="https://metamask.io"
                    target="_blank"
                  >
                    https://metamask.io
                  </Link>{' '}
                  and install it.
                </Text>
              </Flex>
            )
          })}
        </Box>
      ) : (
        <>seems u already connect, stop to fucking around.</>
      )}
    </Container>
  )
}

export default SignIn
