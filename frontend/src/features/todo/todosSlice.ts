import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Todo } from '../../components/TodoApp/types';

interface TodoState {
    todos: Todo[];
    sorted: boolean;
}

const initialState: TodoState = {
    todos: [],
    sorted: false,
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.unshift(action.payload)
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },

        saveTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
        },
        sortTodo: (state) => {
            state.todos.sort((a,b) =>
            state.sorted
            ? b.todo.localeCompare(a.todo)
            : a.todo.localeCompare(b.todo)
            );
            state.sorted = !state.sorted;
        },
        toggleTodoCompleted: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if(todo) todo.completed = !todo.completed
        }
    }
})

export const {addTodo, sortTodo, toggleTodoCompleted, deleteTodo, saveTodo} = todoSlice.actions;
export default todoSlice.reducer;