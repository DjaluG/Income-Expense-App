"use client"; 
import { useState } from 'react';
import { FormEvent } from 'react';
import React from 'react';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    amount: number;
    type: string;
    category: string;
    date: string;
  }) => void;
}

export default function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction = {
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    onAddTransaction(newTransaction);

    setAmount('');
    setType('income');
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Rp"
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label>Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 w-full"
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {type === 'income' ? (
            <>
              <option value="Invest">Investment</option>
              <option value="Business">Business</option>
            </>
          ) : (
            <>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
}
