import styles from "@/app/input/transaction/transaction.module.css";
import { TransactionForm } from "@/components/organisms/TransactionForm/TransactionForm";

export default function TransactionInputPage() {
  return (
    <div className={styles.form}>
      <h1 className={styles.guide}>支出・収入を記録</h1>
      <TransactionForm />
    </div>
  );
}
