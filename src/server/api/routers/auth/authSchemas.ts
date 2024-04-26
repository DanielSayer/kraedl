import { z } from "zod";

export const userAuthSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name must be less that 256 characters"),
    email: z
      .string()
      .email()
      .max(255, "Email must be less that 256 characters"),
    password: z
      .string()
      .min(8, "Must be at least 8 characters in length")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Must contain at least one special character",
      )
      .max(255, "Password must be less that 256 characters"),
    confirmPassword: z.string(),
    businessId: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    },
  );

export type AdminRequest = z.infer<typeof userAuthSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginRequest = z.infer<typeof loginSchema>;
