import styles from "@/components/molecules/BudgetGauge/BudgetGauge.module.css";

type BudgetGaugeProps = {
  budgetAmount: number; // 予算金額
  spentAmount: number;   // 使った金額
};

export function BudgetGauge({ budgetAmount, spentAmount }: BudgetGaugeProps) {
  const remaining = budgetAmount - spentAmount;
  const remainingRatio = budgetAmount > 0 ? remaining / budgetAmount : 0;
  const percentage = Math.max(0, Math.min(100, remainingRatio * 100));

  const getColor = () => {
    if (remainingRatio <= 0.2) return "#e24b4a"; // 赤
    if (remainingRatio <= 0.5) return "#ef9f27"; // 黄（amber）
    return "#639922"; // 緑
  };

  return (
    <div className={styles.frames}>
      <div className={styles.track}>
        <div className={styles.bar}
          style={{
            "--percentage": `${percentage}%`,
            "--bar-color": getColor(),
          } as React.CSSProperties}
        />
      </div>
      <p className={styles.font}>
        残り {remaining.toLocaleString()}円 / {budgetAmount.toLocaleString()}円
      </p>
    </div>
  );
}
