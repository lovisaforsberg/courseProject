import React from 'react'
import {Route, Switch} from 'react-router-dom'
import sunburst from './Components/sunburst'
import dataSunburst from './Data/dataSunburst'
import CounterView from "./Views/counter-view";
import ContactView from "./Views/contact-view";
import SunburstView from "./Views/studyplan-view"
import DataFetching from "./Data/sunburst-context"
import Courses from "./Components/courses"
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Courses} />
    </Switch>
  )
}

export default Router
