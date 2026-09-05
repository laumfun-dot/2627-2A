'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [rank, setRank] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // 自動匹配 2AXX 免 Email 登入邏輯 (Auto-map username to internal email)
    const formattedEmail = `${username.trim().toLowerCase()}@school.local`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formattedEmail,
      password: password,
    });

    if (error) {
      setErrorMsg('登入失敗，請檢查登入名稱或密碼 / Login failed, please check your username or password');
      setLoading(false);
      return;
    }

    if (data.user) {
      setUser(data.user);
      // 讀取該成員的 Rank 權限 (Fetch user rank)
      const { data: profile } = await supabase
        .from('profiles')
        .select('rank')
        .eq('id', data.user.id)
        .single();
      
      if (profile) setRank(profile.rank);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRank(null);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-900 text-slate-100">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-1 text-indigo-400">
          班級資源平台
        </h1>
        <p className="text-sm font-semibold text-center mb-6 text-indigo-300 tracking-wide">
          Class Content Hub
        </p>

        {!user ? (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                登入名稱 <span className="text-slate-400 text-xs">(Username)</span>
              </label>
              <input
                type="text"
                required
                placeholder="例如 / e.g. 2A01, CKK"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                密碼 <span className="text-slate-400 text-xs">(Password)</span>
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-xs text-center leading-relaxed">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition duration-200"
            >
              {loading ? '登入中... / Logging in...' : '登入 / Login'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700">
              <p className="text-base text-slate-300">
                歡迎登入 / Welcome!
              </p>
              <p className="text-xl font-bold text-indigo-400 mt-1">
                {username.toUpperCase()}
              </p>
            </div>

            <p className="text-sm text-slate-400">
              權限等級 / Rank Level: <span className="text-yellow-400 font-bold">{rank}</span>
            </p>
            
            {rank === 99 && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-sm">
                👑 最高管理員 / Admin (Owner)
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition duration-200"
            >
              登出 / Logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
