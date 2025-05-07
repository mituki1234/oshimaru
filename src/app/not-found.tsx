import Link from 'next/link';
import Image from 'next/image';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>ページが見つかりません</h2>
      <div className={styles.imageContainer}>
        <Image
          src="/undefined.png"
          alt="Page not found"
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <p className={styles.text}>お探しのページは存在しないか、移動された可能性があります。</p>
      <Link href="/" className={styles.link}>
        ホームに戻る
      </Link>
    </div>
  );
}