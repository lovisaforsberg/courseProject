import React from 'react'
import {Route, Switch} from 'react-router-dom'
import test from './Data/test'
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={test} />
    </Switch>
  )
}

export default Router
