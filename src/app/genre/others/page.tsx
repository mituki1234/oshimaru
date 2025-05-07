import styles from "./page.module.css";
import ClientSidePosterList from '@/components/ClientSidePosterList';
import PageLayout from '@/components/Layout/PageLayout';

export default function JobPage() {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>その他</h1>
        <div className={styles.content}>
          <ClientSidePosterList genre="その他" />
        </div>
      </div>
    </PageLayout>
  );
}

export const dynamic = 'force-static';