'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Level } from '@/types/game';

export default function GameBoard({ level }: { level: Level }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<{ id: string, fromSlot: string | null } | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  
  const boardRef = useRef<HTMLDivElement>(null);

  // 1. 按下角色：鎖定指標並記錄起始狀態
  const handlePointerDown = (e: React.PointerEvent, charId: string, fromSlot: string | null) => {
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId); // 讓手指滑出元素外也能繼續監聽
    setDragging({ id: charId, fromSlot });
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  // 2. 拖曳中：更新絕對座標
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  // 3. 鬆開手指：判定是否吸附到網格
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const target = e.target as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    if (boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      // 換算成畫板內的相對座標
      const relativeX = e.clientX - boardRect.left;
      const relativeY = e.clientY - boardRect.top;

      let droppedSlot = null;
      // 掃描所有設定好的站位
      for (const slot of level.slots) {
         const dx = relativeX - slot.x;
         const dy = relativeY - slot.y;
         // 如果距離小於 45px，就產生磁吸效應
         if (Math.sqrt(dx*dx + dy*dy) < 45) {
           droppedSlot = slot.id;
           break;
         }
      }

      if (droppedSlot) {
        // 放對位置：更新站位狀態
        setPlaced(prev => ({ ...prev, [droppedSlot]: dragging.id }));
      } else if (dragging.fromSlot) {
        // 丟在空地：從畫面上移除，退回待命區
        const newPlaced = { ...placed };
        delete newPlaced[dragging.fromSlot];
        setPlaced(newPlaced);
      }
    }
    setDragging(null); // 結束拖曳
  };

  const placedChars = Object.values(placed);
  const getCharName = (id: string) => id === 'fangfang' ? '方方' : id === 'jianjian' ? '尖尖' : '凹凹';
  const getCharColor = (id: string) => id === 'fangfang' ? 'bg-blue-500' : id === 'jianjian' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="flex flex-col h-full bg-slate-900 justify-between select-none touch-none overflow-hidden"
         onPointerMove={handlePointerMove}
         onPointerUp={handlePointerUp}>
      
      {/* 頂部導覽 */}
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center z-10">
        <div>
          <h3 className="font-bold text-lg text-yellow-400">{level.title}</h3>
          <p className="text-xs text-slate-400">{level.subtitle}</p>
        </div>
        <Link href="/levels" className="bg-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-600 text-white">放棄離開</Link>
      </div>

      {/* 遊戲合照畫板區 */}
      <div ref={boardRef} className="flex-1 relative bg-slate-950 flex items-center justify-center p-4">
         <div className="w-[335px] h-[430px] border-2 border-slate-700 rounded-2xl relative bg-slate-800/50 shadow-inner">
            
            {/* 繪製站位 (Slots) */}
            {level.slots.map(slot => {
              const isPlaced = placed[slot.id];
              const isDraggingThis = dragging?.id === isPlaced && dragging?.fromSlot === slot.id;
              // 實作 z-index 前後排覆蓋邏輯
              const zIndex = slot.row === 'front' ? 'z-20' : 'z-10';

              return (
                <div key={slot.id}
                     className={`absolute w-16 h-16 rounded-full -ml-8 -mt-8 ${zIndex} flex items-center justify-center ${!isPlaced ? 'border-2 border-dashed border-slate-500 bg-slate-700/30' : ''}`}
                     style={{ left: slot.x, top: slot.y }}>

                   {!isPlaced && <span className="text-slate-500 text-[10px]">站位</span>}

                   {/* 如果這裡有站人，且沒有正在被拖走，就顯示角色 */}
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

         {/* 全局拖曳中的殘影 (跟著手指跑) */}
         {dragging && (
           <div className={`fixed z-50 w-16 h-16 ${getCharColor(dragging.id)} rounded-xl flex items-center justify-center text-white font-bold shadow-2xl opacity-90 pointer-events-none -ml-8 -mt-8 border-2 border-white/50 scale-110 transition-transform`}
                style={{ left: dragPos.x, top: dragPos.y }}>
             {getCharName(dragging.id)}
           </div>
         )}
      </div>

      {/* 底部待命角色區 */}
      <div className="bg-slate-800 border-t border-slate-700 p-4 min-h-[140px] z-10 pb-8">
        <div className="text-xs text-slate-400 mb-2">待命角色區 (按住拖曳)：</div>
        <div className="flex gap-3 overflow-x-auto pb-2 px-1">
          {level.characters.map((charId) => {
            const isPlaced = placedChars.includes(charId);
            const isDraggingThis = dragging?.id === charId && !dragging.fromSlot;

            // 如果已經在畫面上，底部就變空殼
            if (isPlaced && !isDraggingThis) {
              return <div key={charId} className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-xl opacity-20" />;
            }

            return (
              <div key={charId}
                   onPointerDown={(e) => handlePointerDown(e, charId, null)}
                   className={`w-16 h-16 ${getCharColor(charId)} rounded-xl flex items-center justify-center text-white font-bold shadow-md cursor-grab active:cursor-grabbing ${isDraggingThis ? 'opacity-30' : ''}`}>
                {getCharName(charId)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}