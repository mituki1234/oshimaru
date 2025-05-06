'use client';

import Sidebar from './Sidebar';
import styles from './layout.module.css';
import { useState, useEffect } from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ボディスクロールを制御（モバイルメニュー表示時にスクロールを無効化）
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={`${styles.layoutContainer} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
      <div className={styles.sidebarWrapper}>
        <Sidebar 
          isMobileMenuOpen={isMobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu} 
        />
      </div>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}