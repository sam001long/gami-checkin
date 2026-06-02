import { Character } from '@/types/game';

export const characters: Character[] = [
  { 
    id: 'fangfang', name: '方方', faceShape: 'square', description: '最穩重的外星人，適合當基底。只要有他在，畫面就不會歪。', defaultPoseId: 'stand', unlockStars: 0, 
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/fangfang_stand.png' }, { id: 'squat', name: '蹲下', imageSrc: '/characters/fangfang_squat.png' }, { id: 'thumb', name: '比讚', imageSrc: '/characters/fangfang_thumb.png' }] 
  },
  { 
    id: 'jianjian', name: '尖尖', faceShape: 'triangle', description: '很高冷，頭很尖，總是容易戳到別人。排隊時最好讓他站後面。', defaultPoseId: 'stand', unlockStars: 0, 
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/jianjian_stand.png' }] 
  },
  { 
    id: 'aogao', name: '凹凹', faceShape: 'concave', description: '頭頂有個大凹槽，剛好可以卡住其他東西。是團隊裡的完美綠葉。', defaultPoseId: 'stand', unlockStars: 0, 
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/aogao_stand.png' }] 
  },
  { 
    id: 'yuanyuan', name: '圓圓', faceShape: 'circle', description: '圓滾滾的，走到哪滾到哪。拍照時總是不小心滾出鏡頭。', defaultPoseId: 'stand', unlockStars: 5, 
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/yuanyuan_stand.png' }] 
  },
  { 
    id: 'changchang', name: '長長', faceShape: 'long', description: '身高擔當，永遠在最後一排。只要他在前面，別人就別想入鏡了。', defaultPoseId: 'stand', unlockStars: 8, 
    poses: [{ id: 'stand', name: '站立', imageSrc: '/characters/changchang_stand.png' }] 
  }
];