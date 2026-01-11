
import React from 'react';

interface UIProps {
  score: number;
  timeLeft: number;
  bestScore: number;
  difficultyLabel: string;
  initialTime: number;
}

const UI: React.FC<UIProps> = ({ score, timeLeft, bestScore, difficultyLabel, initialTime }) => {
  const isHell = difficultyLabel.includes('地狱');
  
  return (
    <div className="w-full max-w-[500px] mt-8 grid grid-cols-3 gap-4">
      {/* High Score */}
      <div className="bg-black/40 border border-yellow-600/30 p-3 rounded-lg text-center flex flex-col justify-center">
        <span className="text-[10px] uppercase tracking-tighter text-yellow-500 font-bold opacity-70">最高纪录</span>
        <span className="text-xl md:text-2xl font-bold font-mono">{bestScore.toLocaleString()}</span>
      </div>

      {/* Timer */}
      <div className="bg-black/40 border border-blue-500/30 p-3 rounded-lg text-center flex flex-col justify-center overflow-hidden relative">
        <span className="text-[10px] uppercase tracking-tighter text-blue-400 font-bold opacity-70">剩余时间</span>
        <span className={`text-xl md:text-2xl font-bold font-mono ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-blue-200'}`}>
          {timeLeft}秒
        </span>
        <div 
          className="absolute bottom-0 left-0 h-1 bg-blue-500/50 transition-all duration-300" 
          style={{ width: `${(timeLeft / initialTime) * 100}%` }}
        />
      </div>

      {/* Score */}
      <div className="bg-black/40 border border-yellow-600/30 p-3 rounded-lg text-center flex flex-col justify-center">
        <span className="text-[10px] uppercase tracking-tighter text-yellow-500 font-bold opacity-70">当前得分</span>
        <span className="text-xl md:text-2xl font-bold font-mono text-yellow-400">{score.toLocaleString()}</span>
      </div>
      
      {/* Difficulty Info */}
      <div className="col-span-3 flex justify-between items-center px-4 py-2 bg-blue-900/20 rounded-lg border border-white/10 mt-2">
        <div className="flex gap-2 items-center">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isHell ? 'bg-red-500 shadow-[0_0_8px_red]' : 'bg-blue-500 shadow-[0_0_8px_blue]'}`}></div>
          <span className={`text-xs uppercase tracking-widest font-bold ${isHell ? 'text-red-400' : 'text-blue-300'}`}>难度: {difficultyLabel}</span>
        </div>
        <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
                <i key={i} className={`fa-solid fa-star text-[10px] ${i < (isHell ? 5 : 3) ? (isHell ? 'text-red-500' : 'text-yellow-500') : 'text-gray-600'}`}></i>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UI;
