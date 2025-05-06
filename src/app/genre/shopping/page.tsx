import styles from "./page.module.css";
import ClientSidePosterList from '@/components/ClientSidePosterList';
import PageLayout from '@/components/Layout/PageLayout';

export default function ShoppingPage() {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>お買い物情報、キャンペーン</h1>
        <div className={styles.content}>
          <ClientSidePosterList genre="お買い物情報、キャンペーン" />
        </div>
      </div>
    </PageLayout>
  );
}

export const dynamic = 'force-static';