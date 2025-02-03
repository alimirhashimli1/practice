import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';
import { describe } from 'node:test';

describe("TodoList", () => {
    test("adds a new todo when the 'Add Todo' button is clicked", () => {
        render(<TodoList/>);
       
        const input = screen.getByPlaceholderText(/enter a new todo/i);
        const addButton = screen.getByText(/add todo/i)

        fireEvent.change(input, {target: {value: "Buy groceries"}});
        fireEvent.click(addButton);

        expect(screen.getByText(/Buy groceries/i)).toBeInTheDocument()
    })
})