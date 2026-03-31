import { useMemo } from 'react';
import { useBudget } from '@/context/BudgetContext';
import { Category, CATEGORY_ICONS } from '@/types/budget';
import { Lightbulb } from 'lucide-react';

export default function Insights() {
  const { transactions } = useBudget();

  const insights = useMemo(() => {
    const results: string[] = [];
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;

    const thisMonthExpenses = transactions.filter(
      (t) => t.type === 'expense' && t.date.startsWith(thisMonth)
    );
    const lastMonthExpenses = transactions.filter(
      (t) => t.type === 'expense' && t.date.startsWith(lastMonthStr)
    );

    // Highest spending category this month
    const catMap = new Map<Category, number>();
    thisMonthExpenses.forEach((t) => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));
    if (catMap.size > 0) {
      const [topCat] = [...catMap.entries()].sort((a, b) => b[1] - a[1])[0];
      results.push(`${CATEGORY_ICONS[topCat]} You spent the most on ${topCat} this month.`);
    }

    // Compare categories between months
    const lastCatMap = new Map<Category, number>();
    lastMonthExpenses.forEach((t) => lastCatMap.set(t.category, (lastCatMap.get(t.category) || 0) + t.amount));
    catMap.forEach((thisAmt, cat) => {
      const lastAmt = lastCatMap.get(cat) || 0;
      if (lastAmt > 0) {
        const change = ((thisAmt - lastAmt) / lastAmt) * 100;
        if (change > 10) {
          results.push(`📈 Your ${cat} costs increased by ${Math.round(change)}% compared to last month.`);
        } else if (change < -10) {
          results.push(`📉 Your ${cat} spending decreased by ${Math.round(Math.abs(change))}% — nice saving!`);
        }
      }
    });

    const totalThis = thisMonthExpenses.reduce((s, t) => s + t.amount, 0);
    const totalLast = lastMonthExpenses.reduce((s, t) => s + t.amount, 0);
    if (totalLast > 0 && totalThis > totalLast) {
      results.push(`⚠️ You're spending more overall this month than last month.`);
    } else if (totalLast > 0 && totalThis < totalLast) {
      results.push(`🎉 Great job! You're spending less this month than last month.`);
    }

    if (results.length === 0) {
      results.push('💡 Add more transactions to see spending insights!');
    }

    return results;
  }, [transactions]);

  return (
    <div className="gradient-card rounded-xl p-5 space-y-3 animate-fade-in">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-accent" />
        <h2 className="font-heading text-lg font-semibold">Smart Insights</h2>
      </div>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            {insight}
          </p>
        ))}
      </div>
    </div>
  );
}
