'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ClientPoster from './ClientPoster';
import Image from 'next/image';
import styles from '@/app/page.module.css';

interface Poster {
  id: string;
  title: string;
  created_at: string;
  image_url: string;
  genre?: string;
}

interface ClientSidePosterListProps {
  genre?: string;
}

export default function ClientSidePosterList({ genre }: ClientSidePosterListProps) {
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
        
        let query = supabase
          .from('poster')
          .select('*')
          .order('created_at', { ascending: false });
        
        // 特定のジャンルが指定されている場合はフィルタリング
        if (genre) {
          query = query.eq('genre', genre);
        }
        
        const { data: posters, error: fetchError } = await query;
          
        if (fetchError) throw fetchError;
        
        // ジャンルごとにポスターをグループ化
        const groupedPosters = (posters || []).reduce<Record<string, Poster[]>>((acc, poster) => {
          const posterGenre = poster.genre || 'その他';
          if (!acc[posterGenre]) {
            acc[posterGenre] = [];
          }
          acc[posterGenre].push(poster);
          return acc;
        }, {});
        
        setPostersByGenre(groupedPosters);
        
        // 実際に存在するジャンルだけを抽出して順序付ける
        const filteredGenres = genreOrder.filter(g =>
          groupedPosters[g] && groupedPosters[g].length > 0
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
  }, [genre]);

  if (loading) return <div className={styles.loading}>読み込み中...</div>;
  
  if (error) return <div className={styles.error}>{error}</div>;
  
  if (availableGenres.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyText}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '10px', fontSize: '1.5rem' }}></i>
          表示できるポスターがありません
        </div>
        <Image 
          src={"/undefined.png"} 
          width={80} 
          height={104} 
          alt="表示するポスターがありません" 
          style={{ opacity: 0.3, marginTop: '20px' }} 
        />
      </div>
    );
  }

  // 特定のジャンルが指定されている場合は、そのジャンルのみ表示
  if (genre) {
    const posterList = postersByGenre[genre] || [];
    
    if (posterList.length === 0) {
      return (
        <div className={styles.empty}>
          <div className={styles.emptyText}>
            <i className="fas fa-exclamation-circle" style={{ marginRight: '10px', fontSize: '1.5rem' }}></i>
            このジャンルのポスターはありません
          </div>
          <Image 
            src={"/undefined.png"} 
            width={80} 
            height={104} 
            alt="表示するポスターがありません" 
            style={{ opacity: 0.3, marginTop: '20px' }} 
          />
        </div>
      );
    }
    
    return (
      <div className={styles.grid}>
        {posterList.map(poster => (
          <ClientPoster key={poster.id} poster={poster} />
        ))}
      </div>
    );
  }

  // ジャンルが指定されていない場合は、すべてのジャンルを表示
  return (
    <div>
      {availableGenres.map(g => (
        <div key={g} className={styles.genreSection} id={g}>
          <h2 className={`${styles.title}`}>{g}</h2>
          <div className={styles.grid}>
            {postersByGenre[g].map(poster => (
              <ClientPoster key={poster.id} poster={poster} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}