import React from "react";
import { Segment, Header } from "semantic-ui-react";

import Sunburst from "../Components/StudyPlan/sunburst"

import { SunburstContextProvider } from "../Data/sunburst-context"

export default function StudyPlan() {
  return (
    <SunburstContextProvider>
      <Segment basic>
        <Header as="h3">SUNBURST</Header>
        <Sunburst/>
      </Segment>
    </SunburstContextProvider>
  );
}