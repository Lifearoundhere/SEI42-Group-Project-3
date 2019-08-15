import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/common/Navbar'
import { HashRouter, Route, Switch } from 'react-router-dom'

import DishesIndex from './components/dishes/Index'


import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Navbar/>
        <Switch>


          <Route path='/dishes' component={DishesIndex} />

        </Switch>
      </HashRouter>

    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
