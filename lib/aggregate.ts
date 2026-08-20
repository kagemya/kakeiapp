
import { Transaction, Category } from "@/types";

export type AggregatedItem = {
  categoryId: string;
  categoryName: string;
  amount: number;
  color: string;
};

/**
 * 取引データをカテゴリごとに集計する
 * @param transactions 集計対象の取引データ
 * @param categories カテゴリマスタ
 * @param options.topLevelOnly true: 大分類単位で集計（小分類の金額は親に合算）
 *                              false: 渡された categories の単位のまま集計
 */
export function aggregateByCategory(
  transactions: Transaction[],
  categories: Category[],
): AggregatedItem[] {
  const totals = new Map<string, number>();

  // カテゴリIDから「集計に使うカテゴリ」を引けるようにする

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue; // 支出のみ集計
    const current = totals.get(transaction.categoryId) ?? 0;
    totals.set(transaction.categoryId, current + transaction.amount);
  }

  return Array.from(totals.entries())
    .map(([categoryId, amount]) => {
      const category = categories.find((c) => c.id === categoryId)!;
      return {
        categoryId,
        categoryName: category?.name ?? "不明",
        amount,
        color: category?.color ?? "#ccc",
      };
    })
    .sort((a, b) => b.amount - a.amount); // 金額が大きい順
}
