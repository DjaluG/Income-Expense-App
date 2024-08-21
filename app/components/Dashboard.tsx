"use client"; 
import { useState, useEffect } from 'react';  
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import PieChart from './PieChart';
import React from 'react';

interface Transaction {
  id: number;
  amount: number;
  type: string;
  category: string;
  date: string;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    const newTransaction = await response.json();
    setTransactions([...transactions, newTransaction]);
  };

//   const fetchTransactions = async () => {
//     const response = await fetch('/api/transactions');
//     const data = await response.json();
//     setTransactions(data);
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);
const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error(`Error fetching transactions: ${response.statusText}`);
      }
      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteTransaction = async (id: number) => {
    await fetch('/api/transactions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };


  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold my-4">
       Income Expense App
      </h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList
        transactions={transactions}
        onDeleteTransaction={handleDeleteTransaction}
      />
      <div className="grid grid-cols-2 gap-4">
        <PieChart transactions={transactions} type="income" />
        <PieChart transactions={transactions} type="expense" />
      </div>
    </div>
  );
}
