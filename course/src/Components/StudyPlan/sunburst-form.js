import React, { useState, useContext } from "react";
import { Segment, Form, Input, Button } from "semantic-ui-react";
//import _ from "lodash";
import { SunburstContext } from "../../Data/sunburst-context";

export default function SunburstForm() {
  const bachelor = useFormInput("");
  const year = useFormInput("");
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch,dataFetched] = useContext(SunburstContext);

  const onSubmit = () => {
    dispatch({
      type: "CHOOSE_BACHELOR",
      payload: { bachelor: bachelor.value, start_year: year.value }
    });
    // Reset Form
    bachelor.onReset();
    year.onReset();
  };

  return (
    <Segment basic>
      <Form onSubmit={onSubmit}>
        <Form.Group widths="3">
          <Form.Field width={6}>
            <Input placeholder="Enter Name" {...bachelor} required />
          </Form.Field>
          <Form.Field width={6}>
            <Input placeholder="Enter Email" {...year} required />
          </Form.Field>
          <Form.Field width={4}>
            <Button fluid primary>
              Go!
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </Segment>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue("");
  };

  return {
    value,
    onChange: handleChange,
    onReset: handleReset
  };
}