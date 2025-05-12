// features/transactions/transactionsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../components/TransactionApp/types";

interface TransactionState {
  transactions: Transaction[];
  sorted: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  sorted: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.title !== action.payload);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.title === action.payload.title);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    sortTransactions: (state) => {
      state.transactions.sort((a, b) =>
        state.sorted
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title)
      );
      state.sorted = !state.sorted; 
    },
  },
});

export const { addTransaction, deleteTransaction, editTransaction, sortTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
