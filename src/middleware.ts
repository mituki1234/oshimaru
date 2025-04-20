import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Supabaseクライアントをミドルウェアで作成
  const supabase = createMiddlewareClient({ req, res });
  
  // セッションを更新（必要に応じて）
  await supabase.auth.getSession();
  
  return res;
}

// /admin/dashboard へのアクセスに対してミドルウェアを適用
export const config = {
  matcher: ['/admin/:path*']
};