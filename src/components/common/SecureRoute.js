import React from 'react'
import { Route } from 'react-router-dom'

import Auth from '../../lib/Auth'

const SecureRoute = (props) => {
  if(Auth.isAuthenticated()) return <Route {...props} />


}
export default SecureRoute
