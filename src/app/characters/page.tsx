'use client';

import Link from 'next/link';
import { characters } from '@/data/characters';

export default function CharactersPage() {
  const getCharColor = (id: string) => id === 'fangfang' ? 'bg-blue-500' : id === 'jianjian' ? 'bg-red-500' : id === 'aogao' ? 'bg-green-500' : id === 'yuanyuan' ? 'bg-pink-500' : 'bg-purple-500';

  return (
    <div className="flex flex-col h-[100dvh] p-4 select-none overflow-hidden bg-slate-900">
      <div className="flex items-center justify-between my-4 shrink-0 px-2">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2"><span>📖</span> 角色圖鑑</h2>
        <Link href="/" className="text-sm text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 active:scale-95 transition-transform font-medium">回首頁</Link>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 space-y-4 px-2 custom-scrollbar">
        {characters.map((char) => (
          <div key={char.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg">
            <div className="flex p-4 gap-4 items-center border-b border-slate-700/50">
              {/* 未來替換 3D 圖片的預留框 */}
              <div className={`w-20 h-20 rounded-2xl ${getCharColor(char.id)} flex items-center justify-center text-white font-black text-xl shadow-inner shrink-0 border-2 border-white/10`}>
                {char.name}
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{char.name}</h3>
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-1 rounded-md">{char.faceShape}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{char.description}</p>
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-4">
              <h4 className="text-xs font-semibold text-slate-500 mb-3">解鎖姿勢清單</h4>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {char.poses.map(pose => (
                  <div key={pose.id} className="flex flex-col items-center gap-1 shrink-0">
                    <div className={`w-14 h-14 rounded-xl ${getCharColor(char.id)} opacity-80 flex items-center justify-center text-xs font-bold text-white/90 border border-white/5`}>
                      {pose.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-8 pb-8">
          <p className="text-xs text-slate-500">更多隱藏角色陸續解鎖中...</p>
        </div>
      </div>
    </div>
  );
}