
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/history", label: "統計" },
  { href: "/input", label: "入力" },
  { href: "/calendar", label: "カレンダー" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "sticky",
        bottom: 0,
        display: "flex",
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "white",
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "12px 0",
              fontSize: "13px",
              textDecoration: "none",
              color: isActive ? "#378ADD" : "#666",
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
