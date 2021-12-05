import React from "react"
import { Route, Switch } from "react-router-dom"

import Login from "../pages/Login"

const LoginRoute = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
    </Switch>
  )
}

export default LoginRoute
