import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import voucher_codes from "voucher-code-generator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formattedAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(Math.abs(amount));

export function generatePremiumCode() {
  const codes = voucher_codes.generate({
    count: 1, // عدد الأكواد اللي عايز تولدها
    length: 12, // طول الجزء اللي بعد البادئة
    prefix: "PREM-", // بادئة بتوضح إن الكود خاص بـ Premium
    charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", // حروف كبيرة + أرقام
    pattern: "####-####-####", // يخلي شكل الكود منسق أكتر (مثلاً ABCD-EFGH)
  });

  return codes[0];
}
