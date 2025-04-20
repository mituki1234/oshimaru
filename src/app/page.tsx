// クライアントコンポーネント
"use client";
import { IoMdHome } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from "./page.module.css";

// クライアントサイドのみで実行するためのクライアントコンポーネントを作成
export default function Home() {
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
        <ClientPosterList />
      </div>
    </div>
  );
}

interface Poster {
  id: string;
  title: string;
  created_at: string;
  image_url: string;
  genre?: string;
  // add other properties if needed
}

function ClientPosterList() {
  // ポスターとローディング状態の管理
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const supabase = createClientComponentClient();
  
  // コンポーネントマウント時にデータを取得
  useEffect(() => {
    async function fetchPosters() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('poster')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setPosters(data || []);
      } catch (err) {
        console.error('ポスターの取得エラー:', err);
        setError('データ取得中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosters();
  }, [supabase]);
  
  // ジャンルごとにポスターをグループ化
  const postersByGenre = posters.reduce<Record<string, Poster[]>>((acc, poster) => {
    const genre = poster.genre || 'その他';
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(poster);
    return acc;
  }, {});
  
  // ジャンルのリスト（表示順を調整したい場合）
  const genreOrder = [
    'お買い物情報、キャンペーン',
    'イベント情報',
    '趣味、習い事',
    '求人情報',
    'その他'
  ];
  
  // 実際に存在するジャンルだけを抽出して順序付ける
  const availableGenres = genreOrder.filter(genre => postersByGenre[genre] && postersByGenre[genre].length > 0);
  
  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }
  
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  
  if (posters.length === 0) {
    return <div className={styles.empty}>表示できるポスターがありません</div>;
  }
  
  return (
    <div>
      {availableGenres.map(genre => (
        <div key={genre} className={styles.genreSection} id={genre}>
          <h2 className={`${styles.title}`}>{genre}</h2>
          <div className={styles.grid}>
            {postersByGenre[genre].map(poster => (
              <div key={poster.id} className={styles.card}>
                <h3>{poster.title}</h3>
                <span>{new Date(poster.created_at).toLocaleDateString('ja-JP')}</span>
                <img src={poster.image_url} alt={poster.title} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}