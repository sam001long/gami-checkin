export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
}; //

export type CharacterPose = {
  id: string;
  name: string;
  imageSrc: string;
  width: number;
  height: number;
  faceBox: Rect;
  bodyBox: Rect;
}; //

export type Character = {
  id: string;
  name: string;
  faceShape: 'square' | 'triangle' | 'concave' | 'circle' | 'long';
  description: string;
  defaultPoseId: string;
  poses: CharacterPose[];
}; //

export type LevelSlot = {
  id: string;
  x: number;
  y: number;
  row: 'front' | 'back';
  allowedCharacterIds: string[];
  allowedPoseIds?: string[];
  tolerance: number;
  required: boolean;
}; //

export type Level = {
  id: string;
  title: string;
  subtitle: string;
  backgroundSrc: string;
  frame: Rect;
  landmarkSafeAreas: Rect[];
  characters: string[];
  slots: LevelSlot[];
  timeLimitSec?: number;
  moveLimit?: number;
  successMessage: string;
}; //
