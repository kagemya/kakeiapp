
export interface Category {
    id: string;
    userId: string;
    name: string;
    type: "expense" | "income";
    color: string;
    icon?: string;
    sortOrder?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  type: "expense" | "income";
  amount: number; // 円、整数
  date: string; // "2026-08-19" (ISO 8601)
  productName?: string;
  memo?: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  categoryId?: string; // undefinedなら全体予算
  periodType: "monthly" | "weekly" | "yearly";
  periodKey: string; // 例: "2026-08"
  amount: number;
}

export interface CalendarEvent {
  id: string;
  userId: string;
  categoryId?: string;
  date: string;
  title: string;
  plannedAmount?: number;
  linkedTransactionId?: string;
  createdAt: string;
}

export interface AppData {
  version: 1;
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
  calendarEvents: CalendarEvent[];
}
