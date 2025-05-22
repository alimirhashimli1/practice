import {configureStore} from '@reduxjs/toolkit';
import transactionReducer from './features/transactions/transactionsSlice';
import todoReducer from "./features/todo/todosSlice"

const store = configureStore({
    reducer: {
        todos: todoReducer,
        transactions: transactionReducer
    }
});

store.subscribe(() => {
    const state = store.getState();
    try {
        localStorage.setItem('transactions', JSON.stringify(state.transactions.transactions))
    } catch (error) {
        console.error(error)
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;