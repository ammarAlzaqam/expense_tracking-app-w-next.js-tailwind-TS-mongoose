import z from "zod";

//! Auth Validation Schemas
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
  password: z.string(),
});

//! Edit Profile Validation Schemas
export const EditDataValidationSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.email(),
});

export const EditImageValidationSchema = z.object({
  image: z.url(),
});

export const EditPasswordValidationSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "At least 8 chars" })
    .max(50, { message: "Max 50 chars" }),
});

//! Transactions Validation Schemas
export const createTransactionValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z
    .string()
    .refine((val) => val !== "0" && val !== "", {
      message: "Amount mustn't be equal 0",
    }),
  category: z.string().optional(),
  startDate: z.date({ message: "Start date is required" }),
});

export const createCategoryValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "At least 3 chars" })
    .max(30, { message: "Max 30 chars" }),
  slug: z
    .string()
    .min(3, { message: "At least 3 chars" })
    .max(100, { message: "Max 100 chars" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens",
    }),
});

export const updateTransactionValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  amount: z
    .string()
    .refine((val) => val !== "0" && val !== "", { message: "Amount mustn't be equal 0" }),
  category: z.string().optional(),
  startDate: z.date({ message: "Start date is required" }),
});
