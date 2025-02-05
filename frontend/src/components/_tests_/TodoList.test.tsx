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

    test("toggles the completed status of a todo when its text is clicked", () => {
        render(<TodoList/>);
        
        const input = screen.getByPlaceholderText(/enter a new todo/i);
        const addButton = screen.getByText(/add todo/i);

        fireEvent.change(input, {target: {value: "Buy groceries"}});
        fireEvent.click(addButton);

        const todoText = screen.getByText(/Buy groceries/i);
        expect(todoText).toHaveStyle("text-decoration: none");

        fireEvent.click(todoText);
        expect(todoText).toHaveStyle("text-decoration: line-through");

    })

    test("removes a todo when the 'Remove' button is clicked", () => {
        render(<TodoList/>);

        const input = screen.getByPlaceholderText(/enter a new todo/i);
        const addButton = screen.getByText(/add todo/i);

        fireEvent.change(input, {target: {value: "Buy groceries"}});
        fireEvent.click(addButton);

        expect(screen.getByText(/Buy groceries/i)).toBeInTheDocument();

        const removeButton = screen.getByText(/remove/i);
        fireEvent.click(removeButton);

        // expect(screen.queryByText(/Buy groceries/i)).toBeNull();
        expect(screen.queryByText(/Buy groceries/i)).not.toBeInTheDocument();
    })
})