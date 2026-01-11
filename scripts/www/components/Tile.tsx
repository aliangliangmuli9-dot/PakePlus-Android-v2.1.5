
import React, { useState } from 'react';
import { TileData } from '../types';

interface TileProps {
  tile: TileData;
  isSelected: boolean;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ tile, isSelected, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      onClick={onClick}
      className={`
        relative aspect-square cursor-pointer overflow-hidden rounded-md border-2
        transition-all duration-300
        ${isSelected ? 'border-yellow-400 scale-95 shadow-[0_0_15px_rgba(250,204,21,0.6)] z-20' : 'border-blue-900/40 hover:border-blue-400'}
        ${tile.isMatching ? 'match-animate' : ''}
        bg-slate-800 flex items-center justify-center
      `}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!hasError ? (
        <img 
          src={tile.imageUrl} 
          alt={`Servant`} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} pointer-events-none`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-red-400 bg-black/60 text-center p-1 font-bold">
          <i className="fa-solid fa-image-slash text-xs mb-1 opacity-50"></i>
          <span className="scale-75 uppercase">No Img</span>
        </div>
      )}
      
      {isSelected && (
        <div className="absolute inset-0 bg-yellow-400/10 animate-pulse pointer-events-none shadow-[inset_0_0_8px_rgba(250,204,21,0.4)]" />
      )}
      
      <div className="absolute inset-0 border-[1px] border-white/5 pointer-events-none"></div>
    </div>
  );
};

export default Tile;
