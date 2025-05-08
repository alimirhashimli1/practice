import React, { useCallback, useEffect, useState } from "react";

import { Transaction } from "./types";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";


const LOCAL_STORAGE_KEY = "transaction_key";

export const TransactionApp: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(0);
  const [category, setCategory] = useState<string>("");
  const [transactionArr, setTransactionArr] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>();
  const [transactionSum, setTransactionSum] = useState<number>(0);
  const [editTransaction, setEditTransaction] = useState<string | null>("")
  const [editTitle, setEditTitle] = useState<string>("");
  const [editAmount, setEditAmount] = useState<number | null>(0);
  const [editCategory, setEditCategory] = useState<string>("");
  const [sorted, setSorted] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setTransactionArr(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactionArr));
    }
  }, [loaded, transactionArr]);


  const addTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !category || amount === null) {
      setError("All fields are required");
      return;
    }
    const currentDate = new Date().toLocaleDateString();
    const newTransaction: Transaction = {
      title,
      amount,
      category,
      date: currentDate,
    };

    setTransactionArr([newTransaction, ...transactionArr]);
    setError("");
    setTitle("");
    setAmount(0);
    setCategory("");
  };

  const setEdit = (title: string) => {
    const transaction = transactionArr.find(transaction => transaction.title === title)
    if(!transaction)return
    setEditTitle(transaction.title)
    setEditAmount(transaction.amount)
    setEditCategory(transaction.category)
    setEditTransaction(title)

  }

  const setSave = (title: string) => {
      const currentDate = new Date().toLocaleDateString()
    setTransactionArr(prev => prev.map(
        transaction => transaction.title === title ? {title: editTitle.trim(), amount: editAmount ?? 0, category: editCategory, date: currentDate} : transaction
    ))
    setEditTransaction(null)
    setEditCategory("")
    setEditAmount(0)
    setEditTitle("")
  }

  const sortTransactions = () => {
    const sortedTransactions = [...transactionArr].sort((a, b) => {
      if(sorted){
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    })
    setSorted(!sorted);
    setTransactionArr(sortedTransactions);
  }



  const calculateSum = useCallback(() => {
    const sum = transactionArr.reduce((acc, curr) => {
      return curr.category === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
    setTransactionSum(sum);
  }, [transactionArr]);

  useEffect(() => {
    calculateSum();
  }, [calculateSum]);

  const deleteTransaction = (transactionTitle: string) => {
    const findTransaction = transactionArr.filter(
      (transaction) => transaction.title !== transactionTitle
    );
    setTransactionArr(findTransaction);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
    <TransactionForm addTransaction={addTransaction} setTitle={setTitle} setAmount={setAmount} setCategory={setCategory} title={title} amount={amount} category={category}/>
    <p className="min-h-[1.5rem]">{ error && <p className="text-red-600">{error}</p>}</p>
    <TransactionList 
    transactionArr={transactionArr}
    editTransaction={editTransaction}
    setEditTransaction={setEditTransaction}
    editTitle={editTitle}
    setEditTitle={setEditTitle}
    editAmount={editAmount}
    setEditAmount={setEditAmount}
    editCategory={editCategory}
    setEditCategory={setEditCategory}
    setSave={setSave}
    deleteTransaction={deleteTransaction}
    transactionSum={transactionSum}
    sortTransactions={sortTransactions}
    setEdit={setEdit}
    />
    </div>
  );
};

export default TransactionApp;
