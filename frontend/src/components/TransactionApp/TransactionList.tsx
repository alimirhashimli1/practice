import React from 'react'
import { Transaction } from "./types";


type TransactionListProps = {
  transactionArr: Transaction[];
  editTransaction: string| null;
  setEditTransaction : (value: string | null) => void;
  editTitle: string;
  setEditTitle: (value: string) => void;
  editAmount: number | null;
  setEditAmount: (value: number) => void;
  editCategory: string;
  setEditCategory: (value: string) => void;
  setSave: (title: string) => void;
  deleteTransaction: (transactionTitle: string) => void;
  transactionSum: number;
  sortTransactions: () => void;
  setEdit: (title: string) => void;

}

const TransactionList: React.FC<TransactionListProps> = ({transactionArr, editTransaction, setEditTransaction, editTitle, setEditTitle, editAmount, setEditAmount, editCategory, setEditCategory, setSave, deleteTransaction, transactionSum, sortTransactions, setEdit}) => {
  return (
    <section className="flex flex-col gap-4 items-center mt-4 p-6 border border-gray-300 rounded-lg shadow-sm w-full  bg-white">
    <h2 className="text-2xl font-semibold">Transactions</h2>

    <div className="flex flex-wrap gap-4 w-full">
      {transactionArr.map((transaction, index) => (
       <div
       key={index}
       className="flex flex-col justify-between p-4 border rounded-lg shadow bg-white w-full sm:w-[220px] gap-3"
     >
       {editTransaction === transaction.title ? (
         <div className="flex flex-col gap-2">
           <input
             type="text"
             value={editTitle}
             onChange={(e) => setEditTitle(e.target.value)}
             className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
             placeholder="Title"
           />
           <select
             value={editCategory}
             onChange={(e) => setEditCategory(e.target.value)}
             className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
           >
             <option value="income">Income</option>
             <option value="expense">Expense</option>
           </select>
           <input
             type="number"
             value={editAmount ?? ""}
             onChange={(e) => setEditAmount(parseInt(e.target.value) || 0)}
             className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
             placeholder="Amount"
           />
           <div className="flex gap-2 mt-2">
             <button
               className="flex-1 bg-green-500 text-white text-sm py-1 rounded hover:bg-green-600 transition"
               onClick={() => setSave(transaction.title)}
             >
               Save
             </button>
             <button
               className="flex-1 bg-gray-300 text-sm py-1 rounded hover:bg-gray-400 transition"
               onClick={() => setEditTransaction(null)}
             >
               Cancel
             </button>
           </div>
         </div>
       ) : (
         <div className="flex flex-col gap-1">
           <h3 className="font-medium text-lg">{transaction.title}</h3>
           <p className="text-sm text-gray-600 capitalize">{transaction.category}</p>
           <p className="text-sm text-gray-400">{transaction.date}</p>
           <span className="text-md font-semibold mt-2 text-blue-700">
             ${transaction.amount.toFixed(2)}
           </span>
           <div className="flex justify-between mt-2 gap-2">
             <button
               onClick={() => setEdit(transaction.title)}
               className="bg-orange-400 text-white text-sm px-2 py-1 rounded hover:bg-orange-500 transition"
             >
               Edit
             </button>
             <button
               onClick={() => deleteTransaction(transaction.title)}
               className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600 transition"
             >
               Delete
             </button>
           </div>
         </div>
       )}
     </div>
      ))}
    </div>
    <button onClick={() => sortTransactions()}  className="bg-pink-500 text-white text-sm px-2 py-1 rounded hover:bg-pink-600 transition">Sort transactions</button>
    <h4                   
    >Sum: {transactionSum}</h4>
  </section>
  )
}

export default TransactionList