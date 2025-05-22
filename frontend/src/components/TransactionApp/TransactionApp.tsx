import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Transaction } from './types';
import { addTransaction, deleteTransaction } from '../../features/transactions/transactionsSlice';


const TransactionApp : React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);


  const handleAddTransaction = (title: string, amount: number, category: string, date: string) => {
   const newTransaction: Transaction = {
    title,
    category,
    amount,
    date
  }
  dispatch(addTransaction(newTransaction))
}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!title || !category || !amount){
      const timer = setInterval(() => {
        setError('All fields are required');
      }, 3000)
      clearInterval(timer);
    }
    if (amount !== null) {
    handleAddTransaction(title, amount, category, new Date().toLocaleDateString());
  } else {
    setError('Amount is required');
  }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📝 Todo App</h1>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
    <form onSubmit={handleSubmit}>
      <div>
      <label htmlFor="">Title</label>
      <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
      <label htmlFor="">Amount</label>
      <input type="number" placeholder='Amount' value={amount ?? ''} onChange={(e) => setAmount(parseInt(e.target.value) || null)} />
      </div>
      <div>
      <label htmlFor="">Category</label>
      <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
        <option disabled value="">Select category</option>
        <option value="">Income</option>
        <option value="">Expense</option>
      </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.date}>
          <p>{transaction.title}</p>
          <p>{transaction.amount}</p>
          <p>{transaction.category}</p>
          <p>{transaction.date}</p>
          <button onClick={(e) => {e.stopPropagation(); dispatch(deleteTransaction(transaction.title))}}>Delete</button>
        </li>

      ))}
    </ul>
    </div>
  )
}

export default TransactionApp