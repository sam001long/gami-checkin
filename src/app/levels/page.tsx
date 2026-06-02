'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { levels } from '@/data/levels';

export default function LevelsPage() {
  const [progress, setProgress] = useState<Record<string, { passed: boolean, bestTime: number, stars: number }>>({});

  useEffect(() => {
    const saved = localStorage.getItem('gami_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const renderStars = (stars: number) => {
    return (
      <div className="flex gap-1 drop-shadow-md">
        <span className={`text-sm ${stars >= 1 ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>
        <span className={`text-sm ${stars >= 2 ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>
        <span className={`text-sm ${stars >= 3 ? 'text-yellow-400' : 'text-slate-600'}`}>★</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[100dvh] p-4 select-none overflow-hidden bg-slate-900">
      <div className="flex items-center justify-between my-4 shrink-0">
        <h2 className="text-2xl font-bold text-yellow-400 drop-shadow-md">關卡選擇</h2>
        <Link href="/" className="text-sm text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 shadow-md active:scale-95 transition-transform">回首頁</Link>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-1 flex-1 pb-6 custom-scrollbar">
        {levels.map((level, index) => {
          const levelData = progress[level.id];
          const isPassed = levelData?.passed;
          const stars = levelData?.stars || 0;
          
          return (
            <Link key={level.id} href={`/game/${level.id}`} className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between active:scale-[0.98] shadow-lg ${isPassed ? 'bg-slate-800 border-yellow-500/50' : 'bg-slate-800/60 hover:bg-slate-700 border-slate-700'}`}>
              <div className="flex flex-col">
                <span className={`text-[10px] font-black tracking-wider mb-1 ${isPassed ? 'text-yellow-400' : 'text-slate-500'}`}>LEVEL {index + 1}</span>
                <span className="text-xl font-bold text-white drop-shadow-sm">{level.title}</span>
                <span className="text-xs text-slate-400 mt-1">{level.subtitle}</span>
                
                {/* 顯示最佳時間 */}
                {isPassed && (
                  <span className="text-[10px] text-cyan-400 mt-2 font-mono bg-slate-900 px-2 py-1 rounded-md inline-block w-fit border border-slate-700">
                    最佳紀錄: {levelData.bestTime} 秒
                  </span>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {isPassed ? renderStars(stars) : (
                  <span className="text-xs bg-slate-900 text-slate-500 px-3 py-1.5 rounded-full font-bold border border-slate-700">未解鎖</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}