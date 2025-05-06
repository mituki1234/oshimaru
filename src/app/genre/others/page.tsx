import styles from "./page.module.css";
import ClientSidePosterList from '@/components/ClientSidePosterList';
import PageLayout from '@/components/Layout/PageLayout';
import Image from 'next/image';

export default function OthersPage() {
  return (
    <PageLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <Image 
            src="/howto.jpg" 
            alt="その他" 
            width={500}
            height={700}
            priority
          />
        </div>
      </div>
    </PageLayout>
  );
}

export const dynamic = 'force-static';