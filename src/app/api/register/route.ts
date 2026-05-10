import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { registerApiSchema } from "@/lib/validations/auth.schema";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerApiSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request payload." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.trim().toLowerCase();
  const name = parsed.data.name?.trim();
  const password = parsed.data.password;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return Response.json({ error: "Email already in use." }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return Response.json(user, { status: 201 });
}