import React from "react";
import { Segment, Header } from "semantic-ui-react";
import ContactForm from "../Components/Examples/contact-form";
import ContactTable from "../Components/Examples/contact-table";
import { ContactContextProvider } from "../Context/contact-context";

export default function Contacts() {
  return (
    <ContactContextProvider>
      <Segment basic>
        <Header as="h3">Contacts</Header>
        <ContactForm />
        <ContactTable />
      </Segment>
    </ContactContextProvider>
  );
}