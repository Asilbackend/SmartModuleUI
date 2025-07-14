import { Heart, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function MobileVideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((err) => console.error('Play error:', err));
    } else {
      video.pause();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div className='relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-lg bg-black'>
      {/* Video */}
      <video
        ref={videoRef}
        src='/123.mp4'
        className='h-full w-full cursor-pointer bg-black object-contain'
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Overlay Play */}
      {!isPlaying && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-black/30'
          onClick={togglePlay}
        >
          <svg
            xmlns='/image.png'
            className='h-16 w-16 text-white'
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <path d='M8 5v14l11-7z' />
          </svg>
        </div>
      )}

      {/* Progress Bar */}
      <div className='absolute top-0 left-0 h-1 w-full bg-white/20'>
        <div className='h-full bg-blue-500' style={{ width: `${progress}%` }} />
      </div>

      {/* Top Info */}
      <div className='absolute top-4 left-4 text-white'>
        <div className='flex items-center gap-2'>
          <img src='/image.png' alt='Avatar' className='h-12 w-12 rounded-full' />
          <div>
            <span className='font-semibold'>Yoqubjonov Abubakir</span>
            <div className='mt-1 text-xs opacity-80'>Video 2:55</div>
          </div>
        </div>
      </div>

      {/* Volume Button */}
      <button
        onClick={toggleMute}
        className='absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white'
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Bottom Actions */}
      <div className='absolute bottom-4 left-0 w-full px-6 text-white'>
        <button onClick={toggleLike} className='flex items-center gap-1'>
          <Heart size={24} className={liked ? 'fill-red-500 stroke-red-500' : ''} />
          <span>{liked ? 'Yoqdi' : 'Yoqmadi'}</span>
        </button>
      </div>
    </div>
  );
}
