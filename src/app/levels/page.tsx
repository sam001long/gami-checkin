'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { levels } from '@/data/levels';

export default function LevelsPage() {
  const [progress, setProgress] = useState<Record<string, { passed: boolean, bestTime: number, stars: number }>>({});
  const [totalStars, setTotalStars] = useState(0);
  const maxStars = levels.length * 3;

  useEffect(() => {
    const saved = localStorage.getItem('gami_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgress(parsed);
      
      // 計算總獲得星數
      let starsCount = 0;
      Object.values(parsed).forEach((data: any) => {
        if (data.stars) starsCount += data.stars;
      });
      setTotalStars(starsCount);
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

      {/* 🔥 全域星星進度條 */}
      <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 mb-4 shrink-0 shadow-lg">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-bold text-white">收集進度</span>
          <span className="text-lg font-black text-yellow-400">{totalStars} <span className="text-sm text-slate-400">/ {maxStars} ★</span></span>
        </div>
        <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden shadow-inner">
          <div className="bg-yellow-500 h-full transition-all duration-1000 ease-out relative" 
               style={{ width: `${(totalStars / maxStars) * 100}%` }}>
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-right">收集星星可解鎖圖鑑隱藏角色</p>
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
                
                {isPassed && (
                  <span className="text-[10px] text-cyan-400 mt-2 font-mono bg-slate-900 px-2 py-1 rounded-md inline-block w-fit border border-slate-700">
                    最佳紀錄: {levelData.bestTime} 秒
                  </span>
                )}
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {isPassed ? renderStars(stars) : (
                  <span className="text-xs bg-slate-900 text-slate-500 px-3 py-1.5 rounded-full font-bold border border-slate-700">挑戰</span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}