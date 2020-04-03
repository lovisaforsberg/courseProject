import React from 'react'
import {Route, Switch} from 'react-router-dom'
import sunburst from './Components/sunburst'
import dataSunburst from './Data/dataSunburst'
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={dataSunburst} />
    </Switch>
  )
}

export default Router
