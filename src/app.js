import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/common/Navbar'
import { HashRouter, Route, Switch } from 'react-router-dom'


import SecureRoute from './components/common/SecureRoute'

import DishesIndex from './components/dishes/Index'
import DishShow from './components/dishes/Show'
import DishNew from './components/dishes/New'
import Ratings from './components/common/Ratings'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Home from './components/pages/Home'

import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Navbar />
        <Switch>

          <SecureRoute path='/dishes/new' component={DishNew} />
          <Route path='/dishes/:id/ratings' component={Ratings} />
          <Route path='/dishes/:id' component={DishShow} />
          <Route path='/dishes' component={DishesIndex} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Home} />

        </Switch>
      </HashRouter>

    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
