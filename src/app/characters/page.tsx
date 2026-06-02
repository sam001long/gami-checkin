'use client';

import Link from 'next/link';
import { characters } from '@/data/characters';

export default function CharactersPage() {
  const getCharColor = (id: string) => id === 'fangfang' ? 'bg-blue-500' : id === 'jianjian' ? 'bg-red-500' : id === 'aogao' ? 'bg-green-500' : id === 'yuanyuan' ? 'bg-pink-500' : 'bg-purple-500';

  const getShapeStyle = (faceShape: string, sizeClass: string = "w-12 h-12", extraClass: string = "") => {
    let style = `${sizeClass} ${extraClass} `;
    if (faceShape === 'square') style += "rounded-lg";
    else if (faceShape === 'circle') style += "rounded-full";
    else if (faceShape === 'triangle') style += "[clip-path:polygon(50%_0%,0%_100%,100%_100%)]";
    else if (faceShape === 'concave') style += "[clip-path:polygon(0%_0%,25%_0%,25%_55%,75%_55%,75%_0%,100%_0%,100%_100%,0%_100%)]";
    else if (faceShape === 'long') style += "scale-x-50 rounded-md";
    return style;
  };

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
              
              <div className="w-24 h-24 rounded-2xl bg-slate-900 flex items-center justify-center shadow-inner shrink-0 border-4 border-slate-700 relative overflow-hidden">
                {/* CSS 幾何大頭貼 */}
                <div className={`${getShapeStyle(char.faceShape, "w-14 h-14")} ${getCharColor(char.id)} absolute shadow-inner opacity-90`}></div>
                <img src={char.poses[0]?.imageSrc || '/placeholder.png'} alt={char.name} 
                     className="w-full h-full object-cover absolute inset-0 z-10"
                     onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                <span className="z-20 text-white font-black drop-shadow-[0_2px_2px_rgba(0,0,0,1)] absolute bottom-1">{char.name}</span>
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
                    <div className="w-16 h-16 rounded-xl bg-slate-800 flex flex-col items-center justify-center border-2 border-slate-700 shadow-md relative overflow-hidden">
                      {/* 小尺寸 CSS 姿勢預覽 */}
                      <div className={`${getShapeStyle(char.faceShape, "w-8 h-8", pose.id === 'squat' ? 'scale-y-75 translate-y-1' : '')} ${getCharColor(char.id)} absolute top-2 opacity-90`}></div>
                      <img src={pose.imageSrc || '/placeholder.png'} alt={pose.name} 
                           className="w-full h-full object-cover absolute inset-0 z-10"
                           onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                      <span className="z-20 text-[10px] text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,1)] absolute bottom-1">{pose.name}</span>
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