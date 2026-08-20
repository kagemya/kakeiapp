
"use client";

import styles from "@/components/organisms/BudgetForm/BudgetForm.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertBudget } from "@/lib/storage";
import { Budget } from "@/types";

function getCurrentYearMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function BudgetForm() {
  const router = useRouter();
  const [yearMonth, setYearMonth] = useState(getCurrentYearMonth());
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountNumber = Number(amount);
    if (!amount || isNaN(amountNumber) || amountNumber <= 0) {
      setError("正しい金額を入力してください");
      return;
    }

    const newBudget: Budget = {
      id: crypto.randomUUID(),
      userId: "local",
      periodType: "monthly",
      periodKey: yearMonth,
      amount: amountNumber,
    };

    upsertBudget(newBudget);
    router.push("/"); // ホーム画面に戻る
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label className={styles.label}>
          対象月
        </label>
        <input
          type="month"
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          className={styles.input}
        />
      </div>

      <div>
        <label className={styles.label}>
          予算金額
        </label>
        <input
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="例: 50000"
          className={styles.input}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button
        type="submit"
        className={styles.submit}
      >
        保存する
      </button>
    </form>
  );
}
