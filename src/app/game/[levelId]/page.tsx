import { levels } from '@/data/levels';
import { notFound } from 'next/navigation';
import GameBoard from './GameBoard';

export default async function GamePage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = await params;
  const level = levels.find((l) => l.id === levelId);

  if (!level) notFound();

  // 將資料傳給處理拖曳邏輯的客戶端元件
  return <GameBoard level={level} />;
}