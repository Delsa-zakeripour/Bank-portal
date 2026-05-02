// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         {/* <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         /> */}
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

// app/app/layout.tsx
// import React from "react";
// import "./globals.css";
// import Link from "next/link";

// export default function AppLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex bg-slate-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
//         <div className="px-6 py-4 text-xl font-bold border-b border-slate-800">
//           Digital Bank
//         </div>
//         <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
//           <Link
//             href="/app/dashboard"
//             className="block px-3 py-2 rounded-md hover:bg-slate-800"
//           >
//             داشبورد
//           </Link>
//           <Link
//             href="/mini-app/accounts"
//             className="block px-3 py-2 rounded-md hover:bg-slate-800"
//           >
//             حساب‌ها
//           </Link>
//           <Link
//             href="/app/transactions"
//             className="block px-3 py-2 rounded-md hover:bg-slate-800"
//           >
//             تراکنش‌ها
//           </Link>
//           <Link
//             href="/app/transfer"
//             className="block px-3 py-2 rounded-md hover:bg-slate-800"
//           >
//             انتقال وجه
//           </Link>
//           <Link
//             href="/app/cards"
//             className="block px-3 py-2 rounded-md hover:bg-slate-800"
//           >
//             کارت‌ها
//           </Link>
//           <Link
//             href="/app/profile"
//             className="block px-3 py-2 rounded-md hover:bg-slate-800"
//           >
//             پروفایل
//           </Link>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }

"use client";
import {
  ArrowRight,
  Shield,
  Zap,
  Clock,
  CreditCard,
  TrendingUp,
  Lock,
  ChevronRight,
} from "lucide-react";

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage({ onLogin }: LandingPageProps) {
  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Your money is protected with 256-bit encryption and multi-factor authentication.",
    },
    {
      icon: Zap,
      title: "Instant Transfers",
      description:
        "Send and receive money instantly between accounts with zero processing time.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round the clock to assist you.",
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description:
        "Track your spending patterns and get insights to help you save more.",
    },
    {
      icon: CreditCard,
      title: "Multiple Cards",
      description:
        "Manage all your credit and debit cards in one convenient place.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "We never sell your data. Your financial information stays private.",
    },
  ];

  const stats = [
    { value: "2M+", label: "Active Users" },
    { value: "$50B+", label: "Transactions" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
            <span className="text-xl font-semibold">BankPro</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#security"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Security
            </a>
            <a
              href="#contact"
              className="text-neutral-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLogin}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-600/30 rounded-full text-blue-400 text-sm mb-6">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Now available worldwide
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Banking Made
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  Simple & Secure
                </span>
              </h1>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                Experience the future of digital banking. Manage your finances,
                transfer money, and track spending all in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onLogin}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 text-lg"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border border-neutral-700 hover:border-neutral-600 rounded-lg transition-colors font-medium text-lg">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl" />
              <div className="relative bg-neutral-800 rounded-2xl p-8 border border-neutral-700 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-400">Total Balance</p>
                      <p className="text-3xl font-bold mt-1">$87,094.07</p>
                    </div>
                    <div className="p-3 bg-green-600/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                  </div>

                  <div className="h-px bg-neutral-700" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            Checking Account
                          </p>
                          <p className="text-xs text-neutral-400">****4532</p>
                        </div>
                      </div>
                      <p className="font-semibold">$12,453.82</p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Savings Account</p>
                          <p className="text-xs text-neutral-400">****7821</p>
                        </div>
                      </div>
                      <p className="font-semibold">$28,750.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-neutral-800 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-neutral-400">
              Powerful features to manage your finances with confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl hover:border-blue-600/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Join millions of users who trust BankPro for their financial needs.
          </p>
          <button
            onClick={onLogin}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 text-lg mx-auto"
          >
            Open Your Account
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
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
                <span className="text-xl font-semibold">BankPro</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Modern banking for the digital age.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-400">
              © 2026 BankPro. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
