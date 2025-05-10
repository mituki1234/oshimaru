'use client';

import { IoMdHome } from "react-icons/io";
import { FaShoppingBag, FaCalendarAlt, FaPaintBrush, FaBriefcase, FaEllipsisH, FaNewspaper } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import styles from "./layout.module.css";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function Sidebar({ isMobileMenuOpen, toggleMobileMenu }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* モバイルヘッダー - 常に表示 */}
      <div className={styles.mobileHeader}>
        <div className={styles.mobileLogoContainer}>
          <Link href="/" className={styles.mobileLogoLink}>
            <div className={styles.mobileLogo}>おしまる</div>
          </Link>
        </div>
      </div>

      {/* モバイル固定フッターナビゲーション - 常に表示 */}
      <div className={styles.mobileNavBar}>
        <Link href="/genre/shopping" className={`${styles.mobileNavItem} ${isActive('/genre/shopping') ? styles.activeMobileNav : ''}`}>
          <FaShoppingBag className={styles.mobileNavIcon} />
          <span className={styles.mobileNavText}>お買い物</span>
        </Link>
        <Link href="/genre/event" className={`${styles.mobileNavItem} ${isActive('/genre/event') ? styles.activeMobileNav : ''}`}>
          <FaCalendarAlt className={styles.mobileNavIcon} />
          <span className={styles.mobileNavText}>イベント</span>
        </Link>
        <Link href="/genre/hobby" className={`${styles.mobileNavItem} ${isActive('/genre/hobby') ? styles.activeMobileNav : ''}`} >
          <FaPaintBrush className={styles.mobileNavIcon} />
          <span className={styles.mobileNavText}>習い事</span>
        </Link>
        <Link href="/genre/job" className={`${styles.mobileNavItem} ${isActive('/genre/job') ? styles.activeMobileNav : ''}`}>
          <FaBriefcase className={styles.mobileNavIcon} />
          <span className={styles.mobileNavText}>求人</span>
        </Link>
        <Link href="/how-to-post" className={`${styles.mobileNavItem} ${isActive('/how-to-post') ? styles.activeMobileNav : ''}`}>
          <FaNewspaper className={styles.mobileNavIcon} />
          <span className={styles.mobileNavText}>掲載方法</span>
        </Link>
      </div>

      {/* デスクトップ用サイドバー - モバイルでは非表示 */}
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
          <div className={`${styles.menuItem} ${isActive('/keisai') ? styles.active : ''}`}>
            <Link href="/how-to-post" className={styles.homeLink}>
              <FaNewspaper className={styles.icon} />
              <span className={styles.menuText}>掲載方法</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}