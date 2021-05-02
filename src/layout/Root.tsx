import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { App, Profile, Connect, SignIn } from './'
import { Header, PrivateRoute } from '../components'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const Root = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Header.Body/>
      <Header.User/>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Connect>
          <Switch>
            <PrivateRoute path="/profile" component={Profile} />
            <Route exact path="/" component={App} />
            <Route exact path="/SignIn" component={SignIn} />
          </Switch>
        </Connect>
      </Web3ReactProvider>
    </Router>
  )
}

export default Root
