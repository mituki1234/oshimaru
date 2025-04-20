import { IoMdHome } from "react-icons/io";
import Link from "next/link";
import styles from "./page.module.css";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import ClientPoster from '@/components/ClientPoster';

interface Poster {
  id: string;
  title: string;
  created_at: string;
  image_url: string;
  genre?: string;
}

// サーバーコンポーネントとしてメインページを作成
export default async function Home() {
  // サーバーサイドでSupabaseクライアントを作成
  const supabase = createServerComponentClient({ cookies });
  
  // サーバーサイドでデータを取得
  const { data: posters, error } = await supabase
    .from('poster')
    .select('*')
    .order('created_at', { ascending: false });
  
  // ジャンルごとにポスターをグループ化
  const postersByGenre = (posters || []).reduce<Record<string, Poster[]>>((acc, poster) => {
    const genre = poster.genre || 'その他';
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(poster);
    return acc;
  }, {});
  
  // ジャンルのリスト（表示順を調整）
  const genreOrder = [
    'お買い物情報、キャンペーン',
    'イベント情報',
    '趣味、習い事',
    '求人情報',
    'その他'
  ];
  
  // 実際に存在するジャンルだけを抽出して順序付ける
  const availableGenres = genreOrder.filter(genre => 
    postersByGenre[genre] && postersByGenre[genre].length > 0
  );

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Link href="#お買い物情報、キャンペーン">お買い物</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="#イベント">イベント</Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="#サークル">サークル</Link>
          </div>
          <div className={styles.menuItem}>
            <IoMdHome size={24} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {error ? (
          <div className={styles.error}>データ取得中にエラーが発生しました。</div>
        ) : posters && posters.length === 0 ? (
          <div className={styles.empty}>表示できるポスターがありません</div>
        ) : (
          <div>
            {availableGenres.map(genre => (
              <div key={genre} className={styles.genreSection} id={genre}>
                <h2 className={`${styles.title}`}>{genre}</h2>
                <div className={styles.grid}>
                  {postersByGenre[genre].map(poster => (
                    <ClientPoster key={poster.id} poster={poster} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}