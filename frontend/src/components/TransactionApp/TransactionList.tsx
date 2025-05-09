import React from "react";
import { Transaction } from "./types";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

interface Props {
  transactions: Transaction[];
  transactionSum: number;
  onEdit: (t: Transaction) => void;
  onDelete: (title: string) => void;
  onSort: () => void;
}

const TransactionList: React.FC<Props> = ({
  transactions,
  transactionSum,
  onEdit,
  onDelete,
  onSort,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
        <span>Total:</span>
        <span
          className={`font-bold ${
            transactionSum >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {transactionSum} €
        </span>
      </div>

      <button
        onClick={onSort}
        className="flex items-center gap-1 text-sm text-indigo-600 hover:underline hover:text-indigo-800 transition"
      >
        <ArrowUpDown size={16} />
        Sort by Amount
      </button>

      <ul className="space-y-2">
        {transactions.length === 0 ? (
          <li className="text-center text-gray-500 italic">No transactions yet.</li>
        ) : (
          transactions.map((transaction, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div>
                <p className="font-medium text-gray-800">{transaction.title}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>

              <div className="flex items-center gap-4">
                <p
                  className={`text-md font-semibold ${
                    transaction.category === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.category === "income" ? "+" : "-"}
                  {transaction.amount} €
                </p>

                <button
                  onClick={() => onEdit(transaction)}
                  className="text-gray-500 hover:text-indigo-600 transition"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(transaction.title)}
                  className="text-gray-500 hover:text-red-600 transition"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
