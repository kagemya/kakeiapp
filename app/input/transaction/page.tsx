
import { TransactionForm } from "@/components/organisms/TransactionForm";

export default function TransactionInputPage() {
  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "16px" }}>支出・収入を記録</h1>
      <TransactionForm />
    </main>
  );
}
