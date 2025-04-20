"use client";
import { useState } from 'react';
import styles from "./ClientPoster.module.css";
import { IoClose } from "react-icons/io5";

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <>
      <div className={styles.card}>
        <h3>{poster.title}</h3>
        <span>{new Date(poster.created_at).toLocaleDateString('ja-JP')}</span>
        <img 
          src={poster.image_url} 
          alt={poster.title} 
          onClick={toggleExpand}
          className={styles.cardImage}
        />
      </div>
      
      {isExpanded && (
        <div className={styles.overlay} onClick={toggleExpand}>
          <div className={styles.expandedImageContainer}>
            <button 
              className={styles.closeButton} 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <IoClose size={30} />
            </button>
            <img 
              src={poster.image_url} 
              alt={poster.title} 
              className={styles.expandedImage}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}