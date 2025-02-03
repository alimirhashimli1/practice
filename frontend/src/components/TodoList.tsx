import { useState } from 'react';

const TodoList: React.FC = () => {
  // State for the current input value
  const [todo, setTodo] = useState('');

  // State for the list of todos
  // Each todo is an object with an id, text, and completed flag
  const [todos, setTodos] = useState<Array<{ id: number; text: string; completed: boolean }>>([]);

  // Handle adding a new todo
  const handleAddTodo = () => {
    const addedTodo = { id: Date.now(), text: todo, completed: false };
    setTodos([...todos, addedTodo]);
    setTodo('');
    // TASK: 
    // - Create a new todo object with a unique id (you can use Date.now() for simplicity), 
    //   the current 'todo' text, and 'completed' set to false.
    // - Add the new todo to the 'todos' array.
    // - Clear the input field (reset 'todo' state to an empty string).
  };

  // Toggle the completed status of a todo
  const toggleCompleted = (id: number) => {
    const completedTodo = todos.find(item => item.id === id);
    if (completedTodo) {
      completedTodo.completed = !completedTodo.completed;
    }
    setTodos([...todos]);
    // TASK: 
    // - Update the 'todos' array by toggling the 'completed' property of the todo with the given id.
  };

  // Remove a todo from the list
  const removeTodo = (id: number) => {
    const filteredTodos = todos.filter(item => item.id !== id);
    setTodos(filteredTodos);
    // TASK: 
    // - Remove the todo with the specified id from the 'todos' array.
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            <span
              style={{ textDecoration: item.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleCompleted(item.id)}
            >
              {item.text}
            </span>
            <button onClick={() => removeTodo(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
