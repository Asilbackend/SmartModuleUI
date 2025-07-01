import { useRef, useState } from 'react';

const CustomVideoPlayer = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className='relative h-[183px] w-full max-w-[325px] overflow-hidden rounded-lg'>
      <video
        ref={videoRef}
        src={video}
        className='h-full w-full object-cover'
        controls={isPlaying}
      />

      {!isPlaying && (
        <button
          onClick={handlePlay}
          className='absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/50'
        >
          <svg className='h-12 w-12 text-white' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M8 5v14l11-7z' />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CustomVideoPlayer;
