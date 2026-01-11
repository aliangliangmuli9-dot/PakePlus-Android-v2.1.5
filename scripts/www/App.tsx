
import React, { useState, useEffect, useRef } from 'react';
import { DIFFICULTIES, GameStatus, DifficultyConfig, NORMAL_IMAGES, HELL_IMAGES } from './constants';
import Board from './components/Board';
import UI from './components/UI';
import SettlementPoster from './components/SettlementPoster';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.START);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [difficulty, setDifficulty] = useState<DifficultyConfig>(DIFFICULTIES.NORMAL);
  const [isMuted, setIsMuted] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('fgo-match3-highscore') || '0');
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startGame = (diff: DifficultyConfig) => {
    setDifficulty(diff);
    setScore(0);
    setTimeLeft(diff.initialTime);
    setStatus(GameStatus.PLAYING);
    setShowPoster(false);
    
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audioRef.current.muted = newMutedState;
      if (!newMutedState) {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      }
    }
  };

  useEffect(() => {
    if (status === GameStatus.PLAYING && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && status === GameStatus.PLAYING) {
      setStatus(GameStatus.GAME_OVER);
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('fgo-match3-highscore', score.toString());
      }
    }
  }, [status, timeLeft, score, bestScore]);

  const currentPool = difficulty.id === 'NORMAL' ? NORMAL_IMAGES : HELL_IMAGES;

  return (
    <div className="min-h-screen bg-chaldea flex flex-col items-center justify-center p-4 text-white overflow-hidden select-none relative">
      <audio 
        ref={audioRef} 
        src="https://music.163.com/song/media/outer/url?id=1294910588.mp3" 
        loop 
        preload="auto"
      />

      <button 
        onClick={toggleMute}
        className="fixed top-4 right-4 z-[100] w-12 h-12 rounded-full bg-black/40 border border-yellow-600/50 flex items-center justify-center hover:scale-110 transition-transform shadow-lg backdrop-blur-sm"
      >
        <i className={`fa-solid ${isMuted ? 'fa-volume-xmark text-red-400' : 'fa-volume-high text-yellow-500'} text-xl`}></i>
      </button>

      <header className="mb-6 text-center">
        <h1 className="fgo-title text-4xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-600 drop-shadow-lg">
          武内脸消消乐
        </h1>
        <p className="text-yellow-600/60 text-xs tracking-widest mt-2 uppercase font-bold">Takeuchi-Face Logic Challenge</p>
      </header>

      <div className="relative">
        <Board 
          status={status} 
          difficulty={difficulty}
          imagePool={currentPool}
          onScoreUpdate={(s) => setScore(prev => prev + Math.floor(s * difficulty.multiplier))} 
        />

        {status === GameStatus.START && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center rounded-lg z-50 border-2 border-yellow-600/50 p-6 animate-in fade-in zoom-in duration-300">
            <h2 className="text-3xl font-bold mb-8 text-yellow-500 tracking-widest fgo-title italic">选择任务等级</h2>
            <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
              {Object.entries(DIFFICULTIES).map(([key, config]) => (
                <button 
                  key={key}
                  onClick={() => startGame(config)}
                  className={`px-6 py-5 bg-gradient-to-r ${config.color} rounded-lg border-2 border-white/20 font-bold text-xl hover:scale-105 transition-all shadow-xl active:scale-95 group relative overflow-hidden`}
                >
                  <span className="relative z-10">{config.label}</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {status === GameStatus.GAME_OVER && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center rounded-lg z-50 border-2 border-red-600/50 p-4">
            {!showPoster ? (
              <>
                <h2 className="text-4xl font-bold mb-2 text-red-500 fgo-title">MISSION OVER</h2>
                <div className="w-full max-w-xs bg-slate-900/50 border border-white/10 p-4 rounded-lg my-4 text-center">
                    <p className="text-sm text-blue-300 mb-1">难度：{difficulty.label}</p>
                    <p className="text-3xl font-bold text-yellow-400 font-mono">{score.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2">最高纪录: {bestScore}</p>
                </div>
                
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <button 
                    onClick={() => setShowPoster(true)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg font-bold text-lg hover:shadow-[0_0_20px_#b4975a] transition-all"
                  >
                    <i className="fa-solid fa-scroll mr-2"></i> 生成荣誉战报
                  </button>
                  <button 
                    onClick={() => setStatus(GameStatus.START)}
                    className="px-6 py-3 bg-slate-800 rounded-full border border-slate-600 font-bold text-lg hover:bg-slate-700 transition-colors"
                  >
                    重新出征
                  </button>
                </div>
              </>
            ) : (
              <SettlementPoster 
                score={score} 
                onClose={() => setShowPoster(false)} 
                difficulty={difficulty}
                imagePool={currentPool}
              />
            )}
          </div>
        )}
      </div>

      <UI 
        score={score} 
        timeLeft={timeLeft} 
        bestScore={bestScore} 
        difficultyLabel={difficulty.label} 
        initialTime={difficulty.initialTime}
      />
    </div>
  );
};

export default App;
