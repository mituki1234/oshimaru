'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoMdHome } from 'react-icons/io';
import PageLayout from '@/components/Layout/PageLayout';
import styles from './page.module.css';

export default function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className={styles.navigation}>
            <PageLayout>
                <div className={styles.container}>
                    <h1 className={styles.heading}>掲載方法</h1>
                    <div className={`${styles.img} ${styles.one}`}>
                    </div>
                    <div className={`${styles.img} ${styles.two}`}>
                    </div>
                </div>
            </PageLayout>
        </div>
    );
}