
import Link from "next/link";

export default function InputMenuPage() {
  return (
    <main style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <h1 style={{ fontSize: "20px" }}>入力メニュー</h1>

      <Link
        href="/input/transaction"
        style={{
          display: "block",
          padding: "16px",
          textAlign: "center",
          backgroundColor: "#378ADD",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "16px",
        }}
      >
        支出・収入を記録する
      </Link>

      <Link
        href="/input/budget"
        style={{
          display: "block",
          padding: "16px",
          textAlign: "center",
          backgroundColor: "#639922",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "16px",
        }}
      >
        予算を設定する
      </Link>
    </main>
  );
}
