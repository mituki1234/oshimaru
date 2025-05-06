'use client';

import Sidebar from './Sidebar';
import styles from './layout.module.css';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={styles.layoutContainer}>
      <button 
        className={styles.mobileMenuButton} 
        onClick={toggleMobileMenu}
        aria-label="メニューを開く"
      >
        <FaBars />
      </button>
      
      <div className={`${styles.sidebarWrapper} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <Sidebar />
      </div>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}