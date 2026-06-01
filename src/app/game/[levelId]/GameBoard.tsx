'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Level } from '@/types/game';

export default function GameBoard({ level }: { level: Level }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<{ id: string, fromSlot: string | null } | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  
  const boardRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent, charId: string, fromSlot: string | null) => {
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
    setDragging({ id: charId, fromSlot });
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const target = e.target as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    if (boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      const relativeX = e.clientX - boardRect.left;
      const relativeY = e.clientY - boardRect.top;

      let droppedSlot = null;
      for (const slot of level.slots) {
         const dx = relativeX - slot.x;
         const dy = relativeY - slot.y;
         if (Math.sqrt(dx*dx + dy*dy) < 45) {
           droppedSlot = slot.id;
           break;
         }
      }

      if (droppedSlot) {
        setPlaced(prev => ({ ...prev, [droppedSlot]: dragging.id }));
      } else if (dragging.fromSlot) {
        const newPlaced = { ...placed };
        delete newPlaced[dragging.fromSlot];
        setPlaced(newPlaced);
      }
    }
    setDragging(null);
  };

  const placedChars = Object.values(placed);
  const getCharName = (id: string) => id === 'fangfang' ? '方方' : id === 'jianjian' ? '尖尖' : '凹凹';
  const getCharColor = (id: string) => id === 'fangfang' ? 'bg-blue-500' : id === 'jianjian' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-900 justify-between select-none touch-none overflow-hidden"
         onPointerMove={handlePointerMove}
         onPointerUp={handlePointerUp}>
      
      {/* 頂部導覽 (微調 padding) */}
      <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center z-10 shrink-0">
        <div>
          <h3 className="font-bold text-lg text-yellow-400">{level.title}</h3>
          <p className="text-xs text-slate-400">{level.subtitle}</p>
        </div>
        <Link href="/levels" className="bg-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-600 text-white">放棄</Link>
      </div>

      {/* 遊戲合照畫板區 */}
      <div ref={boardRef} className="flex-1 relative bg-slate-950 flex items-center justify-center p-2 overflow-hidden">
         {/* 為了適應 SE2，加上 max-h-full 確保框框不會撐爆 */}
         <div className="w-[335px] h-[430px] max-h-full max-w-full aspect-[335/430] border-2 border-slate-700 rounded-2xl relative bg-slate-800/50 shadow-inner scale-95 origin-center">
            
            {level.slots.map(slot => {
              const isPlaced = placed[slot.id];
              const isDraggingThis = dragging?.id === isPlaced && dragging?.fromSlot === slot.id;
              const zIndex = slot.row === 'front' ? 'z-20' : 'z-10';

              return (
                <div key={slot.id}
                     className={`absolute w-16 h-16 rounded-full -ml-8 -mt-8 ${zIndex} flex items-center justify-center ${!isPlaced ? 'border-2 border-dashed border-slate-500 bg-slate-700/30' : ''}`}
                     style={{ left: slot.x, top: slot.y }}>

                   {!isPlaced && <span className="text-slate-500 text-[10px]">站位</span>}

                   {isPlaced && !isDraggingThis && (
                     <div onPointerDown={(e) => handlePointerDown(e, isPlaced, slot.id)}
                          className={`w-16 h-16 ${getCharColor(isPlaced)} rounded-xl flex items-center justify-center text-white font-bold shadow-lg cursor-grab border-2 border-white/20 active:scale-95 transition-transform`}>
                        {getCharName(isPlaced)}
                     </div>
                   )}
                </div>
              );
            })}
         </div>

         {/* 拖曳殘影 */}
         {dragging && (
           <div className={`fixed z-50 w-16 h-16 ${getCharColor(dragging.id)} rounded-xl flex items-center justify-center text-white font-bold shadow-2xl opacity-90 pointer-events-none -ml-8 -mt-8 border-2 border-white/50 scale-110 transition-transform`}
                style={{ left: dragPos.x, top: dragPos.y }}>
             {getCharName(dragging.id)}
           </div>
         )}
      </div>

      {/* 底部待命角色區：縮減高度與 Padding，完美貼合 SE2 底部 */}
      <div className="bg-slate-800 border-t border-slate-700 p-3 min-h-[100px] z-10 shrink-0 pb-6">
        <div className="text-xs text-slate-400 mb-2">待命角色區 (按住拖曳)：</div>
        <div className="flex gap-2 overflow-x-auto pb-1 px-1">
          {level.characters.map((charId) => {
            const isPlaced = placedChars.includes(charId);
            const isDraggingThis = dragging?.id === charId && !dragging.fromSlot;

            if (isPlaced && !isDraggingThis) {
              return <div key={charId} className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-xl opacity-20 shrink-0" />;
            }

            return (
              <div key={charId}
                   onPointerDown={(e) => handlePointerDown(e, charId, null)}
                   className={`w-16 h-16 ${getCharColor(charId)} rounded-xl flex items-center justify-center text-white font-bold shadow-md cursor-grab active:cursor-grabbing shrink-0 ${isDraggingThis ? 'opacity-30' : ''}`}>
                {getCharName(charId)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}