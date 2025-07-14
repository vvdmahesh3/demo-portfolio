import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const playlist = [
  'Aakaasam Nee Hadhu Ra.mp3',
  'Alone, Pt. II.mp3',
  'Daydream.mp3',
  'Hanuman Chalisa .mp3',
  'Human.mp3',
  'Not Enough.mp3',
  'Pattudala.mp3',
  'Quit Chyyara.mp3',
  'The Hanging Tree.mp3',
  'The Nights.mp3',
];

const MusicPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [autoPlayTriggered, setAutoPlayTriggered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!autoPlayTriggered) {
        setAutoPlayTriggered(true);
        playAudio();
      }
    }, 120000); // 2 mins
    return () => clearTimeout(timer);
  }, [autoPlayTriggered]);

  const playAudio = () => {
    setIsPlaying(true);
    audioRef.current?.play();
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
  }, [currentTrack]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-xl p-6 shadow-xl backdrop-blur-lg w-full max-w-md mx-auto
        ${isPlaying ? 'border-2 border-accent animate-pulse-glow' : 'border border-gray-600'}
        bg-white/80 dark:bg-black/80 transition-colors duration-300
      `}
    >
      <h3 className="text-center text-lg text-gray-700 dark:text-gray-200 mb-1">🎧 Now Playing</h3>
      <p className="text-xl font-semibold text-accent text-center line-clamp-1">
        {playlist[currentTrack].replace('.mp3', '')}
      </p>

      <div className="flex justify-center items-center gap-6 mt-5">
        <button
          onClick={playPrevious}
          className="text-accent hover:scale-110 transition-transform text-2xl"
        >⏮️</button>

        <motion.button
          onClick={isPlaying ? pauseAudio : playAudio}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.15 }}
          className={`text-accent text-3xl px-4 py-2 rounded-full 
            ${isPlaying ? 'glow-play-button' : 'hover:bg-accent/20'}
          `}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.button>

        <button
          onClick={playNext}
          className="text-accent hover:scale-110 transition-transform text-2xl"
        >⏭️</button>
      </div>

      <audio ref={audioRef} src={`/music/${playlist[currentTrack]}`} loop />
    </motion.div>
  );
};

export default MusicPlayer;
