import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Track = { title: string; src: string };

const playlist: Track[] = [
  { title: "Aakaasam Nee Haddhu Ra", src: "/music/aakaasam-nee-hadhu-ra.mp3" },
  { title: "Alone Pt. II", src: "/music/alone-pt-ii.mp3" },
  { title: "Daydream", src: "/music/daydream.mp3" },
  { title: "Hanuman Chalisa", src: "/music/hanuman-chalisa.mp3" },
  { title: "Human", src: "/music/Human.mp3" },
  { title: "Not Enough", src: "/music/not-Enough.mp3" },
  { title: "Pattudala", src: "/music/pattudala.mp3" },
  { title: "Quit Chyyarap", src: "/music/quit-Chyyarap.mp3" },
  { title: "The Hanging Tree", src: "/music/the-hanging-tree.mp3" },
  { title: "The Nights", src: "/music/the-Nights.mp3" },
];

function formatTime(time: number): string {
  if (!time || isNaN(time)) return "0:00";
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// Convert cover art from metadata → usable Blob
function pictureToBlob(pic: any): Blob | null {
  try {
    if (!pic || !pic.data) return null;
    let typed: Uint8Array | null = null;
    const d = pic.data;

    if (d instanceof Uint8Array) {
      typed = d;
    } else if (ArrayBuffer.isView(d)) {
      typed = new Uint8Array(d.buffer, d.byteOffset, d.byteLength);
    } else if (d instanceof ArrayBuffer) {
      typed = new Uint8Array(d);
    }

    if (!typed) return null;
    const mime = typeof pic.format === "string" && pic.format.includes("/")
      ? pic.format
      : "image/jpeg";

    // ✅ Cast typed → BlobPart so TS won't complain
    return new Blob([typed as BlobPart], { type: mime });
  } catch {
    return null;
  }
}


const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevBannerUrl = useRef<string | null>(null);

  const [index, setIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [artist, setArtist] = useState<string>("Unknown Artist");
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(true);

  const track = playlist[index];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let cancelled = false;

    setCurrentTime(0);
    setDuration(0);
    setArtist("Unknown Artist");

    // cleanup old cover
    if (prevBannerUrl.current) {
      URL.revokeObjectURL(prevBannerUrl.current);
      prevBannerUrl.current = null;
    }
    setBannerUrl(null);

    audio.src = track.src;
    audio.load();

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => {
      setIndex((i) => (i + 1) % playlist.length);
      setIsPlaying(true);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);

    (async () => {
      try {
        const mm = await import("music-metadata");
        const res = await fetch(track.src);
        const blob = await res.blob();
        const metadata = await mm.parseBlob(blob);

        if (cancelled) return;

        const common = metadata.common ?? {};
        setArtist(
          common.artist ||
            common.albumartist ||
            (Array.isArray(common.artists) ? common.artists.join(", ") : "Unknown Artist")
        );

        if (Array.isArray(common.picture) && common.picture.length > 0) {
  const blobFromPic = pictureToBlob(common.picture[0] as any);

          if (blobFromPic) {
            const url = URL.createObjectURL(blobFromPic);
            prevBannerUrl.current = url;
            setBannerUrl(url);
          }
        }
      } catch {
        setArtist("Unknown Artist");
        setBannerUrl(null);
      }
    })();

    if (isPlaying) audio.play().catch(() => setIsPlaying(false));

    return () => {
      cancelled = true;
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, [index, track.src, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    else audio.pause();
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const next = () => {
    setIndex((i) => (i + 1) % playlist.length);
    setIsPlaying(true);
  };
  const prev = () => {
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
    setCurrentTime(audio.currentTime || 0);
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative w-full rounded-2xl 
                 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0d0d0d] dark:to-[#171717] 
                 border border-blue-400 dark:border-[#00FFB3]/60 
                 shadow-[0_0_25px_rgba(59,130,246,0.5)] dark:shadow-[0_0_35px_#00FFB3] 
                 p-5"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-700 dark:text-gray-300">Now playing</div>
        <button
          aria-label="Close player"
          onClick={() => {
            setVisible(false);
            setIsPlaying(false);
          }}
          className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex gap-5 items-center">
        {/* Album Art Rotating */}
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
            duration: 12,
          }}
          className="w-28 h-28 rounded-full overflow-hidden 
                     border-4 border-blue-400 dark:border-[#00FFB3] 
                     shadow-[0_0_20px_rgba(59,130,246,0.6)] dark:shadow-[0_0_25px_#00FFB3]"
        >
          {bannerUrl ? (
            <img src={bannerUrl} alt={track.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-300 text-xl">
              🎵
            </div>
          )}
        </motion.div>

        {/* Song details */}
        <div className="flex-1">
          <h4 className="font-semibold text-lg line-clamp-1 text-gray-900 dark:text-white">
            {track.title}
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{artist}</div>

          {/* Progress bar */}
          <div className="mt-3">
            <div
              className="w-full h-1 bg-gray-300 dark:bg-gray-700/40 rounded-full cursor-pointer"
              onClick={seek}
            >
              <div
                className="h-1 bg-blue-500 dark:bg-[#00FFB3] rounded-full transition-all"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl"
            >
              ⏮
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full 
                         bg-blue-500/20 dark:bg-[#00FFB3]/20 
                         text-blue-500 dark:text-[#00FFB3] 
                         hover:bg-blue-500/30 dark:hover:bg-[#00FFB3]/30 
                         flex items-center justify-center text-2xl transition"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button
              onClick={next}
              className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-xl"
            >
              ⏭
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" />
    </motion.div>
  );
};

export default MusicPlayer;
