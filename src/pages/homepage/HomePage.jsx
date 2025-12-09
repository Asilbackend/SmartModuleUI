import { useQuery } from '@tanstack/react-query';
import { Empty, Skeleton } from 'antd';
import { PlayCircle, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopVideos } from 'src/api/topVideos';

const VideoCard = ({ title, desc, img, required, avgRating }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className='group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] sm:rounded-3xl'>
      <div className='relative aspect-video w-full overflow-hidden'>
        {!loaded && !imageError && (
          <div className='absolute inset-0 z-10'>
            <Skeleton.Image active className='!h-full !w-full object-cover' />
          </div>
        )}

        {!imageError && (
          <img
            src={img}
            alt={title}
            onLoad={() => setLoaded(true)}
            onError={() => setImageError(true)}
            className={`h-full w-full object-cover transition-all duration-500 ${
              loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
            }`}
          />
        )}

        {imageError && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-100'>
            <span className='text-sm text-gray-400 sm:text-base'>Rasm yuklanmadi</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className='absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <PlayCircle size={48} strokeWidth={1.5} className='text-white sm:h-14 sm:w-14' />
        </div>

        {/* Required Badge */}
        {/* {required && (
          <div className='absolute top-2 right-2 flex items-center gap-1 rounded-full bg-red-600 px-1 py-0.5 text-xs font-semibold text-white backdrop-blur-sm sm:top-2 sm:right-3 sm:px-2 sm:py-1 sm:text-xs'>
            Majburiy
          </div>
        )} */}
      </div>

      <div className='space-y-2 p-3 sm:space-y-3 sm:p-4'>
        <h3 className='line-clamp-2 text-base leading-tight font-semibold text-gray-900 transition-colors group-hover:text-blue-600 sm:text-lg'>
          {title}
        </h3>
        <p className='line-clamp-2 text-xs leading-relaxed text-gray-600 sm:text-sm'>{desc}</p>

        <div className='flex items-center justify-between border-t border-gray-100 pt-2 sm:pt-3'>
          <div className='flex items-center gap-1 px-2 text-xs font-semibold text-gray-800 sm:text-sm'>
            <Star size={12} fill='currentColor' className='sm:h-3.5 sm:w-3.5' />
            {avgRating}
          </div>
          <span className='text-xs font-medium text-[#008CFF] sm:text-sm'>
            {required ? 'Majburiy modul' : 'Ixtiyoriy modul'}
          </span>
          {/* <div className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:h-8 sm:w-8'>
            <PlayCircle size={16} className='text-white sm:h-[18px] sm:w-[18px]' fill='white' />
          </div> */}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['topVideos'],
    queryFn: async () => {
      const res = await getTopVideos();
      return res.data.content || [];
    },
  });

  const videos = data || [];

  return (
    <div className='mx-auto w-full max-w-6xl p-3 sm:p-4'>
      <div className='space-y-4 sm:space-y-6'>
        {/* Hero Video Section */}
        <div className='rounded-2xl bg-white shadow-lg sm:rounded-3xl'>
          {/* Mobile Video */}
          <div className='block overflow-hidden rounded-2xl sm:hidden'>
            <video
              poster='/news-image.png'
              className='h-64 w-full object-cover'
              controls
              playsInline
              muted
              loop
            >
              <source src='/123.mp4' type='video/mp4' />
              Sizning brauzeringiz videoni qollab-quvvatlamaydi.
            </video>
          </div>

          {/* Desktop Video */}
          <div className='hidden overflow-hidden rounded-3xl sm:block'>
            <video
              poster='/news-image.png'
              className='h-[420px] w-full object-cover lg:h-[520px]'
              controls
            >
              <source src='/123.mp4' type='video/mp4' />
              Sizning brauzeringiz videoni qollab-quvvatlamaydi.
            </video>
          </div>

          {/* Video Info */}
          <div className='p-3 sm:p-4'>
            <div className='mb-2 flex items-center gap-2'>
              <PlayCircle size={16} className='text-blue-600 sm:h-[18px] sm:w-[18px]' />
              <h3 className='text-base font-bold text-[#013464] sm:text-lg'>Kirish videosi</h3>
            </div>
            <p className='text-xs text-gray-600 sm:text-sm'>
              Platforma bilan tanishish uchun ushbu videoni tomosha qiling
            </p>
          </div>
        </div>

        {/* Top Videos Section */}
        <div className='rounded-2xl bg-white p-3 shadow-lg sm:rounded-3xl sm:p-4'>
          {/* Header */}
          <div className='mb-4 sm:mb-6'>
            <div className='flex items-center gap-2'>
              <Star size={20} className='text-yellow-500 sm:h-6 sm:w-6' fill='currentColor' />
              <h2 className='text-xl font-bold text-[#013464] sm:text-2xl lg:text-3xl'>
                Top videolar
              </h2>
            </div>
            <div className='mt-2 h-1 w-12 rounded-full bg-[#008CFF] sm:w-16'></div>
          </div>

          {/* Loading State */}
          {isPending && (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className='overflow-hidden rounded-2xl bg-white shadow-lg sm:rounded-3xl'
                >
                  <Skeleton.Image active className='aspect-video !h-full !w-full object-cover' />
                  <div className='space-y-2 p-3 sm:space-y-3 sm:p-4'>
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='rounded-xl bg-gray-50 py-12 text-center sm:rounded-2xl sm:py-16'>
              <div className='mb-4 text-lg font-semibold text-red-500 sm:text-xl'>
                Xatolik yuz berdi
              </div>
              <p className='mb-6 text-sm text-gray-600 sm:text-base'>{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className='rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:px-8 sm:py-3 sm:text-base'
              >
                Qayta urinish
              </button>
            </div>
          )}

          {/* Videos Grid */}
          {!isPending && !error && videos.length > 0 && (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3'>
              {videos.map((item, index) => (
                <Link
                  to={`/modules/1/video/${item.attachmentId}`}
                  state={{ title: item.title }}
                  key={index}
                  className='block transition-transform duration-300 hover:-translate-y-1'
                >
                  <VideoCard
                    title={item.title}
                    desc={item.description}
                    img={item.thumbnailImageUrl}
                    required={item.required}
                    avgRating={item.avgRating}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isPending && !error && videos.length === 0 && (
            <div className='rounded-xl bg-gray-50 py-12 sm:rounded-2xl sm:py-16'>
              <Empty
                description={
                  <span className='text-sm text-gray-500 sm:text-base'>
                    Hozircha videolar mavjud emas
                  </span>
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
