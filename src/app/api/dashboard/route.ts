import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

type DashboardAccount = {
  id: number;
  name: string;
  balance: number;
  type: "checking" | "savings" | "investment";
  number: string;
};

type DashboardTransaction = {
  id: number;
  name: string;
  amount: number;
  date: string; // YYYY-MM-DD (matches current UI)
  category: string;
};

type DashboardChartPoint = { month: string; spending: number };

type DashboardResponse = {
  currency: "USD";
  period: { range: "month"; from: string; to: string };
  kpis: {
    totalBalance: number;
    incomeThisMonth: number;
    expensesThisMonth: number;
    savingsRate: number; // 0..1
  };
  accounts: DashboardAccount[];
  spendingOverview: { chartData: DashboardChartPoint[] };
  recentTransactions: DashboardTransaction[];
};

function toYyyyMmDd(d: Date) {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getMonthRangeUtc(now = new Date()) {
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const to = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0));
  return { from, to };
}

const accountNames: Record<
  "checking" | "savings" | "investment",
  { en: string; fa: string }
> = {
  checking: { en: "Checking Account", fa: "حساب جاری" },
  savings: { en: "Savings Account", fa: "حساب پس‌انداز" },
  investment: { en: "Investment Account", fa: "حساب سرمایه‌گذاری" },
};

function buildMockDashboard(locale: string): DashboardResponse {
  const isFa = locale === "fa";

  const accounts: DashboardAccount[] = [
    {
      id: 1,
      name: isFa ? accountNames.checking.fa : accountNames.checking.en,
      balance: 12453.82,
      type: "checking",
      number: "****4532",
    },
    {
      id: 2,
      name: isFa ? accountNames.savings.fa : accountNames.savings.en,
      balance: 28750.0,
      type: "savings",
      number: "****7821",
    },
    {
      id: 3,
      name: isFa ? accountNames.investment.fa : accountNames.investment.en,
      balance: 45890.25,
      type: "investment",
      number: "****9012",
    },
  ];

  const recentTransactions: DashboardTransaction[] = [
    {
      id: 1,
      name: "Amazon Purchase",
      amount: -127.45,
      date: "2026-04-30",
      category: "Shopping",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 4500.0,
      date: "2026-04-29",
      category: "Income",
    },
    {
      id: 3,
      name: "Electric Bill",
      amount: -89.32,
      date: "2026-04-28",
      category: "Utilities",
    },
    {
      id: 4,
      name: "Coffee Shop",
      amount: -12.5,
      date: "2026-04-27",
      category: "Food",
    },
    {
      id: 5,
      name: "Gym Membership",
      amount: -49.99,
      date: "2026-04-26",
      category: "Health",
    },
  ];

  const chartData: DashboardChartPoint[] = [
    { month: "Jan", spending: 2400 },
    { month: "Feb", spending: 1398 },
    { month: "Mar", spending: 3800 },
    { month: "Apr", spending: 3908 },
    { month: "May", spending: 4800 },
    { month: "Jun", spending: 3800 },
  ];

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const incomeThisMonth = 4500.0;
  const expensesThisMonth = 279.26;
  const savingsRate =
    incomeThisMonth > 0
      ? (incomeThisMonth - expensesThisMonth) / incomeThisMonth
      : 0;

  const { from, to } = getMonthRangeUtc();

  return {
    currency: "USD",
    period: { range: "month", from: toYyyyMmDd(from), to: toYyyyMmDd(to) },
    kpis: { totalBalance, incomeThisMonth, expensesThisMonth, savingsRate },
    accounts,
    spendingOverview: { chartData },
    recentTransactions,
  };
}

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  console.log("tokennnnnn", token);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const locale = req.headers.get("x-locale") ?? "en";
  const dashboard = buildMockDashboard(locale);

  return NextResponse.json(dashboard, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
