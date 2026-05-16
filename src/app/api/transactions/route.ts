import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
