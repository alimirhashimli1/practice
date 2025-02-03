import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import LoginForm from '../LoginForm';
import '@testing-library/jest-dom';



describe("LoginForm", () => {
    test("renders and submits the form successfully", async () => {
        render(<LoginForm/>);
        fireEvent.change(screen.getByLabelText(/name/i), {target: {value: "John Doe"}})
        fireEvent.change(screen.getByLabelText(/age/i), {target: {value: "30"}})
        fireEvent.submit(screen.getByRole('button'));
        await waitFor(() => expect(screen.getByText(/form submitted!/i)));

        expect(screen.getByText(/name: John Doe/i));
        expect(screen.getByText(/age: 30/i));
    })

    test("renders and submits the form successfully, then disables the submit button", async () => {
        render(<LoginForm />);
    
        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "30" } });
        
        // Submit the form
        fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
        
        // Wait for the submission confirmation message to appear
        await waitFor(() => expect(screen.getByText(/form submitted!/i)).toBeInTheDocument());
        
        // Check that the submitted values are displayed
        expect(screen.getByText(/name: John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/age: 30/i)).toBeInTheDocument();
    
        // Check that the input fields are cleared
        await waitFor(() => expect(screen.getByLabelText(/name/i)).toHaveValue(''));
        await waitFor(() => expect(screen.getByLabelText("Age")).toHaveValue(''));


        
        // Check that the submit button is disabled because the fields are empty
        expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
      });
    
      test("submit button is disabled when name or age is missing", () => {
        render(<LoginForm />);
        
        // Initially, the button is disabled
        expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    
        // Fill only the name field; button should still be disabled
        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
        expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    
        // Fill in the age field; now the button should be enabled
        fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "30" } });
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
      });
})