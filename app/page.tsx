
"use client";

import { useEffect, useState } from "react";
import { BudgetGauge } from "@/components/molecules/BudgetGauge/BudgetGauge";
import { ExpensePieChart } from "@/components/organisms/ExpensePieChart/ExpensePieChart";
import { aggregateByCategory } from "@/lib/aggregate";
import { getCategories, getTransactions, getBudgets } from "@/lib/storage";
import { Category, Transaction, Budget } from "@/types";

function getCurrentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    setCategories(getCategories());
    setTransactions(getTransactions());
    setBudgets(getBudgets());
  }, []);

  const currentYearMonth = getCurrentYearMonth();

  // 今月の全体予算を探す（categoryId未設定＝全体予算）
  const currentBudget = budgets.find(
    (b) => b.periodType === "monthly" && b.periodKey === currentYearMonth && !b.categoryId
  );
  const budgetAmount = currentBudget?.amount ?? 0;

  // 今月の支出だけを対象にする
  const currentMonthTransactions = transactions.filter(
    (t) => t.type === "expense" && t.date.startsWith(currentYearMonth)
  );
  const spentAmount = currentMonthTransactions.reduce((sum, t) => sum + t.amount, 0);

  const pieData = aggregateByCategory(currentMonthTransactions, categories);

  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
        {budgetAmount.toLocaleString()}円
      </h1>
      <BudgetGauge budgetAmount={budgetAmount} spentAmount={spentAmount} />

      <div style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>支出内訳</h2>
        {currentMonthTransactions.length === 0 ? (
          <p style={{ fontSize: "14px", color: "#666" }}>今月の支出データがありません</p>
        ) : (
          <ExpensePieChart data={pieData} />
        )}
      </div>
    </main>
  );
}
