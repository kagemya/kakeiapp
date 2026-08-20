
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

const defaultCategories: Category[] = [
  // ---- 支出：大分類 ----
  { id: "cat_food",     userId: "local", name: "食費",     type: "expense", color: "#639922" },
  { id: "cat_daily",    userId: "local", name: "生活用品", type: "expense", color: "#378ADD" },
  { id: "cat_transport",userId: "local", name: "交通費",   type: "expense", color: "#7F77DD" },
  { id: "cat_leisure",  userId: "local", name: "娯楽費",   type: "expense", color: "#D4537E" },
  { id: "cat_housing",  userId: "local", name: "住居費",   type: "expense", color: "#5F5E5A" },
  { id: "cat_medical",  userId: "local", name: "医療費",   type: "expense", color: "#D85A30" },
  { id: "cat_other_exp",userId: "local", name: "その他",   type: "expense", color: "#888780" },
  // ---- 収入 ----
  { id: "cat_salary",   userId: "local", name: "給与",     type: "income", color: "#0F6E56" },
  { id: "cat_other_inc",userId: "local", name: "その他収入", type: "income", color: "#5DCAA5" },
];

export function getCategories(): Category[] {
  const data = getAppData();
  if (data.categories.length === 0) {
    data.categories = defaultCategories;
    saveAppData(data);
    return defaultCategories;
  }
  return data.categories;
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

export function upsertBudget(budget: Budget): void {
  const data = getAppData();
  const existingIndex = data.budgets.findIndex(
    (b) =>
      b.periodType === budget.periodType &&
      b.periodKey === budget.periodKey &&
      b.categoryId === budget.categoryId // 全体予算同士は categoryId が両方 undefined で一致する
  );

  if (existingIndex !== -1) {
    data.budgets[existingIndex] = budget; // 既存を上書き
  } else {
    data.budgets.push(budget); // 新規追加
  }

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

