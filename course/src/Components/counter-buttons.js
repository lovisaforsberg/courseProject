import React, { useContext } from "react";
import { CounterContext } from "../Context/counter-context";

export default function CounterButtons() {
  const [count, setCount] = useContext(CounterContext);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
        <button color="green" onClick={increment}>
          Add
        </button>
        <button color="red" onClick={decrement}>
          Minus
        </button>
    </div>
  );
}