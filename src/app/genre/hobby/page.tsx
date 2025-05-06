import styles from "./page.module.css";
import ClientSidePosterList from '@/components/ClientSidePosterList';
import PageLayout from '@/components/Layout/PageLayout';

export default function HobbyPage() {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>趣味、習い事</h1>
        <div className={styles.content}>
          <ClientSidePosterList genre="趣味、習い事" />
        </div>
      </div>
    </PageLayout>
  );
}

export const dynamic = 'force-static';