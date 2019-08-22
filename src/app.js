import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/common/Navbar'
import { HashRouter, Route, Switch } from 'react-router-dom'

import DishEdit from './components/dishes/Edit'
import DishesIndex from './components/dishes/Index'
import DishShow from './components/dishes/Show'
import UserShow from './components/users/User'
import UserEdit from './components/users/Edit'
import AddComment from './components/dishes/AddComment'

import SecureRoute from './components/common/SecureRoute'



import DishNew from './components/dishes/New'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Home from './components/pages/Home'
import Footer from '../src/components/common/Footer'
import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Navbar />

        <Switch>

          <SecureRoute path='/dishes/:id/comments' component={AddComment} />
          <SecureRoute path="/dishes/:id/edit" component={DishEdit} />

          <SecureRoute path='/dishes/new' component={DishNew} />
          <Route path='/dishes/:id' component={DishShow} />
          <Route path='/users/:id/edit' component={UserEdit} />
          <Route path='/users/:id' component={UserShow} />
          <Route path='/dishes' component={DishesIndex} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Home} />

        </Switch>
        <Footer />
      </HashRouter>

    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
