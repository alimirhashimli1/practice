import { useState } from "react";
import { useTaskContext } from "./context/TaskContext";


const TaskForm: React.FC = () => {
    const {dispatch} = useTaskContext();
    const [task, setTask] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(task.trim()){
            dispatch({type: "ADD_TASK", payload: task})
            setTask("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input 
            type="text" 
            value={task}
            onChange={e => setTask(e.target.value)}
            className="border p-2 mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Task</button>
        </form>
    )
}

export default TaskForm;