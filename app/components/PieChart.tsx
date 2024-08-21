import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useMemo } from 'react';
import { TooltipItem } from 'chart.js'; 

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface PieChartProps {
  transactions: {
    amount: number;
    type: string;
    category: string;
  }[];
  type: 'income' | 'expense';
}

export default function PieChart({ transactions, type }: PieChartProps) {
  
  const filteredTransactions = transactions.filter(transaction => transaction.type === type);

  const categories = filteredTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9f40'],
      },
    ],
  };

  const options = useMemo(() => ({
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            let label = context.label || '';
            if (context.parsed !== null) {
              label += `: ${context.parsed.toFixed(2)}`;
            }
            return label;
          },
        },
      },
    },
  }), []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">{type === 'income' ? 'Income' : 'Expense'} by Category</h2>
      <Pie data={data} options={options} />
    </div>
  );
}
