import { useReducer } from "react";



interface Action {
    type: "increment" | "decrement" | "reset";
}


interface CounterState {
    count: number
}

const initialState: CounterState = {
    count: 0,
  };

function reducer(state : CounterState, action: Action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
        return state;
  }
}

const Counter: React.FC = () => {
  // Define your reducer function and initial state here
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <h2>Counter with useReducer</h2>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({type: "increment"})}>Increment</button>
      <button onClick={() => dispatch({type: "decrement"})}>Decrement</button>
      <button onClick={() => dispatch({type: "reset"})}>Reset</button>
    </div>
  );
};

export default Counter;
