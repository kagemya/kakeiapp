
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addTransaction, getCategories } from "@/lib/storage";
import { Transaction } from "@/types";

function getToday(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function TransactionForm() {
  const router = useRouter();
  const categories = getCategories(); // localStorageに保存済みのカテゴリ一覧

  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState(getToday());
  const [productName, setProductName] = useState("");
  const [memo, setMemo] = useState("");
  const [error, setError] = useState("");

  // 選択中のtype（支出/収入）に合うカテゴリだけを候補にする
  const filteredCategories = categories.filter((c) => c.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountNumber = Number(amount);
    if (!amount || isNaN(amountNumber) || amountNumber <= 0) {
      setError("正しい金額を入力してください");
      return;
    }
    if (!categoryId) {
      setError("カテゴリを選択してください");
      return;
    }

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      userId: "local",
      type,
      amount: amountNumber,
      categoryId,
      date,
      productName: productName || undefined,
      memo: memo || undefined,
      createdAt: new Date().toISOString(),
    };

    addTransaction(newTransaction);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>種別</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => { setType("expense"); setCategoryId(""); }}
            style={{
              flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc",
              backgroundColor: type === "expense" ? "#e24b4a" : "white",
              color: type === "expense" ? "white" : "#333",
            }}
          >
            支出
          </button>
          <button
            type="button"
            onClick={() => { setType("income"); setCategoryId(""); }}
            style={{
              flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc",
              backgroundColor: type === "income" ? "#378ADD" : "white",
              color: type === "income" ? "white" : "#333",
            }}
          >
            収入
          </button>
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>金額</label>
        <input
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="例: 1200"
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>カテゴリ</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        >
          <option value="">選択してください</option>
          {filteredCategories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>日付</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>商品名（任意）</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="例: にんじん"
          style={{ width: "100%", padding: "8px", fontSize: "16px" }}
        />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", marginBottom: "4px" }}>メモ（任意）</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          style={{ width: "100%", padding: "8px", fontSize: "16px", minHeight: "60px" }}
        />
      </div>

      {error && <p style={{ color: "#e24b4a", fontSize: "13px" }}>{error}</p>}

      <button
        type="submit"
        style={{
          padding: "12px", fontSize: "16px", backgroundColor: "#333",
          color: "white", border: "none", borderRadius: "8px",
        }}
      >
        保存する
      </button>
    </form>
  );
}
