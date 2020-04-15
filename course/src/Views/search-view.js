import React from "react";
import { Segment, Header } from "semantic-ui-react";

import Courses from "../Components/courses"
import SearchForm from "../Components/search-form"


export default function SearchView() {
  return (
      <Segment basic>
        <Header as="h3">SEARCH</Header>
        <SearchForm/>
        <Courses/>
      </Segment>
  );
}