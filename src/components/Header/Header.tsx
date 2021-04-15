import { useHistory } from 'react-router'
import { Flex, Heading, Image, Button, Link as Links, Spinner } from 'theme-ui'
import { UserMenu } from '..'
import { Link } from 'react-router-dom'
import { ActionType, useStateContext } from '../../state/'
import { connectorsByName } from '../../connectors/'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'

export type HeaderProps = {
  //
}

const Header = () => {

  const {
    dispatch,
    state: { user, activatingConnector },
  } = useStateContext()
  const { connector, activate } = useWeb3React()

  const history = useHistory()
  const currentConnector = connectorsByName[window.name as keyof typeof connectorsByName]
  // eslint-disable-next-line no-restricted-globals
  const activating = currentConnector === activatingConnector
  const connected = currentConnector === connector

  return (
    <Flex sx={{ justify: 'space-between', alignItems: 'center', bg: 'white', p: 3 }} as="nav">
      <Image
        onClick={() => {
          history.push('/')
        }}
        sx={{ width: 50, cursor: 'pointer' }}
        src="/static/logo.jpeg"
      />
      <Heading 
        onClick={() => {
          history.push('/')
        }}
      sx={{ ml: 2, mr: 4, pr: 4, color: 'primary', borderRight: '2px gray solid' }} as="h4">
        ASKNIGHTS
      </Heading>

      <UserMenu />

      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/Discover" >Discover</Link>
      </Links>
      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/" >How it Works</Link>
      </Links>
      

      <Button sx={{maxWidth: '10%', marginX: 2}} >Primary</Button>
      <Button variant='secondary' sx={{maxWidth: '10%', marginX: 2}} >Conect Wallet</Button>
      
      {!user ? (
        <>
        {Object.keys(connectorsByName).map((name: string) => {
              const currentConnector = connectorsByName[name as keyof typeof connectorsByName]
              const activating = currentConnector === activatingConnector
              const connected = currentConnector === connector
              return (
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
                  {'Conect Wallet '}
                  {name}
                  {activating && <Spinner size={20} color="white" sx={{ ml: 3 }} />}
                </Button>
              )
            }
          )
        }
        </>
        ) : <Button variant='secondary' sx={{maxWidth: '10%', marginX: 2}} >Conect Wallet</Button>
      }

    </Flex>
  )
}

export default Header
