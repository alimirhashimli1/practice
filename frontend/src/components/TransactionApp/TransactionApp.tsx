// components/TransactionApp/index.tsx
import React, { useMemo } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Transaction } from "./types";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  sortTransactions
} from "../../features/transactions/transactionsSlice";

const TransactionApp: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const transactionSum = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      return curr.category === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
  }, [transactions]);

  const handleAddTransaction = (title: string, amount: number, category: string) => {
    const newTransaction: Transaction = {
      title,
      amount,
      category,
      date: new Date().toLocaleDateString(),
    };
  
    if (selectedTransaction) {
      dispatch(editTransaction(newTransaction));
      setSelectedTransaction(null); 
    } else {
      dispatch(addTransaction(newTransaction));
    }
  };
  

  const handleEditTransaction = (t: Transaction) => {
    setSelectedTransaction(t);
  };
  
  const handleDelete = (title: string) => {
    dispatch(deleteTransaction(title));
  };

  const handleSort = () => {
    dispatch(sortTransactions());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center items-start">
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">💸 Transaction Tracker</h1>
      <TransactionForm onAdd={handleAddTransaction} selectedTransaction={selectedTransaction}/>
      
      <div className="border-t pt-4">
     
      <TransactionList
        transactions={transactions}
        onEdit={handleEditTransaction}
        onDelete={handleDelete}
        onSort={handleSort}
        transactionSum={transactionSum}
      />
     </div>
      </div>
    </div>
  );
};

export default TransactionApp;
