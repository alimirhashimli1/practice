import { useReducer, useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type Action =
  | { type: "add"; payload: string }
  | { type: "toggle"; payload: number }
  | { type: "remove"; payload: number };

const initialState: Task[] = [];

function reducer(state: Task[], action: Action) {
  // Implement your reducer logic here
  switch(action.type) {
    case "add":
        return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "toggle":
        return state.map(task => task.id === action.payload ? { ...task, completed: !task.completed} : task);
    case "remove":
        return state.filter(task => task.id !== action.payload)
    default:
        return state
  }

 
}


const TodoApp: React.FC = () => {
  const [tasks, dispatch] = useReducer(reducer, initialState);
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim()) {
      // Dispatch an "add" action here
      dispatch({ type: "add", payload: taskText });
      setTaskText("");
    }
  };

  return (
    <div>
      <h2>Todo List with useReducer</h2>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={handleAddTask}>Add Task</button>
      
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
              onClick={() => { dispatch({type: "toggle", payload: task.id}) }}
            >
              {task.text}
            </span>
            <button onClick={() => { dispatch({type: "remove", payload: task.id}) }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
