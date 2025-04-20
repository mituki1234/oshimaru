"use client";

import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import Image from 'next/image';

export default function DashboardPage() {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentPosterId, setCurrentPosterId] = useState<number | null>(null);
  
  interface Poster {
    id: number;
    title: string;
    genre: string;
    image_url: string;
    created_at?: string;
  }
  
  const [session, setSession] = useState<Session | null>(null);
  const [posters, setPosters] = useState<Poster[]>([]);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // 利用可能なジャンルのリスト
  const genres = [
    'お買い物情報、キャンペーン',
    'イベント情報',
    '趣味、習い事',
    '求人情報'
  ];

  // セッションを確認
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        fetchPosters();
      } else {
        router.push('/admin/login');
      }
    }
    
    checkSession();
  }, [router, supabase]);

  // ポスターのデータを取得
  const fetchPosters = async () => {
    const { data, error } = await supabase
      .from('poster')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('ポスターの取得エラー:', error);
      return;
    }
    
    setPosters(data || []);
  };

  // 画像プレビュー処理
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 編集モードに切り替え
  const handleEditClick = (poster: Poster) => {
    setEditMode(true);
    setCurrentPosterId(poster.id);
    setTitle(poster.title);
    setGenre(poster.genre);
    setImagePreview(poster.image_url);
    setImage(null); // 新しい画像がアップロードされない限り元の画像を使用
    
    // スクロールしてフォームを表示
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 編集モードをキャンセル
  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentPosterId(null);
    setTitle('');
    setGenre('');
    setImagePreview('');
    setImage(null);
  };

  // ポスター削除処理
  const handleDelete = async (posterId: number) => {
    if (!window.confirm('このポスターを削除してもよろしいですか？')) return;
    
    setLoading(true);
    
    try {
      // ポスターレコードの取得
      const { data: posterData, error: fetchError } = await supabase
        .from('poster')
        .select('image_url')
        .eq('id', posterId)
        .single();
        
      if (fetchError) throw fetchError;
      
      // 画像ファイル名を抽出（URLからファイルパスを取得）
      const imageUrl = posterData.image_url;
      const filePath = imageUrl.split('/').pop();
      if (filePath && filePath.startsWith('posters/')) {
        // 画像ファイルを削除
        const { error: storageError } = await supabase.storage
          .from('images')
          .remove([filePath]);
          
        if (storageError) console.error('画像削除エラー:', storageError);
      }
      
      // データベースレコードを削除
      const { error: deleteError } = await supabase
        .from('poster')
        .delete()
        .eq('id', posterId);
        
      if (deleteError) throw deleteError;
      
      // 成功メッセージを表示して一覧を更新
      setSuccess('ポスターが削除されました');
      fetchPosters();
      
    } catch (err: any) {
      setError(err.message || 'ポスター削除中にエラーが発生しました');
      console.error('削除エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  // アップロード処理（新規作成または更新）
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    }
    
    if (!genre) {
      setError('ジャンルを選択してください');
      return;
    }
    
    if (!image && !editMode) {
      setError('画像を選択してください');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      let publicUrl = '';
      
      // 画像がある場合のみアップロード（編集時に画像を変更しない場合はスキップ）
      if (image) {
        // 1. 画像をストレージにアップロード
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `posters/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, image);
          
        if (uploadError) throw uploadError;
        
        // 2. 画像のURLを取得
        const { data: { publicUrl: newUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
          
        publicUrl = newUrl;
      }
      
      if (editMode && currentPosterId) {
        // 更新処理
        let updateData: {title: string, genre: string, image_url?: string} = {
          title,
          genre
        };
        
        // 画像を変更した場合のみURLを更新
        if (publicUrl) {
          updateData.image_url = publicUrl;
        }
        
        const { error: updateError } = await supabase
          .from('poster')
          .update(updateData)
          .eq('id', currentPosterId);
          
        if (updateError) throw updateError;
        
        setSuccess('ポスターが正常に更新されました');
      } else {
        // 新規作成処理
        const { error: insertError } = await supabase
          .from('poster')
          .insert([
            { 
              title, 
              genre,
              image_url: publicUrl
            }
          ]);
          
        if (insertError) throw insertError;
        
        setSuccess('ポスターが正常にアップロードされました');
      }
      
      // フォーム初期化
      setTitle('');
      setGenre('');
      setImage(null);
      setImagePreview('');
      setEditMode(false);
      setCurrentPosterId(null);
      fetchPosters();
      
    } catch (err: any) {
      setError(err.message || 'アップロード中にエラーが発生しました');
      console.error('アップロードエラー:', err);
    } finally {
      setLoading(false);
    }
  };

  // ログアウト処理
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!session) {
    return <div>ログイン中...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>管理者ダッシュボード</h1>
        <button onClick={handleSignOut} className={styles.submitButton}>ログアウト</button>
      </div>
      
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <h2>{editMode ? 'ポスター編集' : '新規ポスターのアップロード'}</h2>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}
        
        <div className={styles.formGroup}>
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ポスターのタイトルを入力"
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="genre">ジャンル</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">ジャンルを選択</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="image">画像 {editMode && !image && '(変更しない場合は現在の画像が使用されます)'}</label>
          <div className={styles.fileUpload} onClick={() => { const imageInput = document.getElementById('image'); if (imageInput) imageInput.click(); }}>
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="プレビュー" 
                style={{ maxWidth: '100%', maxHeight: '200px' }} 
              />
            ) : (
              <p>クリックして画像を選択</p>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              required={!editMode} // 編集時は必須ではない
            />
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={loading}
          >
            {loading ? '処理中...' : editMode ? '更新する' : 'アップロードする'}
          </button>
          
          {editMode && (
            <button 
              type="button" 
              className={styles.cancelButton} 
              onClick={handleCancelEdit}
              disabled={loading}
            >
              キャンセル
            </button>
          )}
        </div>
      </form>
      
      <h2>アップロードされたポスター</h2>
      <div className={styles.posterList}>
        {posters.map((poster) => (
          <div key={poster.id} className={styles.posterCard}>
            <img 
              src={poster.image_url} 
              alt={poster.title} 
              className={styles.posterImage} 
            />
            <div className={styles.posterTitle}>{poster.title}</div>
            <div className={styles.posterGenre}>{poster.genre}</div>
            <div className={styles.posterActions}>
              <button 
                className={styles.editButton}
                onClick={() => handleEditClick(poster)}
              >
                編集
              </button>
              <button 
                className={styles.deleteButton}
                onClick={() => handleDelete(poster.id)}
              >
                削除
              </button>
            </div>
          </div>
        ))}
        {posters.length === 0 && <p>ポスターがまだ登録されていません</p>}
      </div>
    </div>
  );
}