import React from "react";

import { CounterContextProvider } from "../Context/counter-context";
import CounterDisplay from "../Components/Examples/counter-display";
import CounterButtons from "../Components/Examples/counter-buttons";

export default function CounterView() {
  return (
    <CounterContextProvider> 
      <h3>Counter</h3>
      <div textAlign="center">
        <CounterDisplay />
        <CounterButtons />
      </div>
    </CounterContextProvider>
  );
}