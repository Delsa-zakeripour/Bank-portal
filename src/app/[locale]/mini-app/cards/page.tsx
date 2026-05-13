"use client";
import { CreditCard, Lock, Eye, EyeOff, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const cards = [
  {
    id: 1,
    name: "Platinum Rewards",
    number: "4532 **** **** 8920",
    fullNumber: "4532 1234 5678 8920",
    expiry: "12/28",
    cvv: "123",
    type: "credit",
    balance: 2450.5,
    limit: 10000,
    color: "from-slate-700 to-slate-900",
  },
  {
    id: 2,
    name: "Debit Card",
    number: "5421 **** **** 3456",
    fullNumber: "5421 9876 5432 3456",
    expiry: "09/27",
    cvv: "456",
    type: "debit",
    balance: 12453.82,
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 3,
    name: "Business Gold",
    number: "3782 **** **** 1009",
    fullNumber: "3782 8224 6310 1009",
    expiry: "03/29",
    cvv: "789",
    type: "credit",
    balance: 5670.25,
    limit: 25000,
    color: "from-amber-600 to-amber-800",
  },
];

export default function Cards() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [revealedCards, setRevealedCards] = useState<Record<number, boolean>>(
    {},
  );

  const toggleReveal = (cardId: number) => {
    setRevealedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className={`mb-2 ${isDark ? "text-white" : "text-neutral-900"}`}>
          My Cards
        </h1>
        <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>
          Manage your credit and debit cards.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.id} className="relative group">
            <div
              className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-xl h-56 flex flex-col justify-between`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm opacity-80">
                    {card.type === "credit" ? "Credit Card" : "Debit Card"}
                  </p>
                  <p className="font-medium mt-1">{card.name}</p>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Card Number */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-xl tracking-wider font-mono">
                    {revealedCards[card.id] ? card.fullNumber : card.number}
                  </p>
                  <button
                    onClick={() => toggleReveal(card.id)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    {revealedCards[card.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-80">Valid Thru</p>
                    <p className="text-sm font-medium">{card.expiry}</p>
                  </div>
                  {revealedCards[card.id] && (
                    <div>
                      <p className="text-xs opacity-80">CVV</p>
                      <p className="text-sm font-medium">{card.cvv}</p>
                    </div>
                  )}
                  <CreditCard className="w-12 h-12 opacity-20" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div
          className={`border-2 border-dashed rounded-2xl p-6 h-56 flex flex-col items-center justify-center transition-colors cursor-pointer group ${
            isDark
              ? "border-neutral-600 hover:border-blue-500 hover:bg-blue-600/10"
              : "border-neutral-300 hover:border-blue-500 hover:bg-blue-50"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
              isDark
                ? "bg-neutral-800 group-hover:bg-blue-600/20"
                : "bg-neutral-100 group-hover:bg-blue-100"
            }`}
          >
            <svg
              className={`w-8 h-8 ${isDark ? "text-neutral-400 group-hover:text-blue-400" : "text-neutral-400 group-hover:text-blue-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <p
            className={`font-medium ${isDark ? "text-neutral-300 group-hover:text-blue-400" : "text-neutral-700 group-hover:text-blue-600"}`}
          >
            Add New Card
          </p>
          <p
            className={`text-sm mt-1 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}
          >
            Request a new card
          </p>
        </div>
      </div>

      {/* Card Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Spending */}
        <div
          className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <h2 className={`mb-6 ${isDark ? "text-white" : "text-neutral-900"}`}>
            Card Spending
          </h2>
          <div className="space-y-4">
            {cards.map((card) => {
              const utilizationPercent =
                card.type === "credit" && card.limit
                  ? (card.balance / card.limit) * 100
                  : 0;

              return (
                <div
                  key={card.id}
                  className={`p-4 rounded-lg border ${
                    isDark
                      ? "bg-neutral-900 border-neutral-700"
                      : "bg-neutral-50 border-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p
                        className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}
                      >
                        {card.name}
                      </p>
                      <p
                        className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      >
                        {card.number}
                      </p>
                    </div>
                    <p
                      className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}
                    >
                      $
                      {card.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  {card.type === "credit" && card.limit && (
                    <>
                      <div
                        className={`w-full rounded-full h-2 mb-2 ${isDark ? "bg-neutral-700" : "bg-neutral-200"}`}
                      >
                        <div
                          className={`h-2 rounded-full ${
                            utilizationPercent > 75
                              ? "bg-red-500"
                              : utilizationPercent > 50
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${utilizationPercent}%` }}
                        />
                      </div>
                      <p
                        className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                      >
                        $
                        {(card.limit - card.balance).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        available of $
                        {card.limit.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Controls */}
        <div
          className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
        >
          <h2 className={`mb-6 ${isDark ? "text-white" : "text-neutral-900"}`}>
            Card Controls
          </h2>
          <div className="space-y-4">
            <button
              className={`w-full p-4 rounded-lg transition-colors text-left flex items-center gap-4 border ${
                isDark
                  ? "bg-neutral-900 hover:bg-neutral-700 border-neutral-700"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${isDark ? "bg-blue-600/20" : "bg-blue-50"}`}
              >
                <Lock
                  className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                />
              </div>
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}
                >
                  Freeze Card
                </p>
                <p
                  className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Temporarily disable your card
                </p>
              </div>
            </button>

            <button
              className={`w-full p-4 rounded-lg transition-colors text-left flex items-center gap-4 border ${
                isDark
                  ? "bg-neutral-900 hover:bg-neutral-700 border-neutral-700"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${isDark ? "bg-green-600/20" : "bg-green-50"}`}
              >
                <svg
                  className={`w-5 h-5 ${isDark ? "text-green-400" : "text-green-600"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}
                >
                  Set Spending Limits
                </p>
                <p
                  className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Control your card spending
                </p>
              </div>
            </button>

            <button
              className={`w-full p-4 rounded-lg transition-colors text-left flex items-center gap-4 border ${
                isDark
                  ? "bg-neutral-900 hover:bg-neutral-700 border-neutral-700"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${isDark ? "bg-purple-600/20" : "bg-purple-50"}`}
              >
                <svg
                  className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}
                >
                  Transaction Alerts
                </p>
                <p
                  className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Get notified of card activity
                </p>
              </div>
            </button>

            <button
              className={`w-full p-4 rounded-lg transition-colors text-left flex items-center gap-4 border ${
                isDark
                  ? "bg-neutral-900 hover:bg-neutral-700 border-neutral-700"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${isDark ? "bg-amber-600/20" : "bg-amber-50"}`}
              >
                <svg
                  className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-600"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-neutral-900"}`}
                >
                  Change PIN
                </p>
                <p
                  className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Update your card PIN
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
