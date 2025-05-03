interface TodoItemsProps {
    todo: {
      task: string,
      id: string,
      completed: boolean
    },
    handleEdit: (todoId: string, todoTask: string) => void;
    handleDelete: (index: string) => void;
    handleSave: (id: string) => void;
    editId: boolean;
    editTask: string;
    setEditTask: (value: string) => void
    handleToggle: (index: string) => void;
}

const TodoItem: React.FC<TodoItemsProps> = ({todo, handleEdit, handleDelete, handleSave, editId, editTask, setEditTask, handleToggle}) => {


  return (
        <li className="flex gap-2 justify-between items-center m-2" key={todo.id}>
              {
                editId ? (
                  <div className="flex justify-between w-full gap-2">
                  <input className="flex-1 p-2 w-24" type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)}/>
                  <button className="ml-2  w-24 bg-green-500 hover:bg-green-700 transition p-2" onClick={() => handleSave(todo.id)}>Save</button>
                  </div>

                
                ) :
                
                (
                  <div className="flex justify-between w-full gap-2">
                  <p className={`cursor-pointer w-24 ${todo.completed ? "line-through" : ""}`} onClick={() => handleToggle(todo.id)}>{todo.task}</p>
                  <button className="ml-2  w-24 bg-orange-500 hover:bg-orange-700 transition p-2" onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>
                  </div>

                )
              }
              <button className="ml-2  w-24 bg-red-500 hover:bg-red-700 transition p-2" onClick={() => handleDelete(todo.id)}>Delete</button>
            </li>
  )
}

export default TodoItem