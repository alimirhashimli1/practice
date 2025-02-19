import React, {createContext, useReducer, ReactNode} from "react";

interface User {
    id: number;
    name: string;
    email: string;

}

interface State {
    users: User[];
    loading: boolean;
}

type Action =
   | {type: "ADD_USER", payload: User}
   | {type: "SET_USERS", payload: User[]}
   | {type: "SET_LOADING", payload: boolean};

const initialState: State = {
    users: [],
    loading: false,
}


const userReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state, users: [...state.users, action.payload]
            };
        case "SET_USERS":
            return {
                ...state, users: action.payload, loading: false
            };
        case "SET_LOADING":
            return {
                ...state, loading: action.payload
            }
        default:
            return state
        
    }
}


const UserContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>
} | null>(null)

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({children} : UserProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = React.useContext(UserContext);
    if(!context){
        throw new Error("useUserContext must be used within a UserProvider");
    }

    return context;
}