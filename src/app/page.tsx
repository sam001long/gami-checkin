import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-between h-full p-6 text-center select-none">
      <div className="mt-20">
        <h1 className="text-4xl font-extrabold tracking-wider text-yellow-400 mb-2 drop-shadow-md">角面星人打卡</h1>
        <p className="text-sm text-slate-300 italic">"不是大家沒到齊，是大家合不起來。"</p>
      </div>

      <div className="flex flex-col gap-4 w-full px-6 mb-20">
        <Link href="/levels" className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-2xl text-xl shadow-lg tracking-wide text-center">
          開始遊戲
        </Link>
        <button className="w-full bg-slate-700 text-slate-400 font-medium py-3 rounded-2xl text-sm cursor-not-allowed">
          角色圖鑑 (第二版解鎖)
        </button>
      </div>
    </div>
  );
}