import React, { useState } from 'react';
import { Todo } from './types';
import { addTodo, deleteTodo, saveTodo, sortTodo, toggleTodoCompleted } from '../../features/todo/todosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const TodoApp: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [todo, setTodo] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const [editedCategory, setEditedCategory] = useState<string>('');
  const todos = useSelector((state: RootState) => state.todos.todos);
  
  const dispatch = useDispatch();

  const handleAddTodo = (todo: string, category: string, completed: boolean) => {
    const newTodo: Todo = {
      todo,
      category,
      completed,
      id: new Date().toISOString(), 
    };
    dispatch(addTodo(newTodo));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo || !category) {
      setError('All fields are required');
      return;
    }
    handleAddTodo(todo, category, false);
    setCategory('');
    setTodo('');
    setError('');
  };

  const handleEdit = (todoId: string, todoText: string, todoCategory: string) => {
    setEditedText(todoText);
    setEditedCategory(todoCategory);
    setEditTodoId(todoId);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📝 Todo App</h1>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Todo</label>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Your task here"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option disabled value="">Select a Category</option>
            <option value="Learning">Learning</option>
            <option value="Personal">Personal</option>
            <option value="Hobbies">Hobbies</option>
          </select>
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 w-full bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600`}
        >
          Add Todo
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {todos.map((todo) => (
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
        ))}
      </ul>
      <button  className="px-4 py-2 my-2 w-full text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-violet-600 text-violet-600 hover:bg-violet-100" onClick={() => dispatch(sortTodo())}>Sort Todos</button>
    </div>
  );
};



export default TodoApp;
