
import { AppData, Category, Transaction, Budget, CalendarEvent } from "@/types";

const STORAGE_KEY = "kakeibo-app-data";

const initialData: AppData = {
  version: 1,
  categories: [],
  transactions: [],
  budgets: [],
  calendarEvents: [],
};

// ---- 基本の読み書き ----

export function getAppData(): AppData {
  if (typeof window === "undefined") return initialData;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialData;
  try {
    return JSON.parse(raw) as AppData;
  } catch {
    return initialData;
  }
}

export function saveAppData(data: AppData): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---- Category ----

export function getCategories(): Category[] {
  return getAppData().categories;
}

export function addCategory(category: Category): void {
  const data = getAppData();
  data.categories.push(category);
  saveAppData(data);
}

// ---- Transaction ----

export function getTransactions(): Transaction[] {
  return getAppData().transactions;
}

export function addTransaction(transaction: Transaction): void {
  const data = getAppData();
  data.transactions.push(transaction);
  saveAppData(data);
}

export function deleteTransaction(id: string): void {
  const data = getAppData();
  data.transactions = data.transactions.filter((t) => t.id !== id);
  saveAppData(data);
}

// ---- Budget ----

export function getBudgets(): Budget[] {
  return getAppData().budgets;
}

export function addBudget(budget: Budget): void {
  const data = getAppData();
  data.budgets.push(budget);
  saveAppData(data);
}

// ---- CalendarEvent ----

export function getCalendarEvents(): CalendarEvent[] {
  return getAppData().calendarEvents;
}

export function addCalendarEvent(event: CalendarEvent): void {
  const data = getAppData();
  data.calendarEvents.push(event);
  saveAppData(data);
}
