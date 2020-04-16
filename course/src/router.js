import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Sunburst from './Components/StudyPlan/sunburst'
import dataSunburst from './Data/dataSunburst'
import CounterView from "./Views/counter-view";
import ContactView from "./Views/contact-view";
import SunburstView from "./Views/studyplan-view"
import DataFetching from "./Data/sunburst-context"
import Courses from "./Components/courses"
import DisplayData from "./Components/SearchCourses/courses_data"
import SearchView from "./Views/search-view"
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={Courses} />
    </Switch>
  )
}

export default Router
