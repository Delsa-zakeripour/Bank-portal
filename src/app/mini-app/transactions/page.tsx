"use client";

import {
  Search,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { TransactionResponse } from "@/types/transactions";

export default function Transactions() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [data, setData] = useState<TransactionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "all",
    "Income",
    "Shopping",
    "Food",
    "Utilities",
    "Health",
    "Transportation",
    "Entertainment",
    "Education",
  ];

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError(null);
        const res = await fetch("/api/transactions", { method: "GET" });

        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(payload?.error ?? `Request failed (${res.status})`);
        }
        const json = (await res.json()) as TransactionResponse;
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

  const filteredTransactions =
    data?.allTransactions.filter(
      (transaction: { name: string; category: string }) => {
        const matchesSearch = transaction.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" ||
          transaction.category === selectedCategory;

        return matchesSearch && matchesCategory;
      },
    ) ?? [];
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className={`mb-2 ${isDark ? "text-white" : "text-neutral-900"}`}>
          Transactions
        </h1>
        <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>
          View and manage all your transactions.
        </p>
      </div>

      {/* Filters and Search */}
      <div
        className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm mb-6`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? "border-neutral-600 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-900"
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`pl-10 pr-8 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer ${
                isDark
                  ? "border-neutral-600 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-900"
              }`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div
        className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl border shadow-sm overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={
                isDark
                  ? "bg-neutral-900 border-b border-neutral-700"
                  : "bg-neutral-50 border-b border-neutral-200"
              }
            >
              <tr>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  Transaction
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  Category
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  Account
                </th>
                <th
                  className={`px-6 py-4 text-left text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  Date
                </th>
                <th
                  className={`px-6 py-4 text-right text-sm font-medium ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody
              className={
                isDark
                  ? "divide-y divide-neutral-700"
                  : "divide-y divide-neutral-200"
              }
            >
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className={
                    isDark
                      ? "hover:bg-neutral-700 transition-colors"
                      : "hover:bg-neutral-50 transition-colors"
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
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
                            className={`w-4 h-4 ${isDark ? "text-green-400" : "text-green-600"}`}
                          />
                        ) : (
                          <ArrowUpRight
                            className={`w-4 h-4 ${isDark ? "text-red-400" : "text-red-600"}`}
                          />
                        )}
                      </div>
                      <span
                        className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}
                      >
                        {transaction.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-neutral-700 text-neutral-300"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                  >
                    {transaction.account}
                  </td>
                  <td
                    className={`px-6 py-4 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}
                  >
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
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
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <p className={isDark ? "text-neutral-400" : "text-neutral-500"}>
              No transactions found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
