'use client';

import { IoMdHome } from "react-icons/io";
import { FaShoppingBag, FaCalendarAlt, FaPaintBrush, FaBriefcase, FaEllipsisH } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import styles from "./layout.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/">
          <span className={styles.logoText}>おしまる</span>
        </Link>
      </div>
      <div className={styles.menu}>
        <div className={`${styles.menuItem} ${isActive('/genre/shopping') ? styles.active : ''}`}>
          <Link href="/genre/shopping">
            <FaShoppingBag className={styles.icon} />
            <span className={styles.menuText}>お買い物</span>
          </Link>
        </div>
        <div className={`${styles.menuItem} ${isActive('/genre/event') ? styles.active : ''}`}>
          <Link href="/genre/event">
            <FaCalendarAlt className={styles.icon} />
            <span className={styles.menuText}>イベント</span>
          </Link>
        </div>
        <div className={`${styles.menuItem} ${isActive('/genre/hobby') ? styles.active : ''}`}>
          <Link href="/genre/hobby">
            <FaPaintBrush className={styles.icon} />
            <span className={styles.menuText}>習い事</span>
          </Link>
        </div>
        <div className={`${styles.menuItem} ${isActive('/genre/job') ? styles.active : ''}`}>
          <Link href="/genre/job">
            <FaBriefcase className={styles.icon} />
            <span className={styles.menuText}>求人</span>
          </Link>
        </div>
        <div className={`${styles.menuItem} ${isActive('/genre/others') ? styles.active : ''}`}>
          <Link href="/genre/others">
            <FaEllipsisH className={styles.icon} />
            <span className={styles.menuText}>その他</span>
          </Link>
        </div>
        <div className={`${styles.menuItem} ${isActive('/') && pathname === '/' ? styles.active : ''}`}>
          <Link href="/" className={styles.homeLink}>
            <IoMdHome className={styles.icon} />
            <span className={styles.menuText}>ホーム</span>
          </Link>
        </div>
      </div>
    </div>
  );
}