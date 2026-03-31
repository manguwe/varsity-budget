import { useBudget } from '@/context/BudgetContext';
import { useAuth } from '@/context/AuthContext';
import { CURRENCIES } from '@/types/budget';
import { LogOut, Moon, Sun, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Header() {
  const { currency, setCurrency, darkMode, toggleDarkMode } = useBudget();
  const { signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold leading-tight">BudgetBuddy</h1>
            <p className="text-xs text-muted-foreground leading-none">Student Budget Tracker</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={currency} onValueChange={(v) => setCurrency(v as any)}>
            <SelectTrigger className="w-[100px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-9 w-9">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
