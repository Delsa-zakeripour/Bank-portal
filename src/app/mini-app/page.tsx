"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Receipt,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import Dashboard from "./dashboard/page";
import Transactions from "./transactions/page";
import Transfer from "./transfer/page";
import Cards from "./cards/page";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
// import LandingPage from "../page";
// import LoginPage from "../auth/login/page";

type Page = "dashboard" | "transactions" | "transfer" | "cards";
type AppView = "landing" | "login" | "dashboard";

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentView, setCurrentView] = useState<AppView>("landing");
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { id: "dashboard" as Page, name: "Dashboard", icon: LayoutDashboard },
    { id: "transactions" as Page, name: "Transactions", icon: Receipt },
    { id: "transfer" as Page, name: "Transfer", icon: ArrowRightLeft },
    { id: "cards" as Page, name: "Cards", icon: CreditCard },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "transfer":
        return <Transfer />;
      case "cards":
        return <Cards />;
      default:
        return <Dashboard />;
    }
  };

  const handleShowLogin = () => {
    setCurrentView("login");
  };

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  // if (currentView === "landing") {
  //   return <LandingPage onLogin={handleShowLogin} />;
  // }

  // if (currentView === "login") {
  //   return <LoginPage onLogin={handleLogin} onBack={handleBackToLanding} />;
  // }

  const isDark = theme === "dark";

  return (
    <div
      className={`size-full flex ${isDark ? "bg-neutral-900" : "bg-neutral-50"}`}
    >
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className={`fixed inset-0 ${isDark ? "bg-black/70" : "bg-black/50"} z-40 lg:hidden`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 h-screen
        w-64 ${isDark ? "bg-neutral-950 border-neutral-800" : "bg-white border-neutral-200"} border-r
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div
            className={`p-6 ${isDark ? "border-neutral-800" : "border-neutral-200"} border-b flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2
                  className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}
                >
                  BankPro
                </h2>
                <p
                  className={`text-xs ${isDark ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  Digital Banking
                </p>
              </div>
            </div>
            <button
              className={`lg:hidden p-2 rounded-lg ${isDark ? "hover:bg-neutral-800 text-neutral-400" : "hover:bg-neutral-100 text-neutral-600"}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 bg-red-500 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? isDark
                          ? "bg-blue-600/20 text-blue-400"
                          : "bg-blue-50 text-blue-700"
                        : isDark
                          ? "text-neutral-300 hover:bg-neutral-800"
                          : "text-neutral-700 hover:bg-neutral-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div
            className={`mt-2 p-4 ${isDark ? "border-neutral-800" : "border-neutral-200"} border-t space-y-1`}
          >
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isDark
                  ? "text-neutral-300 hover:bg-neutral-800"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
              <span className="font-medium">
                {isDark ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isDark
                  ? "text-neutral-300 hover:bg-neutral-800"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isDark
                  ? "text-red-400 hover:bg-red-950/30"
                  : "text-red-600 hover:bg-red-50"
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div
          className={`lg:hidden ${isDark ? "bg-neutral-950 border-neutral-800" : "bg-white border-neutral-200"} border-b p-4 flex items-center justify-between sticky top-0 z-30`}
        >
          <button
            className={`p-2 rounded-lg ${isDark ? "hover:bg-neutral-800 text-neutral-300" : "hover:bg-neutral-100 text-neutral-600"}`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2
            className={`font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}
          >
            BankPro
          </h2>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-neutral-800 text-neutral-300" : "hover:bg-neutral-100 text-neutral-600"}`}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Page Content */}
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
