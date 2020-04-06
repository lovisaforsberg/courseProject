import React from "react";
import { Segment, Header } from "semantic-ui-react";
import ContactForm from "../Components/contact-form.js";
import ContactTable from "../Components/contact-table";
import { ContactContextProvider } from "../Context/contact-context";

export default function StudyPlan() {
  return (
    <ContactContextProvider>
      <Segment basic>
        <Header as="h3">Contacts</Header>
      </Segment>
    </ContactContextProvider>
  );
}