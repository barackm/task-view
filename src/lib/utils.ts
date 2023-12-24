import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { randomBytes } from "crypto";

export const generateRandomHex = (length: number) =>
  randomBytes(length).toString("hex");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
