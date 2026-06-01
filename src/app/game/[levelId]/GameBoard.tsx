'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Level } from '@/types/game';
import { characters } from '@/data/characters';

export default function GameBoard({ level }: { level: Level }) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [poses, setPoses] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<{ id: string, fromSlot: string | null } | null>(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [isSuccess, setIsSuccess] = useState(false);
  
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pass = true;
    let hasRequired = false;

    for (const slot of level.slots) {
      if (slot.required) {
        hasRequired = true;
        const placedCharId = placed[slot.id];
        if (!placedCharId) { pass = false; break; }
        if (!slot.allowedCharacterIds.includes(placedCharId)) { pass = false; break; }
        if (slot.allowedPoseIds && slot.allowedPoseIds.length > 0) {
          const currentPose = poses[slot.id] || 'stand';
          if (!slot.allowedPoseIds.includes(currentPose)) { pass = false; break; }
        }
      }
    }

    if (pass && hasRequired) {
      setIsSuccess(true);
      const saved = JSON.parse(localStorage.getItem('gami_progress') || '{}');
      saved[level.id] = true;
      localStorage.setItem('gami_progress', JSON.stringify(saved));
    } else {
      setIsSuccess(false);
    }
  }, [placed, poses, level]);

  const handlePointerDown = (e: React.PointerEvent, charId: string, fromSlot: string | null) => {
    if (isSuccess) return;
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

    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;
    const isTap = Math.abs(dx) < 5 && Math.abs(dy) < 5;

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

  // 🔥 核心新增：喚起 LINE 分享好友介面
  const handleShare = () => {
    // @ts-ignore
    if (window.liff && window.liff.isApiAvailable('shareTargetPicker')) {
      // @ts-ignore
      window.liff.shareTargetPicker([{
        type: "text",
        text: `我剛在《角面星人打卡》成功完成了【${level.title}】！\n這些外星人真的有夠難塞🤣\n快來挑戰看看你過不過得了：\nhttps://liff.line.me/2010251224-ecBZ1NJR`
      }]).then((res: any) => {
        if (res) alert("已成功發送戰績給好友！");
      }).catch((error: any) => {
        console.error("分享失敗", error);
      });
    } else {
      alert("請在手機 LINE 裡面開啟遊戲，才能使用好友分享功能喔！");
    }
  };

  const placedChars = Object.values(placed);
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
         <div className="w-[335px] h-[430px] max-h-full max-w-full aspect-[335/430] border-2 border-slate-700 rounded-2xl relative bg-slate-800/50 shadow-inner scale-95 origin-center transition-all">
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
        <div className="text-xs text-slate-400 mb-2">待命角色區 (按住拖曳，輕點換姿勢)：</div>
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

      {isSuccess && (
        <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-800 p-8 rounded-3xl border border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.3)] text-center max-w-[80%]">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-black text-yellow-400 mb-4">打卡成功！</h2>
            <p className="text-slate-200 mb-6 leading-relaxed">{level.successMessage}</p>
            
            {/* 新增的 LINE 分享按鈕 */}
            <button onClick={handleShare} className="bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-8 rounded-xl w-full block shadow-lg transition-transform active:scale-95 mb-3 flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.844 2.572-5.992z"/></svg>
              分享給 LINE 好友
            </button>
            
            <Link href="/levels" className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl w-full block shadow-lg transition-transform active:scale-95">
              回關卡選擇
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}