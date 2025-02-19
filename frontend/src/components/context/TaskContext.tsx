import React, {createContext, useReducer, ReactNode, useEffect} from "react";

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskState {
    tasks: Task[];
}

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "EDIT_TASK"; payload: { id: number; title: string } };

  const initialState: TaskState = {
    tasks: []
  }

  const taskReducer = (state: TaskState, action: Action) => {
    switch (action.type) {
      case "ADD_TASK":
        return {
            tasks: [...state.tasks, {id: Date.now(), title: action.payload, completed: false}]
        };
    case "DELETE_TASK":
        return {
            tasks: state.tasks.filter(task => task.id !== action.payload)
        }
    case "EDIT_TASK":
        return {
            tasks: state.tasks.map( task => task.id === action.payload.id ? {...task, title: action.payload.title}: task)
                }
    case "TOGGLE_TASK":
        return {
            tasks: state.tasks.map(task => task.id === action.payload ? {...task, completed: !task.completed} : task)
        }

    }
  }

  const TaskContext = createContext<{state: TaskState; dispatch: React.Dispatch<Action>} | null> (null);


  export const TaskProvider = ({children} : {children: ReactNode}) => {
    const [state, dispatch] = useReducer(taskReducer, initialState, () => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : {tasks: []}
    })

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(state))
    }, [state])

    return <TaskContext.Provider value={{state, dispatch}}>{children}</TaskContext.Provider>
  }

  export const useTaskContext = () => {
    const context = React.useContext(TaskContext);
    if(!context) throw new Error("useTask context must be used within a TaskProvider")
        return context
  }