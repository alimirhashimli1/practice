import React from "react";

interface TransactionFormProps {
  title: string;
  amount: number | null;
  category: string;
  addTransaction: (e: React.FormEvent<HTMLFormElement>) => void;
  setTitle: (e: string) => void;
  setAmount: (e: number) => void;
  setCategory: (e: string) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  addTransaction,
  setTitle,
  setAmount,
  setCategory,
  title,
  amount,
  category,
}) => {
  return (
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
  );
};

export default TransactionForm;
