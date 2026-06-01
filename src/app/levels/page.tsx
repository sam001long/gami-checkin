import Link from 'next/link';
import { levels } from '@/data/levels'; //

export default function LevelsPage() {
  return (
    <div className="flex flex-col h-full p-4 select-none">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold text-yellow-400">??豢?</h2>
        <Link href="/" className="text-sm text-slate-400 hover:text-white">????/Link>
      </div>

      <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 flex-1 pb-6">
        {levels.map((level, index) => (
          <Link key={level.id} href={`/game/${level.id}`} className="bg-slate-700 hover:bg-slate-650 p-4 rounded-xl border border-slate-600 transition-all flex items-center justify-between active:scale-[0.98]">
            <div className="flex flex-col">
              <span className="text-xs text-yellow-500 font-semibold mb-1">LEVEL {index + 1}</span>
              <span className="text-lg font-bold">{level.title}</span>
              <span className="text-xs text-slate-400 mt-1">{level.subtitle}</span>
            </div>
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">?芸???/span>
          </Link>
        ))}
      </div>
    </div>
  );
} //
