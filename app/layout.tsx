
import { BottomNav } from "@/components/organisms/BottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div style={{ flex: 1, paddingBottom: "60px" }}>{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
