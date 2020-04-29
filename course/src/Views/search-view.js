import React from "react";
import { Segment, Header } from "semantic-ui-react";

import Courses from "../Data/courses"
import NavBar from "../Components/Navbar"
import CoursesContainer from "../Components/SearchCourses/coursesContainer"


export default function SearchView() {
  return (
      <Segment basic>
        <NavBar></NavBar>
        <Courses/>
      </Segment>
  );
}