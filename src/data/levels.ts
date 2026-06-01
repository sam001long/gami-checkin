import { Level } from '@/types/game';

export const levels: Level[] = [
  {
    id: 'level-01',
    title: '官方證件照',
    subtitle: '先學會讓大家不要互相擋臉。',
    backgroundSrc: '/levels/level-01-bg.png',
    frame: { x: 20, y: 90, width: 335, height: 430 },
    landmarkSafeAreas: [],
    characters: ['fangfang', 'jianjian', 'aogao'],
    slots: [
      { id: 'front-left', x: 95, y: 330, row: 'front', allowedCharacterIds: ['fangfang'], allowedPoseIds: ['stand', 'thumb'], tolerance: 36, required: true },
      { id: 'front-center', x: 175, y: 330, row: 'front', allowedCharacterIds: ['aogao'], allowedPoseIds: ['stand'], tolerance: 36, required: true },
      { id: 'back-center', x: 175, y: 245, row: 'back', allowedCharacterIds: ['jianjian'], allowedPoseIds: ['stand'], tolerance: 36, required: true }
    ],
    successMessage: '官方證件照完成！雖然看起來還是怪怪的。'
  },
  { 
    id: 'level-02', 
    title: '台北高塔打卡', 
    subtitle: '地標遮擋教學。不能遮住高塔。', 
    backgroundSrc: '/levels/level-02-bg.png', 
    frame: { x: 20, y: 90, width: 335, height: 430 }, 
    landmarkSafeAreas: [{ x: 150, y: 100, width: 80, height: 150 }], 
    characters: ['fangfang', 'jianjian', 'aogao', 'yuanyuan', 'changchang'], 
    slots: [], 
    successMessage: '高塔打卡成功！' 
  }
];