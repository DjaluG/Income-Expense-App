import React from 'react';

interface TransactionListProps {
  transactions: {
    id: number;
    amount: number;
    type: string;
    category: string;
    date: string;
  }[];
  onDeleteTransaction: (id: number) => void;
}

export default function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="border rounded p-2 mb-2 flex justify-between items-center">
            <div>
              <strong>{transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}:</strong> {transaction.category} - Rp{transaction.amount.toLocaleString()}
              <br />
              <small>{new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <button
              onClick={() => onDeleteTransaction(transaction.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 p-2 border-t-2 border-gray-300">
        <h3 className="text-lg font-bold">Summary</h3>
        <p><strong>Saldo:</strong> Rp{(totalIncome - totalExpense).toLocaleString()}</p>
      </div>
    </div>
  );
}
