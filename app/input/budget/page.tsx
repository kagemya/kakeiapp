import { BudgetForm } from "@/components/organisms/BudgetForm";

export default function BudgetInputPage() {
  return (
    <main style={{ padding: "16px" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "16px" }}>予算を設定</h1>
      <BudgetForm />
    </main>
  );
}