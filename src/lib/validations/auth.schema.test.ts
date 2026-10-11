import { describe, it, expect } from "vitest";
import { loginSchema, registerSchema } from "./auth.schema";

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "12345678",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "12345678",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "1234567",
    });

    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const validInput = {
    name: "Delsa",
    email: "user@example.com",
    password: "12345678",
    confirmPassword: "12345678",
  };

  it("accepts valid registration data", () => {
    expect(registerSchema.safeParse(validInput).success).toBe(true);
  });

  it("rejects mismatched passwords on the confirmPassword field", () => {
    const result = registerSchema.safeParse({
      ...validInput,
      confirmPassword: "different123",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["confirmPassword"]);
  });
});
