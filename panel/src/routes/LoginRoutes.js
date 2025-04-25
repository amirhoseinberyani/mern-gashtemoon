import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../screens/login'

export default function LoginRoutes() {
  return (
    <Switch>
      <Route exact path="*" component={Login} />
    </Switch>
  )
}
