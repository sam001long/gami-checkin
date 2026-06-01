import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-6 text-center select-none overflow-hidden relative">
      {/* 裝飾背景光暈 */}
      <div className="absolute top-[-10%] left-[-20%] w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="mt-24 z-10">
        <h1 className="text-4xl font-black tracking-widest text-yellow-400 mb-3 drop-shadow-[0_4px_10px_rgba(234,179,8,0.4)]">角面星人<br/>打卡</h1>
        <p className="text-sm text-slate-300 italic font-medium tracking-wide">"不是大家沒到齊，<br/>是大家合不起來。"</p>
      </div>

      <div className="flex flex-col gap-5 w-full px-4 mb-20 z-10">
        <Link href="/levels" className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black py-4 rounded-2xl text-xl shadow-[0_8px_20px_rgba(234,179,8,0.3)] tracking-widest text-center transition-transform active:scale-95">
          開始遊戲
        </Link>
        {/* 解鎖按鈕，換上科技藍 */}
        <Link href="/characters" className="w-full bg-slate-700 hover:bg-slate-600 text-cyan-400 border border-slate-600 font-bold py-4 rounded-2xl text-lg shadow-lg tracking-wide text-center transition-transform active:scale-95 flex items-center justify-center gap-2">
          <span>📖</span> 角色圖鑑
        </Link>
      </div>
    </div>
  );
}