
"use client";

import { BudgetGauge } from "@/components/molecules/BudgetGauge";
import { ExpensePieChart } from "@/components/organisms/ExpensePieChart";
import { aggregateByCategory } from "@/lib/aggregate";
import { Category, Transaction } from "@/types";

// ---- ダミーデータ（動作確認用） ----
const dummyCategories: Category[] = [
  { id: "cat_food", userId: "local", name: "食費", type: "expense", color: "#639922" },
  { id: "cat_food_veg", userId: "local", name: "野菜", type: "expense", color: "#97C459", parentCategoryId: "cat_food" },
  { id: "cat_food_meat", userId: "local", name: "肉類", type: "expense", color: "#3B6D11", parentCategoryId: "cat_food" },
  { id: "cat_daily", userId: "local", name: "生活用品", type: "expense", color: "#378ADD" },
];

const dummyTransactions: Transaction[] = [
  { id: "t1", userId: "local", categoryId: "cat_food_veg", type: "expense", amount: 1200, date: "2026-08-01", createdAt: "2026-08-01T00:00:00Z" },
  { id: "t2", userId: "local", categoryId: "cat_food_meat", type: "expense", amount: 2500, date: "2026-08-05", createdAt: "2026-08-05T00:00:00Z" },
  { id: "t3", userId: "local", categoryId: "cat_daily", type: "expense", amount: 3000, date: "2026-08-10", createdAt: "2026-08-10T00:00:00Z" },
];

export default function HomePage() {
  const budgetAmount = 50000;
  const spentAmount = dummyTransactions.reduce((sum, t) => sum + t.amount, 0);

  // ホーム画面用：大分類でまとめる
  const pieData = aggregateByCategory(dummyTransactions, dummyCategories, {
    topLevelOnly: true,
  });

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
        {budgetAmount.toLocaleString()}円
      </h1>
      <BudgetGauge budgetAmount={budgetAmount} spentAmount={spentAmount} />

      <div style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>支出内訳</h2>
        <ExpensePieChart data={pieData} />
      </div>
    </main>
  );
}
