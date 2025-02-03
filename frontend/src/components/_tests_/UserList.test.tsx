import {render, screen, waitFor, act} from '@testing-library/react';
import "@testing-library/jest-dom";
import UserList from '../UserList';
global.fetch = jest.fn();


test("shows loading message initially", () => {
    render(<UserList/>);;
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
})


test("renders user list after fetching data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [
            {id: 1, name: "John Doe"},
            {id: 2, name: "Jane Doe"}
        ]
    })

    await act (async () =>  {
        render(<UserList/>);
    })

    await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument());

})

test("shows error message when API fails", async() => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch data"));
    await act (async () =>  {
        render(<UserList/>);
    })

    await waitFor(() => expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument());
})