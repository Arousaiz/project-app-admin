import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNullOrUndefined(obj: any) {
  return obj === null || obj === undefined;
}

export function errorMessage(error: string | string[]) {
  return { message: error.toString() };
}
