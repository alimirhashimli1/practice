import { useState } from "react";
import { useTaskContext } from "./context/TaskContext";

interface TaskIemProps {
    task: {
        id: number;
        title: string;
        completed: boolean;
    };
}

const TaskItem: React.FC<TaskIemProps> = ({ task }) => {
    const {dispatch} = useTaskContext();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);


    const handleEdit = () => {
        if(newTitle.trim()) {
            setIsEditing(false)
            dispatch({type: "EDIT_TASK", payload: {id: task.id, title: newTitle}})
        }
    }
    
    return (
        <div className="flex items-center justify-between border p-2 my-2">
            {isEditing ? (
                <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="border p-1"
                />
            ) : (
                <span
             className={`cursor-pointer ${task.completed ? "line-through text-red-500" : ""}`}
             onClick={() => {dispatch({type: "TOGGLE_TASK", payload: task.id}); console.log(task)} }
            >{task.title}</span>
            )}

            <div>
                {
                    isEditing ? (
                        <button onClick={() => {handleEdit(); console.log(isEditing)}} className="bg- text-green-500 mx-2">Save</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="text-blue-500 mx-2">Edit</button>

                    )
                }
                <button onClick={() => dispatch({type: "DELETE_TASK", payload: task.id})}>Delete</button>
            </div>
        </div>
    )
}

export default TaskItem