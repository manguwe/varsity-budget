import { useBudget } from '@/context/BudgetContext';
import { Transaction } from '@/types/budget';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { useRef } from 'react';
import { toast } from '@/hooks/use-toast';

export default function DataExport() {
  const { transactions, addTransaction } = useBudget();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportCSV = () => {
    if (transactions.length === 0) {
      toast({ title: 'No data to export', variant: 'destructive' });
      return;
    }
    const headers = 'Type,Amount,Category,Date,Note\n';
    const rows = transactions
      .map((t) => `${t.type},${t.amount},${t.category},${t.date},"${t.note || ''}"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Exported successfully! 📁' });
  };

  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split('\n').slice(1);
      let count = 0;
      lines.forEach((line) => {
        const match = line.match(/^(income|expense),([\d.]+),(.+?),([\d-]+),\"?(.*)\"?$/);
        if (match) {
          addTransaction({
            type: match[1] as 'income' | 'expense',
            amount: parseFloat(match[2]),
            category: match[3] as any,
            date: match[4],
            note: match[5] || undefined,
          });
          count++;
        }
      });
      toast({ title: `Imported ${count} transactions! 🎉` });
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={exportCSV}>
        <Download className="h-3.5 w-3.5" />
        Export CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 text-xs"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-3.5 w-3.5" />
        Import CSV
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={importCSV}
      />
    </div>
  );
}
