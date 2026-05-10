import { ArrowRightLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const accounts = [
  { id: 1, name: "Checking Account", balance: 12453.82, number: "****4532" },
  { id: 2, name: "Savings Account", balance: 28750.0, number: "****7821" },
  { id: 3, name: "Investment Account", balance: 45890.25, number: "****9012" },
];

export default function Transfer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [fromAccount, setFromAccount] = useState("1");
  const [toAccount, setToAccount] = useState("2");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    const selectedAccount = accounts.find(
      (acc) => acc.id.toString() === fromAccount,
    );
    if (selectedAccount && parseFloat(amount) > selectedAccount.balance) {
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount("");
      setMemo("");
    }, 3000);
  };

  const selectedFromAccount = accounts.find(
    (acc) => acc.id.toString() === fromAccount,
  );
  const selectedToAccount = accounts.find(
    (acc) => acc.id.toString() === toAccount,
  );
  const transferAmount = parseFloat(amount) || 0;
  const insufficientFunds =
    selectedFromAccount && transferAmount > selectedFromAccount.balance;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className={`mb-2 ${isDark ? "text-white" : "text-neutral-900"}`}>
          Transfer Money
        </h1>
        <p className={isDark ? "text-neutral-400" : "text-neutral-600"}>
          Transfer funds between your accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form */}
        <div className="lg:col-span-2">
          <div
            className={`${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-8 border shadow-sm`}
          >
            {showSuccess && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  isDark
                    ? "bg-green-600/20 border-green-600/30 border"
                    : "bg-green-50 border-green-200 border"
                }`}
              >
                <div
                  className={`p-1 rounded-full ${isDark ? "bg-green-600/30" : "bg-green-100"}`}
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`font-medium ${isDark ? "text-green-400" : "text-green-900"}`}
                  >
                    Transfer Successful!
                  </p>
                  <p
                    className={`text-sm mt-1 ${isDark ? "text-green-300" : "text-green-700"}`}
                  >
                    ${transferAmount.toFixed(2)} has been transferred
                    successfully.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleTransfer} className="space-y-6">
              {/* From Account */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  From Account
                </label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "border-neutral-600 bg-neutral-900 text-white"
                      : "border-neutral-300 bg-white text-neutral-900"
                  }`}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.number}) - $
                      {account.balance.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Account */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  To Account
                </label>
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "border-neutral-600 bg-neutral-900 text-white"
                      : "border-neutral-300 bg-white text-neutral-900"
                  }`}
                >
                  {accounts
                    .filter((acc) => acc.id.toString() !== fromAccount)
                    .map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} ({account.number})
                      </option>
                    ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  Amount
                </label>
                <div className="relative">
                  <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDark
                        ? "border-neutral-600 bg-neutral-900 text-white"
                        : "border-neutral-300 bg-white text-neutral-900"
                    }`}
                    required
                  />
                </div>
                {insufficientFunds && (
                  <div
                    className={`mt-2 flex items-center gap-2 text-sm ${isDark ? "text-red-400" : "text-red-600"}`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Insufficient funds in selected account</span>
                  </div>
                )}
              </div>

              {/* Memo */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
                >
                  Memo (Optional)
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Add a note..."
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "border-neutral-600 bg-neutral-900 text-white"
                      : "border-neutral-300 bg-white text-neutral-900"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  insufficientFunds || !amount || parseFloat(amount) <= 0
                }
                className={`w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  insufficientFunds || !amount || parseFloat(amount) <= 0
                    ? isDark
                      ? "disabled:bg-neutral-700"
                      : "disabled:bg-neutral-300"
                    : ""
                }`}
              >
                <ArrowRightLeft className="w-5 h-5" />
                Transfer Funds
              </button>
            </form>
          </div>
        </div>

        {/* Transfer Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg border border-blue-500">
            <h3 className="mb-6">Transfer Summary</h3>

            <div className="space-y-4">
              <div>
                <p className="text-blue-100 text-sm mb-1">From</p>
                <p className="font-medium">{selectedFromAccount?.name}</p>
                <p className="text-sm text-blue-100">
                  {selectedFromAccount?.number}
                </p>
              </div>

              <div className="flex justify-center py-2">
                <ArrowRightLeft className="w-6 h-6 text-blue-200" />
              </div>

              <div>
                <p className="text-blue-100 text-sm mb-1">To</p>
                <p className="font-medium">{selectedToAccount?.name}</p>
                <p className="text-sm text-blue-100">
                  {selectedToAccount?.number}
                </p>
              </div>

              <div className="pt-4 border-t border-blue-500">
                <p className="text-blue-100 text-sm mb-1">Amount</p>
                <p className="text-3xl font-semibold">
                  ${transferAmount.toFixed(2)}
                </p>
              </div>

              {memo && (
                <div className="pt-4 border-t border-blue-500">
                  <p className="text-blue-100 text-sm mb-1">Memo</p>
                  <p className="text-sm">{memo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Transfer Tips */}
          <div
            className={`mt-6 ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} rounded-xl p-6 border shadow-sm`}
          >
            <h4
              className={`font-medium mb-3 ${isDark ? "text-white" : "text-neutral-900"}`}
            >
              Quick Tips
            </h4>
            <ul
              className={`space-y-2 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
              <li className="flex items-start gap-2">
                <span
                  className={
                    isDark ? "text-blue-400 mt-0.5" : "text-blue-600 mt-0.5"
                  }
                >
                  •
                </span>
                <span>Transfers are processed instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className={
                    isDark ? "text-blue-400 mt-0.5" : "text-blue-600 mt-0.5"
                  }
                >
                  •
                </span>
                <span>No fees for internal transfers</span>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className={
                    isDark ? "text-blue-400 mt-0.5" : "text-blue-600 mt-0.5"
                  }
                >
                  •
                </span>
                <span>Set up recurring transfers in Settings</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
