import { CurrencyCode, CURRENCIES } from '@/types/budget';

export function formatCurrency(amount: number, code: CurrencyCode): string {
  const curr = CURRENCIES.find(c => c.code === code);
  const symbol = curr?.symbol || '$';
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${amount < 0 ? '-' : ''}${symbol}${formatted}`;
}
