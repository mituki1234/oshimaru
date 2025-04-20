"use client";
import { useState } from 'react';
import styles from "../page.module.css";

interface Poster {
  id: string;
  title: string;
  created_at: string;
  image_url: string;
  genre?: string;
}

interface ClientPosterProps {
  poster: Poster;
}

export default function ClientPoster({ poster }: ClientPosterProps) {
  // クライアント側でのインタラクションがある場合はここに実装
  // 例: const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={styles.card}>
      <h3>{poster.title}</h3>
      <span>{new Date(poster.created_at).toLocaleDateString('ja-JP')}</span>
      <img src={poster.image_url} alt={poster.title} />
    </div>
  );
}