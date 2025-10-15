import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { config } from "@/components/config";

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


type GroupBy<TItem> = Record<string, Array<TItem>>;

export function groupBy<TItem, TKey extends keyof TItem>(
  array: Array<TItem>,
  key: TKey
): GroupBy<TItem> {
  return array.reduce((acc, item) => {
    const keyValue = String(item[key]);
    acc[keyValue] ??= [];
    acc[keyValue].push(item);
    return acc;
  }, {} as GroupBy<TItem>);
}


export function absoluteUrl(path: string) {
  return process.env.NODE_ENV === "development"
    ? `http://localhost:3000${path}`
    : `https://${config.appUrl}${path}`;
}
