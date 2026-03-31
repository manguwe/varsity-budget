import { useState } from 'react';
import { useBudget } from '@/context/BudgetContext';
import { formatCurrency } from '@/lib/currency';
import { CATEGORIES, CATEGORY_ICONS, Category, Transaction, TransactionType } from '@/types/budget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2 } from 'lucide-react';

export default function TransactionList() {
  const { transactions, deleteTransaction, updateTransaction, currency } = useBudget();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDate, setFilterDate] = useState('');
  const [editing, setEditing] = useState<Transaction | null>(null);

  const filtered = transactions.filter((t) => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (filterDate && t.date !== filterDate) return false;
    return true;
  });

  return (
    <div className="gradient-card rounded-xl p-5 space-y-4 animate-fade-in">
      <h2 className="font-heading text-lg font-semibold">Transactions</h2>

      <div className="flex flex-wrap gap-2">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[120px] h-8 text-xs">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-[140px] h-8 text-xs"
        />
        {filterDate && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setFilterDate('')}>
            Clear
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          No transactions yet. Add one to get started! 🎓
        </p>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl flex-shrink-0">{CATEGORY_ICONS[t.category]}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{t.category}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.date}{t.note ? ` · ${t.note}` : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-sm font-semibold ${
                    t.type === 'income' ? 'text-income' : 'text-expense'
                  }`}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount, currency)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setEditing(t)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={() => deleteTransaction(t.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <EditDialog
          transaction={editing}
          onClose={() => setEditing(null)}
          onSave={(t) => {
            updateTransaction(t);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function EditDialog({
  transaction,
  onClose,
  onSave,
}: {
  transaction: Transaction;
  onClose: () => void;
  onSave: (t: Transaction) => void;
}) {
  const [amount, setAmount] = useState(String(transaction.amount));
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [note, setNote] = useState(transaction.note || '');
  const [type, setType] = useState<TransactionType>(transaction.type);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Edit Transaction</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...transaction,
              type,
              amount: parseFloat(amount),
              category,
              date,
              note: note.trim() || undefined,
            });
          }}
        >
          <div className="flex gap-2">
            <Button type="button" variant={type === 'income' ? 'default' : 'outline'} className="flex-1" onClick={() => setType('income')}>Income</Button>
            <Button type="button" variant={type === 'expense' ? 'default' : 'outline'} className="flex-1" onClick={() => setType('expense')}>Expense</Button>
          </div>
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Note</Label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
