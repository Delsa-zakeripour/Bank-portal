import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

type AllTransactions = {
  id: string | number;
  name: string;
  amount: number;
  date: string;
  category:
    | "all"
    | "Income"
    | "Shopping"
    | "Food"
    | "Utilities"
    | "Health"
    | "Transportation"
    | "Entertainment"
    | "Education";
  account: string;
};

type TransactionResponse = {
  allTransactions: AllTransactions[];
};

function buildMockTransactions(): TransactionResponse {
  const allTransactions: AllTransactions[] = [
    {
      id: 1,
      name: "Amazon Purchase",
      amount: -127.4,
      date: "2026-04-30",
      category: "Shopping",
      account: "Checking",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 4500.0,
      date: "2026-04-29",
      category: "Income",
      account: "Checking",
    },
    {
      id: 3,
      name: "Electric Bill",
      amount: -89.32,
      date: "2026-04-28",
      category: "Utilities",
      account: "Checking",
    },
    {
      id: 4,
      name: "Coffee Shop",
      amount: -12.5,
      date: "2026-04-27",
      category: "Food",
      account: "Checking",
    },
    {
      id: 5,
      name: "Gym Membership",
      amount: -49.99,
      date: "2026-04-26",
      category: "Health",
      account: "Checking",
    },
    {
      id: 6,
      name: "Grocery Store",
      amount: -156.78,
      date: "2026-04-25",
      category: "Food",
      account: "Checking",
    },
    {
      id: 7,
      name: "Gas Station",
      amount: -45.2,
      date: "2026-04-24",
      category: "Transportation",
      account: "Checking",
    },
    {
      id: 8,
      name: "Netflix Subscription",
      amount: -15.99,
      date: "2026-04-23",
      category: "Entertainment",
      account: "Checking",
    },
    {
      id: 9,
      name: "Freelance Payment",
      amount: 850.0,
      date: "2026-04-22",
      category: "Income",
      account: "Checking",
    },
    {
      id: 10,
      name: "Restaurant",
      amount: -78.45,
      date: "2026-04-21",
      category: "Food",
      account: "Checking",
    },
    {
      id: 11,
      name: "Online Course",
      amount: -99.0,
      date: "2026-04-20",
      category: "Education",
      account: "Checking",
    },
    {
      id: 12,
      name: "Dividend Payment",
      amount: 125.5,
      date: "2026-04-19",
      category: "Income",
      account: "Investment",
    },
  ];

  return {
    allTransactions,
  };
}

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //   with api mock
  //   const transaction = buildMockTransactions();

  const allTransactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(
    { allTransactions },
    {
      headers: {
        // Avoid caching per-user data.
        "Cache-Control": "no-store",
      },
    },
  );
}
