import React, { useCallback, useEffect, useState } from "react";

type Transaction = {
  title: string;
  amount: number;
  category: string;
  date: string;
};

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
  const [editDate, setEditDate] = useState<string>("");
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
    setEditDate(transaction.date)
    setEditTransaction(title)

  }

  const setSave = (title: string) => {
      const currentDate = new Date().toLocaleDateString()
      setEditDate(currentDate)
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
      {error && <p className="text-red-600">{error}</p>}

      <form
        className="flex flex-col gap-3 p-4 w-full max-w-md bg-white rounded-lg shadow-sm"
        onSubmit={addTransaction}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount ?? ""}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option disabled value="">
            Select Category
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

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
    </div>
  );
};

export default TransactionApp;
