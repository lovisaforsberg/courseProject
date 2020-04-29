import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Sunburst from './Components/StudyPlan/sunburst'
import dataSunburst from './Data/dataSunburst'
import SunburstView from "./Views/studyplan-view"
import DataFetching from "./Data/sunburst-context"
import Courses from "./Data/courses"
import DisplayData from "./Components/SearchCourses/courses_data"
import SearchView from "./Views/search-view"
const Router = () => {
  return (
    <Switch>
      <Route exact path='/' component={SearchView} />
      <Route exact path='/studyplan' component={dataSunburst}/>
    </Switch>
  )
}

export default Router
