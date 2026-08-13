import Image from "next/image";

import { LinkButton } from "../components/LinkButton";
 
export default function Home() {
  return (
    <main>
      <h1>トップページ</h1>
        <LinkButton link="/about" color="#ff5722">
          アバウトページへ進む
        </LinkButton>
    </main>
  );
}
