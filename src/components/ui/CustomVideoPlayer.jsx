import { useEffect, useRef, useState } from 'react';

const CustomVideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // ilk renderda aniqlash
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
        isMobile
          ? 'fixed inset-0 z-50 aspect-[9/16] bg-black' // fullscreen mobile
          : 'h-[183px] w-full max-w-[325px]'
      }`}
    >
      <video
        ref={videoRef}
        src={video}
        className='h-full w-full object-cover'
        onClick={isPlaying ? handlePause : handlePlay}
        controls={isPlaying && !isMobile}
        playsInline
      />

      {!isPlaying && (
        <button
          onClick={handlePlay}
          className='absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/50'
        >
          <svg
            className='h-16 w-16 text-white drop-shadow-2xl'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M8 5v14l11-7z' />
          </svg>
        </button>
      )}

      {/* Exit fullscreen tugmasi (faqat mobile) */}
      {isMobile && isPlaying && (
        <button
          onClick={handlePause}
          className='absolute top-6 right-6 rounded-full bg-black/50 p-2 text-white backdrop-blur-md hover:bg-black/70'
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
