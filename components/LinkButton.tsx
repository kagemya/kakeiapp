import Link from "next/link";
import styles from "./LinkButton.module.css";
 
interface LinkButtonProps {
  children: React.ReactNode;
  color?: string;
  link?: string;
}
 
export const LinkButton = ({
  children,
  color = "#0070f3",
  link = "#",
}: LinkButtonProps) => {
  return (
<Link className={styles.button} style={{ backgroundColor: color }} href={link}>
  <span className={styles.moji}>{children}</span>
</Link>
  );
};
