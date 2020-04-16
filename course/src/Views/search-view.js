import React from "react";
import { Segment, Header } from "semantic-ui-react";

import Courses from "../Components/courses"
import SearchForm from "../Components/SearchCourses/search-form"
import CoursesContainer from "../Components/SearchCourses/coursesContainer"


export default function SearchView() {
  return (
      <Segment basic>
        <Header as="h3">SEARCH</Header>
        <Courses/>
      </Segment>
  );
}