
export interface TileData {
  id: string;
  type: number;
  imageUrl: string;
  x: number;
  y: number;
  isMatching?: boolean;
}

export interface GameState {
  grid: TileData[][];
  score: number;
  timeLeft: number;
  moves: number;
  selectedTile: { x: number; y: number } | null;
}
