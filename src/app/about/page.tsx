import Link from 'next/link';
import styles from './page.module.css';
import { IoMdHome } from 'react-icons/io';
import ClientSidePosterList from '@/components/ClientSidePosterList';

export default function About() {
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
                            <Link href="/#趣味、習い事">習い事</Link>
                        </div>
                        <div className={styles.menuItem}>
                            <Link href="/#求人情報">求人</Link>
                        </div>
                        <div className={styles.menuItem}>
                            <Link href="/about">掲載方法</Link>
                        </div>
                        <div className={styles.menuItem}>
                            <Link href="/top" className={styles.homeLink}>
                                <IoMdHome size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                </div>
            </div>
        </>
    )
}