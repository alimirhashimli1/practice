import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../components/TransactionApp/types";

interface TransactionState {
  transactions: Transaction[];
  balance: number;
  sorted: boolean;
}

const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem("transactions");
    if (!serialized) return [];
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Load error', error);
    return []
  }
};

const persistedTransactions = loadFromLocalStorage();


const calculateInitialSum = (transactions: Transaction[]) : number => {
  return transactions.reduce((acc, sum) => sum.category.toLowerCase() === 'income' ? acc + sum.amount : acc - sum.amount, 0);
}

const initialState: TransactionState = {
  transactions: persistedTransactions,
  balance: calculateInitialSum(persistedTransactions),
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
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
    saveTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions = state.transactions.map(transaction => transaction.id === action.payload.id ? action.payload : transaction)
    }
    ,

    calculateSum: (state) => {
      state.balance = state.transactions.reduce((acc, curr) => {
        return curr.category.toLowerCase() === "income"
          ? acc + curr.amount
          : acc - curr.amount;
      }, 0);
    },
    sortTransaction: (state) => {
      if(state.sorted) {
        state.transactions = [...state.transactions].sort((a,b) => b.title.localeCompare(a.title))
      } else {
         state.transactions = [...state.transactions].sort((a,b) => a.title.localeCompare(b.title))
      }
      state.sorted = !state.sorted
    }
  },
});

export const { addTransaction, deleteTransaction, calculateSum, saveTransaction, sortTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;


