import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/common/Navbar'
import { HashRouter, Route, Switch } from 'react-router-dom'

import DishesIndex from './components/dishes/Index'
import DishShow from './components/dishes/Show'
import Register from './components/auth/register'
import Login from './components/auth/login'

import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Navbar/>
        <Switch>

          <Route path='/dishes/:id' component={DishShow} />
          <Route path='/dishes' component={DishesIndex} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />

        </Switch>
      </HashRouter>

    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
