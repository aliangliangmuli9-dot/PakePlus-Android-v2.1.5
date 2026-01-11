
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, GameStatus, DifficultyConfig } from '../constants';
import { TileData } from '../types';
import Tile from './Tile';

interface BoardProps {
  status: GameStatus;
  difficulty: DifficultyConfig;
  imagePool: string[]; // 接收传入的 Base64 字符串数组
  onScoreUpdate: (score: number) => void;
}

const Board: React.FC<BoardProps> = ({ status, difficulty, imagePool, onScoreUpdate }) => {
  const [grid, setGrid] = useState<TileData[][]>([]);
  const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currentServants = useRef<string[]>([]);

  const initializeGrid = useCallback(() => {
    if (imagePool.length === 0) return;

    // 从传入的图片池中随机选出 N 种
    const shuffledPool = [...imagePool].sort(() => Math.random() - 0.5);
    currentServants.current = shuffledPool.slice(0, difficulty.tileTypes);

    const newGrid: TileData[][] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      newGrid[y] = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        let type: number;
        do {
          type = Math.floor(Math.random() * difficulty.tileTypes);
        } while (
          (x >= 2 && newGrid[y][x - 1].type === type && newGrid[y][x - 2].type === type) ||
          (y >= 2 && newGrid[y - 1][x].type === type && newGrid[y - 2][x].type === type)
        );

        newGrid[y][x] = {
          id: `${Date.now()}-${x}-${y}-${Math.random()}`,
          type,
          imageUrl: currentServants.current[type],
          x,
          y
        };
      }
    }
    setGrid(newGrid);
  }, [difficulty, imagePool]);

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      initializeGrid();
    }
  }, [status, initializeGrid]);

  const checkMatches = (currentGrid: TileData[][]) => {
    const matchedTiles = new Set<string>();
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE - 2; x++) {
        const type = currentGrid[y][x].type;
        if (type === currentGrid[y][x + 1].type && type === currentGrid[y][x + 2].type) {
          matchedTiles.add(`${x},${y}`); matchedTiles.add(`${x + 1},${y}`); matchedTiles.add(`${x + 2},${y}`);
        }
      }
    }
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE - 2; y++) {
        const type = currentGrid[y][x].type;
        if (type === currentGrid[y + 1][x].type && type === currentGrid[y + 2][x].type) {
          matchedTiles.add(`${x},${y}`); matchedTiles.add(`${x},${y + 1}`); matchedTiles.add(`${x},${y + 2}`);
        }
      }
    }
    return Array.from(matchedTiles).map(coord => {
      const [x, y] = coord.split(',').map(Number);
      return { x, y };
    });
  };

  const processGravityAndRefill = async (currentGrid: TileData[][]) => {
    const newGrid = currentGrid.map(row => row.map(tile => ({ ...tile })));
    const matches = checkMatches(newGrid);
    if (matches.length === 0) return false;

    onScoreUpdate(matches.length * 10);
    matches.forEach(({ x, y }) => { newGrid[y][x].isMatching = true; });
    setGrid([...newGrid]);
    await new Promise(resolve => setTimeout(resolve, 250));

    for (let x = 0; x < GRID_SIZE; x++) {
      let emptySlots = 0;
      for (let y = GRID_SIZE - 1; y >= 0; y--) {
        if (newGrid[y][x].isMatching) {
          emptySlots++;
        } else if (emptySlots > 0) {
          newGrid[y + emptySlots][x] = { ...newGrid[y][x], y: y + emptySlots };
          newGrid[y][x].isMatching = true;
        }
      }
      for (let y = 0; y < emptySlots; y++) {
        const type = Math.floor(Math.random() * difficulty.tileTypes);
        newGrid[y][x] = {
          id: `${Date.now()}-${x}-${y}-${Math.random()}`,
          type,
          imageUrl: currentServants.current[type],
          x,
          y
        };
      }
    }

    const finalGrid = newGrid.map(row => row.map(tile => ({ ...tile, isMatching: false })));
    setGrid(finalGrid);
    await new Promise(resolve => setTimeout(resolve, 200));
    await processGravityAndRefill(finalGrid);
    return true;
  };

  const handleTileClick = async (x: number, y: number) => {
    if (isProcessing || status !== GameStatus.PLAYING) return;
    if (!selected) {
      setSelected({ x, y });
    } else {
      const dx = Math.abs(selected.x - x);
      const dy = Math.abs(selected.y - y);
      if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
        setIsProcessing(true);
        const newGrid = grid.map(row => row.map(tile => ({ ...tile })));
        const t1 = { ...newGrid[y][x], x: selected.x, y: selected.y };
        const t2 = { ...newGrid[selected.y][selected.x], x, y };
        newGrid[y][x] = t2; newGrid[selected.y][selected.x] = t1;
        setGrid([...newGrid]);
        await new Promise(resolve => setTimeout(resolve, 200));
        if (checkMatches(newGrid).length > 0) {
          await processGravityAndRefill(newGrid);
        } else {
          setGrid(grid.map(row => row.map(tile => ({ ...tile }))));
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        setSelected(null);
        setIsProcessing(false);
      } else {
        setSelected({ x, y });
      }
    }
  };

  return (
    <div className="bg-black/30 p-2 md:p-3 rounded-xl shadow-2xl gold-border relative">
      <div 
        className="grid gap-1 md:gap-1.5"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          width: 'min(85vw, 480px)',
          height: 'min(85vw, 480px)'
        }}
      >
        {grid.map((row, y) => 
          row.map((tile, x) => (
            <Tile 
              key={tile.id} 
              tile={tile} 
              isSelected={selected?.x === x && selected?.y === y}
              onClick={() => handleTileClick(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
