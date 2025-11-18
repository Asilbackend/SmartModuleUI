import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopVideos } from 'src/api/topVideos';

const VideoCard = ({ title, desc, img, required }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className='group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98] sm:rounded-3xl'>
      <div className='relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl'>
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
            className={`h-full w-full object-cover transition-all duration-500 ${loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'} `}
          />
        )}

        {imageError && (
          <div className='absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-200 sm:rounded-3xl'>
            <span className='text-gray-500'>Rasm yuklanmadi</span>
          </div>
        )}
      </div>

      <div className='space-y-2 p-4 sm:space-y-3 sm:p-5'>
        <h3 className='line-clamp-2 text-base leading-tight font-semibold text-gray-900 sm:text-lg'>
          {title}
        </h3>
        <p className='line-clamp-2 text-sm leading-relaxed text-gray-600 sm:text-base'>{desc}</p>

        <div className='flex items-center justify-between pt-2'>
          <span className='text-sm font-medium text-[#008CFF] sm:text-base'>
            {required ? 'Majburiy' : 'Ixtiyoriy'}
          </span>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#008CFF] opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
            <svg className='h-4 w-4 text-white' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M8 5v14l11-7z' />
            </svg>
          </div>
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
    <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
      {/* Hero Video Section */}
      <div className='mb-6 block sm:hidden'>
        <video
          poster='/news-image.png'
          className='h-64 w-full rounded-2xl object-cover shadow-md'
          controls
          playsInline
          muted
          loop
        >
          <source src='/123.mp4' type='video/mp4' />
          Sizning brauzeringiz videoni qo‘llab-quvvatlamaydi.
        </video>
      </div>

      {/* DESKTOP: katta video */}
      <div className='hidden sm:block'>
        <video
          poster='/news-image.png'
          className='mb-10 h-[520px] w-full rounded-3xl object-cover shadow-md'
          controls
        >
          <source src='/123.mp4' type='video/mp4' />
          Sizning brauzeringiz videoni qo‘llab-quvvatlamaydi.
        </video>
      </div>

      {/* Top Videos Section */}
      <section>
        {/* Header */}
        <div className='mb-6 sm:mb-8 lg:mb-10'>
          <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl'>Top videolar</h2>
          <div className='mt-2 h-1 w-12 rounded-full bg-[#008CFF]'></div>
        </div>

        {/* Videos Grid */}
        <div className='mb-16 sm:mb-20'>
          {isPending && (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8'>
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className='group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm sm:rounded-3xl'
                >
                  <div className='flex aspect-video w-full items-center justify-center rounded-2xl bg-gray-100 sm:rounded-3xl'>
                    <Skeleton.Image active className='!h-full !w-full object-cover' />
                  </div>
                  <div className='space-y-2 p-4 sm:space-y-3 sm:p-5'>
                    <Skeleton active className='!w-full !max-w-[384px]' />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className='py-8 text-center sm:py-12'>
              <div className='mb-4 text-lg text-red-500 sm:text-xl'>Xatolik yuz berdi</div>
              <p className='mb-4 text-sm text-gray-600 sm:text-base'>{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className='rounded-lg bg-[#008CFF] px-6 py-2 text-white transition-colors hover:bg-blue-600'
              >
                Qayta urinish
              </button>
            </div>
          )}

          {!isPending && !error && (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8'>
              {videos.map((item, index) => (
                <Link
                  to={`/modules/1/video/${item.attachmentId}`}
                  key={index}
                  className='block transition-transform duration-300 hover:-translate-y-1'
                >
                  <VideoCard
                    title={item.title}
                    desc={item.description}
                    img={item.thumbnailImageUrl}
                    required={item.required}
                  />
                </Link>
              ))}
            </div>
          )}

          {!isPending && !error && videos.length === 0 && (
            <div className='py-8 text-center sm:py-12'>
              <div className='text-lg text-gray-500 sm:text-xl'>Hech qanday video topilmadi</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
