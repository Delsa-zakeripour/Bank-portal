import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.createMany({
    data: [
      {
        name: "Amazon Purchase",
        amount: -127.45,
        date: new Date("2026-04-30"),
        category: "Shopping",
        account: "Checking",
      },
      {
        name: "Salary Deposit",
        amount: 4500,
        date: new Date("2026-04-29"),
        category: "Income",
        account: "Checking",
      },
      {
        name: "Gym Membership",
        amount: -49.99,
        date: new Date("2026-04-26"),
        category: "Health",
        account: "Checking",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
