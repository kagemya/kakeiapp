
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addBudget } from "@/lib/storage";
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

    addBudget(newBudget);
    router.push("/"); // ホーム画面に戻る
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>
          対象月
        </label>
        <input
          type="month"
          value={yearMonth}
          onChange={(e) => setYearMonth(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>
          予算金額
        </label>
        <input
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="例: 50000"
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>

      {error && <p style={{ color: "#e24b4a", fontSize: "13px" }}>{error}</p>}

      <button
        type="submit"
        style={{
          padding: "12px",
          fontSize: "16px",
          backgroundColor: "#639922",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        保存する
      </button>
    </form>
  );
}
