
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
  options: { topLevelOnly: boolean }
): AggregatedItem[] {
  const { topLevelOnly } = options;

  // カテゴリIDから「集計に使うカテゴリ」を引けるようにする
  // topLevelOnly=true の場合、小分類は親（大分類）に読み替える
  const resolveCategory = (categoryId: string): Category | undefined => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return undefined;
    if (topLevelOnly && category.parentCategoryId) {
      return categories.find((c) => c.id === category.parentCategoryId);
    }
    return category;
  };

  const totals = new Map<string, number>();

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue; // 支出のみ集計
    const category = resolveCategory(transaction.categoryId);
    if (!category) continue;
    const current = totals.get(category.id) ?? 0;
    totals.set(category.id, current + transaction.amount);
  }

  return Array.from(totals.entries())
    .map(([categoryId, amount]) => {
      const category = categories.find((c) => c.id === categoryId)!;
      return {
        categoryId,
        categoryName: category.name,
        amount,
        color: category.color,
      };
    })
    .sort((a, b) => b.amount - a.amount); // 金額が大きい順
}
