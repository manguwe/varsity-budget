import { useMemo } from 'react';
import { useBudget } from '@/context/BudgetContext';
import { CATEGORIES, CATEGORY_ICONS, Category } from '@/types/budget';
import { formatCurrency } from '@/lib/currency';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';

export default function BudgetSettings() {
  const { budgetLimits, setBudgetLimit, transactions, currency } = useBudget();

  const currentMonth = new Date().toISOString().slice(0, 7);

  const spentByCategory = useMemo(() => {
    const map = new Map<Category, number>();
    transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(currentMonth))
      .forEach((t) => map.set(t.category, (map.get(t.category) || 0) + t.amount));
    return map;
  }, [transactions, currentMonth]);

  return (
    <div className="gradient-card rounded-xl p-5 space-y-4 animate-fade-in">
      <h2 className="font-heading text-lg font-semibold">Monthly Budget Limits</h2>
      <div className="space-y-3">
        {CATEGORIES.map((cat) => {
          const limit = budgetLimits.find((b) => b.category === cat)?.limit || 0;
          const spent = spentByCategory.get(cat) || 0;
          const pct = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
          const exceeded = limit > 0 && spent > limit;

          return (
            <div key={cat} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1.5">
                  <span>{CATEGORY_ICONS[cat]}</span>
                  {cat}
                </span>
                <div className="flex items-center gap-2">
                  {exceeded && (
                    <span className="flex items-center gap-1 text-xs text-destructive font-medium">
                      <AlertTriangle className="h-3 w-3" />
                      Over budget!
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatCurrency(spent, currency)} / {limit > 0 ? formatCurrency(limit, currency) : '—'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={pct} className="flex-1 h-2" />
                <Input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Limit"
                  className="w-20 h-7 text-xs"
                  value={limit || ''}
                  onChange={(e) => setBudgetLimit(cat, parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
