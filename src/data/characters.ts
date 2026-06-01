import { Character } from '@/types/game';

export const characters: Character[] = [
  {
    id: 'fangfang',
    name: '方方',
    faceShape: 'square',
    description: '穩定、適合前排中間。缺點是臉大容易擋人。',
    defaultPoseId: 'stand',
    poses: [
      { id: 'stand', name: '站立', imageSrc: '/characters/fangfang_stand.png', width: 100, height: 120, faceBox: { x: 10, y: 10, width: 80, height: 80 }, bodyBox: { x: 20, y: 90, width: 60, height: 30 } },
      { id: 'squat', name: '蹲下', imageSrc: '/characters/fangfang_squat.png', width: 100, height: 90, faceBox: { x: 10, y: 10, width: 80, height: 80 }, bodyBox: { x: 20, y: 60, width: 60, height: 30 } },
      { id: 'thumb', name: '比讚', imageSrc: '/characters/fangfang_thumb.png', width: 100, height: 120, faceBox: { x: 10, y: 10, width: 80, height: 80 }, bodyBox: { x: 10, y: 90, width: 80, height: 30 } }
    ]
  },
  {
    id: 'jianjian',
    name: '尖尖',
    faceShape: 'triangle',
    description: '適合後排上方補尖角輪廓。',
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/jianjian_stand.png', width: 90, height: 130, faceBox: { x: 10, y: 10, width: 70, height: 70 }, bodyBox: { x: 15, y: 80, width: 60, height: 50 } }]
  },
  {
    id: 'aogao',
    name: '凹凹',
    faceShape: 'concave',
    description: '可以讓其他角色卡進空隙。',
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/aogao_stand.png', width: 110, height: 120, faceBox: { x: 15, y: 10, width: 80, height: 70 }, bodyBox: { x: 20, y: 80, width: 70, height: 40 } }]
  },
  {
    id: 'yuanyuan',
    name: '圓圓',
    faceShape: 'circle',
    description: '可愛適合補空隙。不穩不能放邊邊。',
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/yuanyuan_stand.png', width: 90, height: 100, faceBox: { x: 10, y: 10, width: 70, height: 70 }, bodyBox: { x: 20, y: 80, width: 50, height: 20 } }]
  },
  {
    id: 'changchang',
    name: '長長',
    faceShape: 'long',
    description: '適合後排、可補高度。前排會擋地標。',
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/changchang_stand.png', width: 80, height: 160, faceBox: { x: 10, y: 10, width: 60, height: 100 }, bodyBox: { x: 15, y: 110, width: 50, height: 50 } }]
  }
];