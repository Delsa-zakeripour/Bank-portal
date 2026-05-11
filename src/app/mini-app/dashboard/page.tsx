"use client";
import {
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { DashboardApiResponse } from "@/types/dashboard";

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState<DashboardApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError(null);
        const res = await fetch("/api/dashboard", { method: "GET" });
        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(payload?.error ?? `Request failed (${res.status})`);
        }
        const json = (await res.json()) as DashboardApiResponse;
        if (isMounted) setData(json);
      } catch (e) {
        if (!isMounted) return;
        setError(e instanceof Error ? e.message : "Failed to load dashboard");
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const accounts = data?.accounts ?? [];
  const chartData = data?.spendingOverview.chartData ?? [];
  const recentTransactions = data?.recentTransactions ?? [];
  
  const totalBalance = useMemo(() => {
    if (data?.kpis?.totalBalance != null) return data.kpis.totalBalance;
    return accounts.reduce((sum, account) => sum + account.balance, 0);
  }, [accounts, data?.kpis?.totalBalance]);

  const incomeThisMonth = data?.kpis.incomeThisMonth ?? 0;
  const expensesThisMonth = data?.kpis.expensesThisMonth ?? 0;
  const savingsRate = data?.kpis.savingsRate ?? 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className={`mb-2 ${isDark ? "text-white" : "text-neutral-900"}`}>
          Dashboard
        </h1>
        <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>
          Welcome back! Here&apos;s your financial overview.
        </p>
      </div>

      {error && (
        <div
          className={`mb-6 rounded-lg border p-4 ${
            isDark
              ? "border-red-900/50 bg-red-950/30 text-red-200"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 ${isDark ? "bg-blue-600/20" : "bg-blue-50"} rounded-lg`}
            >
              <Wallet
                className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
          </div>
          <p
            className={`${isDark ? "text-neutral-400" : "text-neutral-600"} text-sm mb-1`}
          >
            Total Balance
          </p>
          <p
            className={`text-3xl font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}
          >
            $
            {totalBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div
          className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 ${isDark ? "bg-green-600/20" : "bg-green-50"} rounded-lg`}
            >
              <ArrowDownRight
                className={`w-6 h-6 ${isDark ? "text-green-400" : "text-green-600"}`}
              />
            </div>
          </div>
          <p
            className={`${isDark ? "text-neutral-400" : "text-neutral-600"} text-sm mb-1`}
          >
            Income (This Month)
          </p>
          <p
            className={`text-3xl font-semibold ${isDark ? "text-green-400" : "text-green-600"}`}
          >
            {incomeThisMonth.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <div
          className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 ${isDark ? "bg-red-600/20" : "bg-red-50"} rounded-lg`}
            >
              <ArrowUpRight
                className={`w-6 h-6 ${isDark ? "text-red-400" : "text-red-600"}`}
              />
            </div>
          </div>
          <p
            className={`${isDark ? "text-neutral-400" : "text-neutral-600"} text-sm mb-1`}
          >
            Expenses (This Month)
          </p>
          <p
            className={`text-3xl font-semibold ${isDark ? "text-red-400" : "text-red-600"}`}
          >
            {expensesThisMonth.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <div
          className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 ${isDark ? "bg-purple-600/20" : "bg-purple-50"} rounded-lg`}
            >
              <TrendingUp
                className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}
              />
            </div>
          </div>
          <p
            className={`${isDark ? "text-neutral-400" : "text-neutral-600"} text-sm mb-1`}
          >
            Savings Rate
          </p>
          <p
            className={`text-3xl font-semibold ${isDark ? "text-purple-400" : "text-purple-600"}`}
          >
            {(savingsRate * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Accounts and Spending Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Accounts List */}
        <div
          className={`lg:col-span-1 ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <h2 className={`mb-6 ${isDark ? "text-white" : "text-neutral-900"}`}>
            My Accounts
          </h2>
          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`p-4 rounded-lg transition-colors cursor-pointer border ${
                  isDark
                    ? "bg-neutral-900 hover:bg-neutral-700 border-neutral-700"
                    : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${isDark ? "bg-neutral-800" : "bg-white"}`}
                    >
                      <CreditCard
                        className={`w-5 h-5 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium text-sm ${isDark ? "text-white" : "text-neutral-900"}`}
                      >
                        {account.name}
                      </p>
                      <p
                        className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      >
                        {account.number}
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  className={`text-xl font-semibold mt-2 ${isDark ? "text-white" : "text-neutral-900"}`}
                >
                  $
                  {account.balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Chart */}
        <div
          className={`lg:col-span-2 ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <h2 className={`mb-6 ${isDark ? "text-white" : "text-neutral-900"}`}>
            Spending Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={isDark ? "#60a5fa" : "#3b82f6"}
                    stopOpacity={isDark ? 0.4 : 0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={isDark ? "#60a5fa" : "#3b82f6"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#404040" : "#e5e7eb"}
              />
              <XAxis dataKey="month" stroke={isDark ? "#a3a3a3" : "#6b7280"} />
              <YAxis stroke={isDark ? "#a3a3a3" : "#6b7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#262626" : "#fff",
                  border: `1px solid ${isDark ? "#404040" : "#e5e7eb"}`,
                  borderRadius: "8px",
                  color: isDark ? "#fff" : "#000",
                }}
              />
              <Area
                type="monotone"
                dataKey="spending"
                stroke={isDark ? "#60a5fa" : "#3b82f6"}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSpending)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div
        className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={isDark ? "text-white" : "text-neutral-900"}>
            Recent Transactions
          </h2>
          <button
            className={`text-sm font-medium ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                isDark ? "hover:bg-neutral-700" : "hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-full ${
                    transaction.amount > 0
                      ? isDark
                        ? "bg-green-600/20"
                        : "bg-green-50"
                      : isDark
                        ? "bg-red-600/20"
                        : "bg-red-50"
                  }`}
                >
                  {transaction.amount > 0 ? (
                    <ArrowDownRight
                      className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`}
                    />
                  ) : (
                    <ArrowUpRight
                      className={`w-5 h-5 ${isDark ? "text-red-400" : "text-red-600"}`}
                    />
                  )}
                </div>
                <div>
                  <p
                    className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}
                  >
                    {transaction.name}
                  </p>
                  <p
                    className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  transaction.amount > 0
                    ? isDark
                      ? "text-green-400"
                      : "text-green-600"
                    : isDark
                      ? "text-white"
                      : "text-neutral-900"
                }`}
              >
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
