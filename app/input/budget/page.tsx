import styles from "@/app/input/budget/budget.module.css";
import { BudgetForm } from "@/components/organisms/BudgetForm";

export default function BudgetInputPage() {
  return (
    <main className={styles.form}>
      <h1 className={styles.guide}>予算を設定</h1>
      <BudgetForm />
    </main>
  );
}