import {configureStore} from '@reduxjs/toolkit';
import transactionReducer from './features/transactions/transactionsSlice';
import todoReducer from "./features/todo/todosSlice"

const store = configureStore({
    reducer: {
        todos: todoReducer,
        transactions: transactionReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;