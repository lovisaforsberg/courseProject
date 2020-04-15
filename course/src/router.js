import React from 'react'
import {Route, Switch} from 'react-router-dom'
import sunburst from './Components/sunburst'
import dataSunburst from './Data/dataSunburst'
import CounterView from "./Views/counter-view";
import ContactView from "./Views/contact-view";
import SunburstView from "./Views/studyplan-view"
import DataFetching from "./Data/sunburst-context"
import Courses from "./Components/courses"
import DisplayData from "./Components/courses_data"
import SearchView from "./Views/search-view"
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={SearchView} />
    </Switch>
  )
}

export default Router
