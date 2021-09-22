import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { FC } from 'react'
import Login from './components/LoginForm'
import Table from 'components/TableForm'

const history = createBrowserHistory()

const App: FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Table} />
      </Switch>
    </Router>
  )
}

export default App
