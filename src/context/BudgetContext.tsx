import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Transaction, BudgetLimit, CurrencyCode, Category, CATEGORIES } from '@/types/budget';

interface BudgetContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  budgetLimits: BudgetLimit[];
  setBudgetLimit: (category: Category, limit: number) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const BudgetContext = createContext<BudgetContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadFromStorage('sbt_transactions', [])
  );
  const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>(() =>
    loadFromStorage('sbt_budgets', [])
  );
  const [currency, setCurrencyState] = useState<CurrencyCode>(() =>
    loadFromStorage('sbt_currency', 'USD')
  );
  const [darkMode, setDarkMode] = useState(() =>
    loadFromStorage('sbt_darkMode', false)
  );

  useEffect(() => {
    localStorage.setItem('sbt_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('sbt_budgets', JSON.stringify(budgetLimits));
  }, [budgetLimits]);

  useEffect(() => {
    localStorage.setItem('sbt_currency', JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('sbt_darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const updateTransaction = useCallback((t: Transaction) => {
    setTransactions(prev => prev.map(tx => (tx.id === t.id ? t : tx)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }, []);

  const setBudgetLimit = useCallback((category: Category, limit: number) => {
    setBudgetLimits(prev => {
      const existing = prev.findIndex(b => b.category === category);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = { category, limit };
        return copy;
      }
      return [...prev, { category, limit }];
    });
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => setCurrencyState(c), []);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        budgetLimits,
        setBudgetLimit,
        currency,
        setCurrency,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error('useBudget must be used within BudgetProvider');
  return ctx;
}
