// components/TransactionApp/TransactionForm.tsx
import React, { useEffect, useState } from "react";
import { Transaction } from "./types";

interface Props {
  onAdd: (title: string, amount: number, category: string) => void;
  selectedTransaction?: Transaction | null;
}

const TransactionForm: React.FC<Props> = ({ onAdd, selectedTransaction }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number | null>(0);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      setError("All fields are required");
      return;
    }
    onAdd(title, amount, category);
    setTitle("");
    setAmount(0);
    setCategory("");
    setError("");
  };
  useEffect(() => {
    if (selectedTransaction) {
      setTitle(selectedTransaction.title);
      setAmount(selectedTransaction.amount);
      setCategory(selectedTransaction.category);
    }
  }, [selectedTransaction]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded-xl shadow-sm bg-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Salary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={amount ?? ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="e.g., 1000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
