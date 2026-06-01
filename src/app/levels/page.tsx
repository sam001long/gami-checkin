'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { levels } from '@/data/levels';

export default function LevelsPage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // 進入頁面時，讀取瀏覽器 LocalStorage
    const saved = localStorage.getItem('gami_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="flex flex-col h-[100dvh] p-4 select-none overflow-hidden">
      <div className="flex items-center justify-between my-4 shrink-0">
        <h2 className="text-2xl font-bold text-yellow-400">關卡選擇</h2>
        <Link href="/" className="text-sm text-slate-400 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">回首頁</Link>
      </div>

      <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 flex-1 pb-6">
        {levels.map((level, index) => {
          const isPassed = progress[level.id]; // 檢查這關是否通過
          
          return (
            <Link key={level.id} href={`/game/${level.id}`} className={`p-4 rounded-xl border transition-all flex items-center justify-between active:scale-[0.98] ${isPassed ? 'bg-slate-800 border-green-500/50' : 'bg-slate-700 hover:bg-slate-650 border-slate-600'}`}>
              <div className="flex flex-col">
                <span className={`text-xs font-semibold mb-1 ${isPassed ? 'text-green-400' : 'text-yellow-500'}`}>LEVEL {index + 1}</span>
                <span className="text-lg font-bold text-white">{level.title}</span>
                <span className="text-xs text-slate-400 mt-1">{level.subtitle}</span>
              </div>
              
              {/* 動態顯示徽章 */}
              {isPassed ? (
                <span className="text-xs bg-green-900 text-green-300 px-3 py-1 rounded-full border border-green-700 font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]">⭐ 已完成</span>
              ) : (
                <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">未完成</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}