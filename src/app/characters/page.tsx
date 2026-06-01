'use client';

import Link from 'next/link';
import { characters } from '@/data/characters';

export default function CharactersPage() {
  const getCharColor = (id: string) => id === 'fangfang' ? 'bg-blue-500' : id === 'jianjian' ? 'bg-red-500' : id === 'aogao' ? 'bg-green-500' : id === 'yuanyuan' ? 'bg-pink-500' : 'bg-purple-500';

  return (
    <div className="flex flex-col h-[100dvh] p-4 select-none overflow-hidden bg-slate-900">
      <div className="flex items-center justify-between my-4 shrink-0 px-2">
        <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2 drop-shadow-md"><span>📖</span> 角色圖鑑</h2>
        <Link href="/" className="text-sm text-slate-300 hover:text-white bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 active:scale-95 transition-transform font-medium shadow-md">回首頁</Link>
      </div>

      <div className="flex-1 overflow-y-auto pb-8 space-y-5 px-2 custom-scrollbar">
        {characters.map((char) => (
          <div key={char.id} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
            <div className="flex p-4 gap-4 items-center border-b border-slate-700/50 bg-slate-800/80">
              
              <div className={`w-24 h-24 rounded-2xl ${getCharColor(char.id)} flex items-center justify-center text-white font-black text-xl shadow-inner shrink-0 border-4 border-slate-700 relative overflow-hidden`}>
                <img src={char.poses[0]?.imageSrc} alt={char.name} 
                     className="w-full h-full object-cover absolute inset-0 z-10"
                     onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                <span className="z-0 opacity-80">{char.name}</span>
              </div>
              
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-black text-white drop-shadow-sm">{char.name}</h3>
                  <span className="text-[11px] bg-slate-900 border border-slate-600 text-cyan-300 px-2 py-1 rounded-md font-bold">{char.faceShape}</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{char.description}</p>
              </div>
            </div>
            
            <div className="bg-slate-900/80 p-4">
              <h4 className="text-xs font-bold text-slate-400 mb-3 tracking-wider">解鎖姿勢清單</h4>
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {char.poses.map(pose => (
                  <div key={pose.id} className="flex flex-col items-center gap-2 shrink-0">
                    <div className={`w-16 h-16 rounded-xl ${getCharColor(char.id)} opacity-90 flex items-center justify-center text-xs font-bold text-white/90 border-2 border-slate-700 shadow-md relative overflow-hidden`}>
                      <img src={pose.imageSrc} alt={pose.name} 
                           className="w-full h-full object-cover absolute inset-0 z-10"
                           onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                      <span className="z-0 whitespace-pre-line text-center">{pose.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-8 pb-8">
          <p className="text-xs text-slate-500 font-medium bg-slate-800/50 inline-block px-4 py-2 rounded-full">更多隱藏角色陸續解鎖中...</p>
        </div>
      </div>
    </div>
  );
}