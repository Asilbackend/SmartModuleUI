import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStories } from 'src/api/news-page-controller.api';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function StorySection() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [playingId, setPlayingId] = useState(null);

  const { data, isPending } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await getStories();
      const stories = res.data || [];
      // Ko‘rilmaganlar boshida, ko‘rilganlar oxirida
      return stories.sort((a, b) => Number(a.isSeen) - Number(b.isSeen));
    },
  });

  const handleClick = (story) => {
    if (playingId === story.newsId) return;

    setPlayingId(story.newsId);

    // Mahalliy kechani yangilaymiz (isSeen true bo‘lsin)
    // queryClient.setQueryData(['stories'], (oldData) => {
    //   if (!oldData) return oldData;
    //   return oldData
    //     .map((s) => (s.newsId === story.newsId ? { ...s, isSeen: true } : s))
    //     .sort((a, b) => Number(a.isSeen) - Number(b.isSeen));
    // });

    // 1 soniya animatsiyadan so‘ng navigatsiya va kesheni yangilash
    setTimeout(() => {
      navigate(`/news/${story.newsId}`);
      queryClient.invalidateQueries(['stories']);
      setPlayingId(null);
    }, 1000);
  };

  const circleLength = 2 * Math.PI * 50;

  return (
    <div className='relative bg-white pl-3 select-none sm:pl-4'>
      <Swiper
        slidesPerView='auto'
        spaceBetween={4}
        freeMode={true}
        modules={[FreeMode]}
        className='px-6 pb-2'
      >
        {isPending
          ? Array.from({ length: 20 }).map((_, idx) => (
              <SwiperSlide key={idx} className='!w-auto flex-shrink-0'>
                <div className='flex flex-col items-center'>
                  <Skeleton.Avatar active size={64} shape='circle' className='mx-1 my-1' />
                </div>
              </SwiperSlide>
            ))
          : data?.map((story, idx) => {
              const isPlaying = playingId === story.newsId;
              return (
                <SwiperSlide key={idx} className='!w-auto flex-shrink-0'>
                  <div className='flex flex-col items-center'>
                    <div
                      className='relative h-20 w-20 cursor-pointer sm:h-22 sm:w-22'
                      onClick={() => handleClick(story)}
                    >
                      {story.thumbNailUrl && (
                        <svg className='absolute inset-0' viewBox='0 0 120 120'>
                          <circle
                            cx='60'
                            cy='60'
                            r='50'
                            strokeWidth='5'
                            fill='none'
                            stroke={story.isSeen ? 'rgb(192, 192, 192)' : '#3B82F6'}
                          />
                          <circle
                            cx='60'
                            cy='60'
                            r='50'
                            strokeWidth='4'
                            fill='none'
                            stroke='#eee'
                            strokeDasharray={`${circleLength} ${circleLength}`}
                            strokeDashoffset={isPlaying ? 0 : circleLength}
                            style={{
                              transition: 'stroke-dashoffset 1s linear',
                              transform: 'rotate(-90deg)',
                              transformOrigin: '50% 50%',
                            }}
                          />
                        </svg>
                      )}

                      <img
                        src={story.thumbNailUrl}
                        className='absolute inset-0 m-auto h-[80%] w-[80%] rounded-full object-cover'
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>

      {/* Gradient overlay */}
      <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-r from-transparent to-white sm:w-40'></div>
    </div>
  );
}

export default StorySection;
