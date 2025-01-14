import { Flex, Heading, Box } from 'theme-ui'
import { useHistory } from 'react-router'
import { EtherSymbol } from '@ethersproject/constants'
import { useStateContext } from '../../state'
import { Identicon } from '..'
import { toShort } from '../../utils'

export type UserMenuProps = {
  //
}

const UserMenu = () => {
  const {
    state: { user, isAuthenticated },
  } = useStateContext()

  const history = useHistory()

  return (
    <Flex sx={{ ml: 'auto', justifySelf: 'flex-end' }}>
      {isAuthenticated && user && (
        <>
          <Box>
            <Heading sx={{ p: 0, color: 'primary' }} as="h4">
              {toShort(user.address)}
            </Heading>
            <Heading sx={{ p: 0, mt: 1, textAlign: 'right', color: 'primary' }} as="h5">
              {EtherSymbol}
              {user.balance}
            </Heading>
          </Box>
          <Box
            onClick={() => {
              history.push('/profile')
            }}
            sx={{
              cursor: 'pointer',
              ml: 3,
              height: 30,
              width: 30,
              borderRadius: '100%',
            }}
          >
            <Identicon size={30} address={user.address} />
          </Box>
        </>
      )}
    </Flex>
  )
}

export default UserMenu
