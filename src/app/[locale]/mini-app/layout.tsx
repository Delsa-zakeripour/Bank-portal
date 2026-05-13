import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import MiniAppShell from "./MiniAppShell";

type MiniAppProps = {
  children: ReactNode;
};

export default async function MiniAppLayout({ children }: MiniAppProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login?callbackUrl=/mini-app/dashboard");
  }

  return <MiniAppShell>{children}</MiniAppShell>;
}
