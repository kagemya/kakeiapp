import styles from "@/app/input/input.module.css";
import Link from "next/link";

export default function InputMenuPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.guide}>
        入力メニュー
      </h1>

      <Link href="/input/transaction" className={styles.transaction}>
        支出・収入を記録する
      </Link>

      <Link href="/input/budget" className={styles.budget}>
        予算を設定する
      </Link>
    </main>
  );
}
