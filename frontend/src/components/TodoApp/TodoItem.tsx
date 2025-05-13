import { useDispatch } from "react-redux"
import { deleteTodo, saveTodo, toggleTodoCompleted } from "../../features/todo/todosSlice"

interface TodoItemsProps {
    todo: {
      todo: string,
      id: string,
      category: string,
      completed: boolean
    },
    editTodoId: string | null,
    editedText: string,
    editedCategory: string,
      setEditedText: (text: string) => void
      setEditedCategory: (category: string) => void
      setEditTodoId: (id: string | null) => void
      setError: (error: string) => void
      handleEdit: (todoId: string, todoText: string, todoCategory: string) => void
}

const TodoItem: React.FC<TodoItemsProps> = ({todo, editTodoId, editedText, editedCategory, setEditedText, setEditedCategory, setEditTodoId, setError, handleEdit}) => {
  const dispatch = useDispatch();


  return (
        <li
            key={todo.id}
            className={`p-4 border border-gray-200 rounded-md shadow-sm transition-colors ${
              todo.completed ? 'bg-green-100' : 'bg-gray-50'
            }`}
            onClick={() => dispatch(toggleTodoCompleted(todo.id))}
          >
            {editTodoId === todo.id ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  type="text"
                  value={editedText}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="flex-1 p-2 border rounded-md w-full sm:w-auto"
                />
                <select
                  value={editedCategory}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setEditedCategory(e.target.value)}
                  className="p-2 border rounded-md w-full sm:w-auto"
                >
                  <option disabled value="">Select a Category</option>
                  <option value="Learning">Learning</option>
                  <option value="Personal">Personal</option>
                  <option value="Hobbies">Hobbies</option>
                </select>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      saveTodo({
                        id: todo.id,
                        todo: editedText,
                        category: editedCategory,
                        completed: todo.completed,
                      })
                    );
                    setEditTodoId(null);
                    setEditedText('');
                    setEditedCategory('');
                    setError('');
                  }}
                  className={`px-4 py-2 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-green-600 text-green-600 hover:bg-green-100`}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p
                    className={`font-semibold ${
                      todo.completed ? 'line-through text-gray-500 opacity-70' : 'text-gray-800'
                    }`}
                  >
                    {todo.todo}
                  </p>
                  <p
                    className={`text-sm ${
                      todo.completed ? 'line-through text-gray-400 opacity-70' : 'text-gray-500'
                    }`}
                  >
                    {todo.category}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(todo.id, todo.todo, todo.category);
                    }}
                    className={`px-4 py-2 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-blue-600 text-blue-600 hover:bg-blue-100`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteTodo(todo.id));
                    }}
                    className={`px-4 py-2 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-red-600 text-red-600 hover:bg-red-100`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
  )
}

export default TodoItem