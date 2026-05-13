"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerSchema } from "@/lib/validations/auth.schema";
import { useLocale } from "next-intl";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const locale = useLocale()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const validationResult = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      setError(validationResult.error.issues[0]?.message ?? "Invalid input.");
      return;
    }

    setIsSubmitting(true);

    const registerRes = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: validationResult.data.name,
        email: validationResult.data.email,
        password: validationResult.data.password,
      }),
    });

    const registerData = await registerRes.json();

    if (!registerRes.ok) {
      setError(registerData?.error ?? "Failed to create account.");
      setIsSubmitting(false);
      return;
    }

    const loginResult = await signIn("credentials", {
      email: validationResult.data.email,
      password: validationResult.data.password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (loginResult?.error) {
      setError("Account created, but auto login failed. Please sign in.");
      router.push("/auth/login");
      return;
    }

    router.push(`${locale}/mini-app/dashboard`);
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold text-neutral-900">
          Create account
        </h1>
        <p className="mb-8 text-neutral-600">
          Join BankPro and start managing your money.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500"
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-neutral-700"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 outline-none transition-colors focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter password"
              minLength={8}
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-800"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  );
}
