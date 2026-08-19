
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
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "12px",
          borderRadius: "6px",
          backgroundColor: "#e5e5e5",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: getColor(),
            transition: "width 0.3s ease, background-color 0.3s ease",
          }}
        />
      </div>
      <p style={{ fontSize: "12px", marginTop: "4px", color: "#666" }}>
        残り {remaining.toLocaleString()}円 / {budgetAmount.toLocaleString()}円
      </p>
    </div>
  );
}
