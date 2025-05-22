import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Transaction } from '../../components/TransactionApp/types';

interface TransactionState {
  transactions: Transaction[];
  sorted: boolean
}

const initialState: TransactionState = {
  transactions: [],
  sorted: false,
}

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload)
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(transaction => transaction.title !== action.payload)
    }
  }
})

export const {addTransaction, deleteTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;