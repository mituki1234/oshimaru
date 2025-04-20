"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabase = createClientComponentClient();

    // ログイン処理
    interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

    interface SupabaseAuthError {
        message: string;
    }

    const handleLogin = async (e: LoginFormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { data, error }: { data: any; error: SupabaseAuthError | null } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            
            // ログイン成功時
            router.refresh(); // セッション更新を反映
            router.push('/admin/dashboard');
        } catch (err: any) {
            console.error('ログインエラー:', err);
            setError(err.message || 'ログインに失敗しました。入力内容を確認してください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ログイン</h1>
            {error && <div className={styles.error}>{error}</div>}
            
            <form onSubmit={handleLogin}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">メールアドレス</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        disabled={isLoading}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">パスワード</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        disabled={isLoading}
                    />
                </div>
                <button 
                    type="submit" 
                    className={styles.button} 
                    disabled={isLoading}
                >
                    {isLoading ? 'ログイン中...' : 'ログイン'}
                </button>
                <div className={styles.forgotPassword}>
                    <Link href="/forgot-password">パスワードをお忘れですか？</Link>
                </div>
            </form>
        </div>
    );
}