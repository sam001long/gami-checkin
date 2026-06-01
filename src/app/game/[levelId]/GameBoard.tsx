'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Level } from '@/types/game';
import { characters } from '@/data/characters';

export default function GameBoard({ level }: { level: Level }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [poses, setPoses] = useState<Record<string, string>>({}); // 紀錄每個 Slot 上的角色姿勢
  const [dragging, setDragging] = useState<{ id: string, fromSlot: string | null } | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [isSuccess, setIsSuccess] = useState(false); // 通關狀態
  
  const boardRef = useRef<HTMLDivElement>(null);

  // 1. 隨時檢查通關條件
  useEffect(() => {
    let pass = true;
    let hasRequired = false;

    for (const slot of level.slots) {
      if (slot.required) {
        hasRequired = true;
        const placedCharId = placed[slot.id];
        
        // 條件一：格子要有站人
        if (!placedCharId) { pass = false; break; }
        // 條件二：角色要是對的
        if (!slot.allowedCharacterIds.includes(placedCharId)) { pass = false; break; }
        // 條件三：姿勢要是對的
        if (slot.allowedPoseIds && slot.allowedPoseIds.length > 0) {
          const currentPose = poses[slot.id] || 'stand';
          if (!slot.allowedPoseIds.includes(currentPose)) { pass = false; break; }
        }
      }
    }

    if (pass && hasRequired) setIsSuccess(true);
    else setIsSuccess(false);
  }, [placed, poses, level]);

  const handlePointerDown = (e: React.PointerEvent, charId: string, fromSlot: string | null) => {
    if (isSuccess) return; // 通關後鎖定畫面
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
    setDragging({ id: charId, fromSlot });
    setDragPos({ x: e.clientX, y: e.clientY });
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const target = e.target as HTMLElement;
    target.releasePointerCapture(e.pointerId);

    // 判斷是點擊還是拖曳 (移動距離小於 5px 視為點擊)
    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;
    const isTap = Math.abs(dx) < 5 && Math.abs(dy) < 5;

    // 如果是點擊已經在畫面上的人，就切換姿勢
    if (isTap && dragging.fromSlot) {
      const charData = characters.find(c => c.id === dragging.id);
      if (charData && charData.poses.length > 1) {
        const currentPose = poses[dragging.fromSlot] || charData.defaultPoseId;
        const currentIndex = charData.poses.findIndex(p => p.id === currentPose);
        const nextPose = charData.poses[(currentIndex + 1) % charData.poses.length].id;
        setPoses(prev => ({ ...prev, [dragging.fromSlot!]: nextPose }));
      }
      setDragging(null);
      return;
    }

    if (boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      const relativeX = e.clientX - boardRect.left;
      const relativeY = e.clientY - boardRect.top;

      let droppedSlot = null;
      for (const slot of level.slots) {
         const sDx = relativeX - slot.x;
         const sDy = relativeY - slot.y;
         if (Math.sqrt(sDx*sDx + sDy*sDy) < 45) {
           droppedSlot = slot.id;
           break;
         }
      }

      if (droppedSlot) {
        setPlaced(prev => ({ ...prev, [droppedSlot]: dragging.id }));
        
        // 處理姿勢移轉或給予預設姿勢
        if (!dragging.fromSlot) {
          const charData = characters.find(c => c.id === dragging.id);
          setPoses(prev => ({ ...prev, [droppedSlot]: charData?.defaultPoseId || 'stand' }));
        } else if (dragging.fromSlot !== droppedSlot) {
          const currentPose = poses[dragging.fromSlot];
          setPoses(prev => {
            const newPoses = { ...prev, [droppedSlot]: currentPose };
            delete newPoses[dragging.fromSlot!];
            return newPoses;
          });
        }
      } else if (dragging.fromSlot) {
        // 退回待命區，清除狀態
        const newPlaced = { ...placed };
        delete newPlaced[dragging.fromSlot];
        setPlaced(newPlaced);
        
        const newPoses = { ...poses };
        delete newPoses[dragging.fromSlot];
        setPoses(newPoses);
      }
    }
    setDragging(null);
  };

  const placedChars = Object.values(placed);
  
  // 取得角色顯示名稱 (包含當前姿勢)
  const getCharDisplayName = (id: string, poseId: string = 'stand') => {
    const charData = characters.find(c => c.id === id);
    const poseName = charData?.poses.find(p => p.id === poseId)?.name || '未知';
    return `${charData?.name || id}\n(${poseName})`;
  };
  
  const getCharColor = (id: string) => id === 'fangfang' ? 'bg-blue-500' : id === 'jianjian' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-900 justify-between select-none touch-none overflow-hidden relative"
         onPointerMove={handlePointerMove}
         onPointerUp={handlePointerUp}>
      
      <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center z-10 shrink-0">
        <div>
          <h3 className="font-bold text-lg text-yellow-400">{level.title}</h3>
          <p className="text-xs text-slate-400">{level.subtitle}</p>
        </div>
        <Link href="/levels" className="bg-slate-700 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-600 text-white">放棄</Link>
      </div>

      <div ref={boardRef} className="flex-1 relative bg-slate-950 flex items-center justify-center p-2 overflow-hidden">
         <div className="w-[335px] h-[430px] max-h-full max-w-full aspect-[335/430] border-2 border-slate-700 rounded-2xl relative bg-slate-800/50 shadow-inner scale-95 origin-center">
            {level.slots.map(slot => {
              const isPlaced = placed[slot.id];
              const isDraggingThis = dragging?.id === isPlaced && dragging?.fromSlot === slot.id;
              const zIndex = slot.row === 'front' ? 'z-20' : 'z-10';
              const currentPoseId = poses[slot.id] || 'stand';

              return (
                <div key={slot.id}
                     className={`absolute w-16 h-16 rounded-full -ml-8 -mt-8 ${zIndex} flex items-center justify-center ${!isPlaced ? 'border-2 border-dashed border-slate-500 bg-slate-700/30' : ''}`}
                     style={{ left: slot.x, top: slot.y }}>

                   {!isPlaced && <span className="text-slate-500 text-[10px]">站位</span>}

                   {isPlaced && !isDraggingThis && (
                     <div onPointerDown={(e) => handlePointerDown(e, isPlaced, slot.id)}
                          className={`w-16 h-16 ${getCharColor(isPlaced)} rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-grab border-2 border-white/20 active:scale-95 transition-transform text-center whitespace-pre-line`}>
                        {getCharDisplayName(isPlaced, currentPoseId)}
                     </div>
                   )}
                </div>
              );
            })}
         </div>

         {dragging && (
           <div className={`fixed z-50 w-16 h-16 ${getCharColor(dragging.id)} rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-2xl opacity-90 pointer-events-none -ml-8 -mt-8 border-2 border-white/50 scale-110 transition-transform text-center whitespace-pre-line`}
                style={{ left: dragPos.x, top: dragPos.y }}>
             {getCharDisplayName(dragging.id, dragging.fromSlot ? poses[dragging.fromSlot] : 'stand')}
           </div>
         )}
      </div>

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
                   className={`w-16 h-16 ${getCharColor(charId)} rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md cursor-grab active:cursor-grabbing shrink-0 text-center whitespace-pre-line ${isDraggingThis ? 'opacity-30' : ''}`}>
                {getCharDisplayName(charId)}
              </div>
            );
          })}
        </div>
      </div>

      {/* 通關成功提示框 */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 rounded-3xl border border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.3)] text-center max-w-[80%]">
            <h2 className="text-3xl font-black text-yellow-400 mb-4 animate-bounce">打卡成功！</h2>
            <p className="text-slate-200 mb-8 leading-relaxed">{level.successMessage}</p>
            <Link href="/levels" className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-xl w-full block shadow-lg transition-transform active:scale-95">
              回關卡選擇
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}