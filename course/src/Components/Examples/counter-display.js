import React, { useContext } from "react";
import { CounterContext } from "../../Context/counter-context";

export default function CounterDisplay() {
  const [count] = useContext(CounterContext);

  return (
    <React.Fragment>
      <div>{count}</div>
      <h2>Counter</h2>
    </React.Fragment>
  );
}