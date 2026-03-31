export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Food'
  | 'Transport'
  | 'Rent'
  | 'Data'
  | 'School Supplies'
  | 'Entertainment'
  | 'Other';

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Rent',
  'Data',
  'School Supplies',
  'Entertainment',
  'Other',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: '#f59e0b',
  Transport: '#3b82f6',
  Rent: '#8b5cf6',
  Data: '#06b6d4',
  'School Supplies': '#10b981',
  Entertainment: '#ec4899',
  Other: '#6b7280',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: '🍔',
  Transport: '🚌',
  Rent: '🏠',
  Data: '📶',
  'School Supplies': '📚',
  Entertainment: '🎮',
  Other: '📦',
};

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}

export interface BudgetLimit {
  category: Category;
  limit: number;
}

export type CurrencyCode = 'USD' | 'ZAR' | 'EUR' | 'GBP' | 'BWP' | 'KES' | 'NGN' | 'ZMW';

export const CURRENCIES: { code: CurrencyCode; name: string; symbol: string }[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK' },
];
