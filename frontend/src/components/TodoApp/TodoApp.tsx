import React from 'react'
import { Todo } from './types'


const TodoApp: React.FC = () => {
  return (
    <div>
      <form action="">
        <div>
        <label className="block text-sm font-medium text-gray-700">Todo</label>
        <input/>
        </div>
        <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select>
          <option value="">Select a Category</option>
          <option value="Learning">Learning</option>
          <option value="Personal">Personal</option>
          <option value="Hobbies">Hobbies</option>
        </select>
        </div>
        <button>Add</button>
      </form>
    </div>
  )
}

export default TodoApp