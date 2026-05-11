export type DashboardApiResponse = {
  currency: "USD";
  period: { range: "month"; from: string; to: string };
  kpis: {
    totalBalance: number;
    incomeThisMonth: number;
    expensesThisMonth: number;
    savingsRate: number;
  };
  accounts: {
    id: number;
    name: string;
    balance: number;
    type: "checking" | "savings" | "investment";
    number: string;
  }[];
  spendingOverview: { chartData: { month: string; spending: number }[] };
  recentTransactions: {
    id: number;
    name: string;
    amount: number;
    date: string;
    category: string;
  }[];
};
