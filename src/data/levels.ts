import { Level } from '@/types/game'; //

export const levels: Level[] = [
  {
    id: 'level-01',
    title: '摰霅辣??,
    subtitle: '?飛??憭批振銝?鈭????,
    backgroundSrc: '/levels/level-01-bg.png',
    frame: { x: 20, y: 90, width: 335, height: 430 },
    landmarkSafeAreas: [],
    characters: ['fangfang', 'jianjian', 'aogao'],
    slots: [
      { id: 'front-left', x: 95, y: 330, row: 'front', allowedCharacterIds: ['fangfang'], allowedPoseIds: ['stand', 'thumb'], tolerance: 36, required: true },
      { id: 'front-center', x: 175, y: 330, row: 'front', allowedCharacterIds: ['aogao'], allowedPoseIds: ['stand'], tolerance: 36, required: true },
      { id: 'back-center', x: 175, y: 245, row: 'back', allowedCharacterIds: ['jianjian'], allowedPoseIds: ['stand'], tolerance: 36, required: true }
    ],
    successMessage: '摰霅辣?批?????絲靘??舀芣芰???
  },
  { 
    id: 'level-02', 
    title: '?啣?擃??', 
    subtitle: '?唳??格??飛???賡雿?憛?, 
    backgroundSrc: '/levels/level-02-bg.png', 
    frame: { x: 20, y: 90, width: 335, height: 430 }, 
    landmarkSafeAreas: [{ x: 150, y: 100, width: 80, height: 150 }], 
    characters: ['fangfang', 'jianjian', 'aogao', 'yuanyuan', 'changchang'], 
    slots: [], 
    successMessage: '擃????嚗? 
  }
]; //
