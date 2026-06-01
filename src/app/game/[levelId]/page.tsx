import Link from 'next/link';
import { levels } platform = 'next/navigation';
import { notFound } from 'next/navigation';

export default async function GamePage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = await params;
  const level = levels.find((l) => l.id === levelId);

  if (!level) notFound();

  return (
    <div className="flex flex-col h-full bg-slate-900 justify-between select-none">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-yellow-400">{level.title}</h3>
          <p className="text-xs text-slate-400">{level.subtitle}</p>
        </div>
        <Link href="/levels" className="bg-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-600">放棄離開</Link>
      </div>

      <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-4">
        <div className="w-[335px] h-[430px] border-2 border-dashed border-slate-700 rounded-2xl flex items-center justify-center relative overflow-hidden bg-slate-900">
          <span className="text-slate-600 text-sm absolute bottom-4">【 下一階段 PR #2 啟用拖曳合照區 】</span>
        </div>
      </div>

      <div className="bg-slate-800 border-t border-slate-700 p-4 min-h-[140px]">
        <div className="text-xs text-slate-400 mb-2">待命角色區：</div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {level.characters.map((charId) => (
            <div key={charId} className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center text-xs border border-slate-600 text-slate-300 font-semibold">
              {charId === 'fangfang' ? '方方' : charId === 'jianjian' ? '尖尖' : '凹凹'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}