
"use client";

import styles from "@/components/organisms/BottomNav/BottomNav.module.css";
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
    <nav className={styles.Nav}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
