import { BudgetProvider } from '@/context/BudgetContext';
import Header from '@/components/Header';
import SummaryCards from '@/components/SummaryCards';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import Charts from '@/components/Charts';
import BudgetSettings from '@/components/BudgetSettings';
import Insights from '@/components/Insights';
import DataExport from '@/components/DataExport';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <BudgetProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold">Dashboard</h2>
              <p className="text-sm text-muted-foreground">Track your student finances</p>
            </div>
            <div className="flex items-center gap-2">
              <DataExport />
              <TransactionForm />
            </div>
          </div>

          <SummaryCards />
          <Charts />

          <div className="grid gap-4 lg:grid-cols-2">
            <TransactionList />
            <div className="space-y-4">
              <BudgetSettings />
              <Insights />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </BudgetProvider>
  );
};

export default Index;
