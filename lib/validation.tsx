import z from "zod";

export const SignUpValidationSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "At least 3 chars" })
      .max(30, { message: "Max 30 chars" }),

    email: z.email({ message: "Invalid email" }),

    password: z
      .string()
      .min(8, { message: "At least 8 chars" })
      .max(50, { message: "Max 50 chars" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export const SigninValidationSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "At least 8 chars" })
    .max(50, { message: "Max 50 chars" }),
});
