import React from 'react'
import {Route, Switch} from 'react-router-dom'
import sunburst from './Components/sunburst'
import dataSunburst from './Data/dataSunburst'
import CounterView from "./Views/counter-view";
import ContactView from "./Views/contact-view";
import DataFetching from "./Data/dataFetching"
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={DataFetching} />
    </Switch>
  )
}

export default Router
