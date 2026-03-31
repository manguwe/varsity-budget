import { useBudget } from '@/context/BudgetContext';
import { formatCurrency } from '@/lib/currency';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function SummaryCards() {
  const { transactions, currency } = useBudget();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const cards = [
    {
      label: 'Total Income',
      value: totalIncome,
      className: 'stat-card-income',
      icon: TrendingUp,
      iconColor: 'text-income',
    },
    {
      label: 'Total Expenses',
      value: totalExpenses,
      className: 'stat-card-expense',
      icon: TrendingDown,
      iconColor: 'text-expense',
    },
    {
      label: 'Balance',
      value: balance,
      className: 'stat-card-balance',
      icon: Wallet,
      iconColor: 'text-primary',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`${c.className} rounded-xl p-5 animate-fade-in`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
            <c.icon className={`h-5 w-5 ${c.iconColor}`} />
          </div>
          <p className="mt-2 font-heading text-2xl font-bold">
            {formatCurrency(c.value, currency)}
          </p>
        </div>
      ))}
    </div>
  );
}
