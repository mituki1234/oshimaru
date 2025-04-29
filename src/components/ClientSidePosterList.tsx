'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ClientPoster from './ClientPoster';
import styles from '@/app/page.module.css';

interface Poster {
  id: string;
  title: string;
  created_at: string;
  image_url: string;
  genre?: string;
}

export default function ClientSidePosterList() {
  const [postersByGenre, setPostersByGenre] = useState<Record<string, Poster[]>>({});
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ジャンルの表示順
  const genreOrder = [
    'お買い物情報、キャンペーン',
    'イベント情報',
    '趣味、習い事',
    '求人情報',
    'その他'
  ];

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const supabase = createClientComponentClient();
        
        const { data: posters, error: fetchError } = await supabase
          .from('poster')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (fetchError) throw fetchError;
        
        // ジャンルごとにポスターをグループ化
        const groupedPosters = (posters || []).reduce<Record<string, Poster[]>>((acc, poster) => {
          const genre = poster.genre || 'その他';
          if (!acc[genre]) {
            acc[genre] = [];
          }
          acc[genre].push(poster);
          return acc;
        }, {});
        
        setPostersByGenre(groupedPosters);
        
        // 実際に存在するジャンルだけを抽出して順序付ける
        const filteredGenres = genreOrder.filter(genre =>
          groupedPosters[genre] && groupedPosters[genre].length > 0
        );
        
        setAvailableGenres(filteredGenres);
      } catch (e) {
        console.error('ポスターの取得中にエラーが発生しました', e);
        setError('データの読み込み中にエラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosters();
  }, []);

  if (loading) return <div className={styles.loading}>読み込み中...</div>;
  
  if (error) return <div className={styles.error}>{error}</div>;
  
  if (availableGenres.length === 0) return <div className={styles.empty}>表示できるポスターがありません</div>;

  return (
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
  );
}