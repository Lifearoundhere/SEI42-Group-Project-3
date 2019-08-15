import React from 'react'
import ReactDOM from 'react-dom'
import Navbar from './components/common/Navbar'

import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Hello World</h1>

      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
