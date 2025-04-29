import { IoMdHome } from "react-icons/io";
import Link from "next/link";
import styles from "./page.module.css";
import ClientSidePosterList from '@/components/ClientSidePosterList';

// サーバーコンポーネントをクライアントコンポーネントに変更
export default function Home() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Link href="/#お買い物情報、キャンペーン">お買い物</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="/#イベント情報">イベント</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="/#趣味、習い事">サークル</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="/#求人情報">求人</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="/top" className={styles.homeLink}>
              <IoMdHome size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {/* クライアントサイドでSupabaseの処理を行うコンポーネント */}
        <ClientSidePosterList />
      </div>
    </div>
    </>
  );
}

// 静的エクスポートを有効にするための設定
export const dynamic = 'force-static';