
"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type PieChartData = {
  categoryId: string;
  categoryName: string;
  amount: number;
  color: string;
};

type ExpensePieChartProps = {
  data: PieChartData[];
};

export function ExpensePieChart({ data }: ExpensePieChartProps) {
  if (data.length === 0) {
    return <p style={{ fontSize: "14px", color: "#666" }}>まだ支出データがありません</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="categoryName"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={(entry: any) => `${entry.categoryName}`}
        >
          {data.map((entry) => (
            <Cell key={entry.categoryId} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => `${value.toLocaleString()}円`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
