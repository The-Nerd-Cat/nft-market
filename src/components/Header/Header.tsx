import { useHistory } from 'react-router'
import { Flex, Heading, Image, Link as Links } from 'theme-ui'
import { UserMenu } from '..'
import { Link } from 'react-router-dom'
import { useStateContext } from '../../state/'

export type HeaderProps = {
  //
}

const Header = () => {
  const {
    state: { user },
} = useStateContext()

  const history = useHistory()

  return (
    <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', bg: 'white', borderBottom: '2px gray solid', p: 3 }} as="nav">
      <Flex
      onClick={() => {
        history.push('/')
        }}
        sx={{ 
          ml: 2, 
          mr: 4, 
          pr: 4, 
          color: 'primary', 
          borderRight: '2px gray solid', 
          cursor: 'pointer',
          alignItems: 'center'
         }}
        as="h4"
      >
      <Image
        onClick={() => {
          history.push('/')
        }}
        sx={{ width: 50 }}
        src="/static/logo.jpeg"
      />  
        ASKNIGHTS
      </Flex>
      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/">Market</Link>
      </Links>
      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/">Activity</Link>
      </Links>
      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/">Features</Link>
      </Links>
      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/">Community</Link>
      </Links>
      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/">Search</Link>
      </Links>

      {!user?
      <Links sx={{ marginX: 2, textDecoration: 'none', color: 'gray' }}>
        <Link to="/SignIn">Sign In</Link>
      </Links>:
      <Flex sx={{}} >
        <UserMenu />
      </Flex>
      }
    </Flex>
  )
}

export default Header
