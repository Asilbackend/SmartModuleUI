import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Eye, Heart, Share2, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsData, newsLike } from 'src/api/news-page-controller.api';

export default function MobileVideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [remainingTime, setRemainingTime] = useState('00:00');
  const { storyId } = useParams();
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: ['NewsData', storyId],
    queryFn: async () => {
      const res = await getNewsData(storyId);
      return res.data || {};
    },
    enabled: !!storyId,
  });

  const setLikeMutation = useMutation({
    mutationFn: () => newsLike(storyId),
    onSuccess: () => {
      queryClient.setQueryData(['NewsData', storyId], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          likeCount: oldData.likeCount + (oldData.isLiked ? -1 : 1),
          isLiked: !oldData.isLiked,
        };
      });
    },
  });

  // Format time helper function
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    if (!video || !video.duration) return;

    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);

    // Qolgan vaqt (kamayadi)
    const remaining = video.duration - video.currentTime;
    setRemainingTime(formatTime(remaining));
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleClose = () => {
    window.history.back();
  };

  // Share funksiyasi
  const handleShare = async () => {
    const shareData = {
      title: data?.title || 'Video',
      text: data?.description || "Videoni ko'ring!",
      url: window.location.href,
    };

    try {
      // Agar brauzer Web Share API ni qo'llab-quvvatlasa
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Video ulashildi!');
      } else {
        // Fallback: URLni clipboard ga nusxalash
        await navigator.clipboard.writeText(window.location.href);
        alert('Link nusxalandi! ✅');
      }
    } catch (err) {
      console.error('Ulashishda xatolik:', err);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Video yuklanganda total vaqtni o'rnatish
    const handleLoadedMetadata = () => {
      if (video.duration) {
        setRemainingTime(formatTime(video.duration));
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  if (error) {
    return (
      <div className='flex h-screen items-center justify-center bg-gradient-to-br from-red-950 to-black'>
        <div className='rounded-2xl border border-red-500/30 bg-red-500/20 px-6 py-4 backdrop-blur-xl'>
          <div className='font-medium text-red-400'>⚠️ Xatolik: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative mx-auto aspect-[9/16] h-full w-full overflow-hidden bg-black shadow-2xl sm:max-h-190 sm:max-w-sm'>
      {/* Video */}
      <video
        ref={videoRef}
        src={data?.videoUrl}
        className='h-full w-full cursor-pointer bg-black object-cover'
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Gradient Overlays */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30' />

      {/* Play button overlay with pulse animation */}
      {!isPlaying && (
        <div
          className='absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm'
          onClick={togglePlay}
        >
          <div className='relative'>
            <div className='absolute inset-0 animate-ping rounded-full bg-white/30' />
            <div className='relative rounded-full bg-white/90 p-6 shadow-2xl backdrop-blur-sm transition-transform hover:scale-110'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-black'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M8 5v14l11-7z' />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Modern Progress bar with glow */}
      <div className='absolute top-0 left-0 h-1 w-full bg-white/10'>
        <div
          className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 transition-all duration-800'
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Section - Title with glassmorphism */}
      <div className='absolute top-4 right-4 left-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex-1'>
            <div className='flex items-center gap-2'>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90'>
                <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-red-500' />
                {remainingTime}
              </span>
              <span className='inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90'>
                <Eye size={16} />
                <span className='text-xs'>{data?.seenCount}</span>
              </span>
            </div>
          </div>

          {/* Mute button */}
          <div className='flex items-center gap-2'>
            <button
              onClick={toggleMute}
              className='rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20'
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={handleClose}
              className='rounded-full bg-white/10 p-2.5 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95'
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Action Buttons - TikTok style */}
      <div className='absolute right-3 bottom-28 flex flex-col gap-3'>
        {/* Like */}
        <button
          onClick={() => setLikeMutation.mutate()}
          className='group flex flex-col items-center gap-1'
        >
          <div
            className={`rounded-full p-3 backdrop-blur-xl transition-all ${
              data?.isLiked ? 'scale-110 bg-red-500/90' : 'bg-black/40 hover:bg-black/60'
            }`}
          >
            <Heart
              size={26}
              className={`transition-all ${
                data?.isLiked ? 'fill-white stroke-white' : 'stroke-white group-hover:scale-110'
              }`}
            />
          </div>
          <span className='text-xs font-bold text-white drop-shadow-lg'>{data?.likeCount}</span>
        </button>

        {/* Share - ISHLATILADI */}
        <button onClick={handleShare} className='group flex flex-col items-center gap-1'>
          <div className='rounded-full bg-black/40 p-3 backdrop-blur-xl transition-all hover:scale-110 hover:bg-black/60 active:scale-95'>
            <Share2 size={26} className='stroke-white transition-transform group-hover:rotate-12' />
          </div>
        </button>
      </div>

      {/* Bottom Section - Description */}
      <div className='absolute right-0 bottom-0 left-0 px-4 pb-4'>
        {data?.description && (
          <div className='rounded-2xl border border-white/10 p-3 shadow-xl backdrop-blur-xl'>
            <h2 className='mb-1.5 text-lg leading-tight font-bold text-white'>{data?.title}</h2>
            <p className='line-clamp-3 text-sm leading-relaxed text-white/95'>{data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
