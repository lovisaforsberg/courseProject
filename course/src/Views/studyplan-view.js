import React from "react";
import { Segment, Header } from "semantic-ui-react";
import ContactForm from "../Components/contact-form.js";
import ContactTable from "../Components/contact-table";
import Sunburst from "../Components/sunburst"
import SunburstForm from "../Components/sunburst-form"
import { ContactContextProvider } from "../Context/contact-context";
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