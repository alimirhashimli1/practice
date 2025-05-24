import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Transaction } from './types';
import { addTransaction, calculateSum, deleteTransaction } from '../../features/transactions/transactionsSlice';

const TransactionApp: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedCategory, setEditedCategory] = useState<string>('');
  const [editedAmount, setEditedAmount] = useState<number | null>(null);
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const balance = useSelector((state: RootState) => state.transactions.balance)

  const handleAddTransaction = (
    title: string,
    amount: number,
    category: string,
    date: string
  ) => {
    const newTransaction: Transaction = {
      title,
      category,
      amount,
      date,
    };
    dispatch(addTransaction(newTransaction));
    dispatch(calculateSum())
    setTitle('');
    setCategory('');
    setAmount(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !category || !amount) {
      setError('All fields are required');
      setTimeout(() => setError(''), 3000);
      return;
    }
    handleAddTransaction(title, amount, category, new Date().toLocaleDateString());
  };

  const handleEdit = (transactionTitle: string, transactionAmount: number, transactionCategory: string) => {
    setEditedAmount(transactionAmount);
    setEditedCategory(transactionCategory);
    setEditedTitle(transactionTitle);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">💰 Transaction Tracker</h1>

      {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount ?? ''}
            onChange={(e) => setAmount(parseInt(e.target.value) || null)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option disabled value="">Select category</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          Add Transaction
        </button>
      </form>

      <ul className="mt-8 divide-y divide-gray-200">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className="py-4 px-3 flex justify-between items-center bg-gray-50 rounded-md mb-2 shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-800">{transaction.title}</p>
              <p className="text-sm text-gray-500">
                {transaction.category} • {transaction.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className={`font-bold ${transaction.category === 'Income' ? 'text-green-600' : 'text-red-500'}`}>
                ${transaction.amount}
              </p>
              <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(transaction.title, transaction.amount, transaction.category)
              }}
              className={`px-4 py-2 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-blue-600 text-blue-600 hover:bg-blue-100`}>Edit</button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteTransaction(transaction.title));
                  dispatch(calculateSum())
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p>Sum: {balance}</p>
    </div>
  );
};

export default TransactionApp;
