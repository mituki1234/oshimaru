'use client';

import { IoMdHome } from "react-icons/io";
import { FaShoppingBag, FaCalendarAlt, FaPaintBrush, FaBriefcase, FaEllipsisH, FaBars, FaTimes } from "react-icons/fa";
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
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="メニューを開く"
        >
          <FaBars />
        </button>
        <div className={styles.mobileLogoContainer}>
          <Link href="/" className={styles.mobileLogoLink}>
            <div className={styles.mobileLogo}>おしまる</div>
          </Link>
        </div>
        {/* モバイルナビゲーション - ヘッダーとして機能 */}
        <div className={styles.mobileNav}>
          <Link href="/genre/shopping" className={isActive('/genre/shopping') ? styles.activeMobileNav : ''}>
            <FaShoppingBag className={styles.mobileNavIcon} />
          </Link>
          <Link href="/genre/event" className={isActive('/genre/event') ? styles.activeMobileNav : ''}>
            <FaCalendarAlt className={styles.mobileNavIcon} />
          </Link>
          <Link href="/genre/hobby" className={isActive('/genre/hobby') ? styles.activeMobileNav : ''}>
            <FaPaintBrush className={styles.mobileNavIcon} />
          </Link>
          <Link href="/genre/job" className={isActive('/genre/job') ? styles.activeMobileNav : ''}>
            <FaBriefcase className={styles.mobileNavIcon} />
          </Link>
          <Link href="/" className={isActive('/') && pathname === '/' ? styles.activeMobileNav : ''}>
            <IoMdHome className={styles.mobileNavIcon} />
          </Link>
        </div>
      </div>
      
      {/* オーバーレイ - モバイルメニューを開いたときに表示 */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={toggleMobileMenu} />
      )}
      
      {/* サイドバー */}
      <div className={styles.sidebar}>
        <button 
          className={styles.closeMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="メニューを閉じる"
        >
          <FaTimes />
        </button>
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
              <span className={styles.menuText}>掲載方法</span>
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
    </>
  );
}