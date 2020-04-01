import React from 'react'
import {Route, Switch} from 'react-router-dom'
import sunburst from './Components/sunburst'
import test from './Data/testElin'
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={test} />
    </Switch>
  )
}

export default Router
