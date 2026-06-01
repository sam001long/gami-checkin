import { Character } from '@/types/game'; //

export const characters: Character[] = [
  {
    id: 'fangfang',
    name: '?寞',
    faceShape: 'square',
    description: '蝛拙?????葉?撩暺?之摰寞??犖??,
    defaultPoseId: 'stand',
    poses: [
      { id: 'stand', name: '蝡?', imageSrc: '/characters/fangfang_stand.png', width: 100, height: 120, faceBox: { x: 10, y: 10, width: 80, height: 80 }, bodyBox: { x: 20, y: 90, width: 60, height: 30 } },
      { id: 'squat', name: '頩脖?', imageSrc: '/characters/fangfang_squat.png', width: 100, height: 90, faceBox: { x: 10, y: 10, width: 80, height: 80 }, bodyBox: { x: 20, y: 60, width: 60, height: 30 } },
      { id: 'thumb', name: '瘥?', imageSrc: '/characters/fangfang_thumb.png', width: 100, height: 120, faceBox: { x: 10, y: 10, width: 80, height: 80 }, bodyBox: { x: 10, y: 90, width: 80, height: 30 } }
    ]
  },
  {
    id: 'jianjian',
    name: '撠?',
    faceShape: 'triangle',
    description: '?拙?敺?銝鋆?閫憚撱?,
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '蝡?', imageSrc: '/characters/jianjian_stand.png', width: 90, height: 130, faceBox: { x: 10, y: 10, width: 70, height: 70 }, bodyBox: { x: 15, y: 80, width: 60, height: 50 } }]
  },
  {
    id: 'aogao',
    name: '?孵',
    faceShape: 'concave',
    description: '?臭誑霈隞??脣?脩征??,
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '蝡?', imageSrc: '/characters/aogao_stand.png', width: 110, height: 120, faceBox: { x: 15, y: 10, width: 80, height: 70 }, bodyBox: { x: 20, y: 80, width: 70, height: 40 } }]
  },
  {
    id: 'yuanyuan',
    name: '??',
    faceShape: 'circle',
    description: '?舀??拙?鋆征??蝛拐??賣????,
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '蝡?', imageSrc: '/characters/yuanyuan_stand.png', width: 90, height: 100, faceBox: { x: 10, y: 10, width: 70, height: 70 }, bodyBox: { x: 20, y: 80, width: 50, height: 20 } }]
  },
  {
    id: 'changchang',
    name: '?琿',
    faceShape: 'long',
    description: '?拙?敺??鋆?摨艾????璅?,
    defaultPoseId: 'stand',
    poses: [{ id: 'stand', name: '蝡?', imageSrc: '/characters/changchang_stand.png', width: 80, height: 160, faceBox: { x: 10, y: 10, width: 60, height: 100 }, bodyBox: { x: 15, y: 110, width: 50, height: 50 } }]
  }
]; //
