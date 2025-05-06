'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdHome } from 'react-icons/io';
import styles from './navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.navigation}>
      <Link 
        href="/genre/shopping" 
        className={`${styles.navLink} ${isActive('/genre/shopping') ? styles.active : ''}`}
      >
        お買い物
      </Link>
      <Link 
        href="/genre/event" 
        className={`${styles.navLink} ${isActive('/genre/event') ? styles.active : ''}`}
      >
        イベント
      </Link>
      <Link 
        href="/genre/hobby" 
        className={`${styles.navLink} ${isActive('/genre/hobby') ? styles.active : ''}`}
      >
        習い事
      </Link>
      <Link 
        href="/genre/job" 
        className={`${styles.navLink} ${isActive('/genre/job') ? styles.active : ''}`}
      >
        求人
      </Link>
      <Link 
        href="/genre/others" 
        className={`${styles.navLink} ${isActive('/genre/others') ? styles.active : ''}`}
      >
        その他
      </Link>
      <Link href="/" className={styles.homeLink}>
        <IoMdHome size={24} />
      </Link>
    </div>
  );
}