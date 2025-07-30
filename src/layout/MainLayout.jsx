import 'swiper/css';

import Breadcrumbs from '@components/ui/Breadcrumbs';
import Header from '@components/ui/Header';
import Sidebar from '@components/ui/Sidebar';
import StoryCircle from '@components/ui/StoryCircle';
import { Outlet, useLocation } from 'react-router-dom';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import storyVideo from '/123.mp4';

import storyImage from '../assets/tatu.png';
const MainLayout = () => {
  const location = useLocation();

  // Agar `/modules/:id` bo‘lsa, StoryCircle chiqmasin
  const hideStoryCircle = location.pathname.startsWith('/modules');

  return (
    <div className='flex h-screen flex-col'>
      <div className='sticky top-0 z-60 w-full bg-white'>
        <Header />
      </div>
      <div className='flex flex-1 overflow-hidden'>
        <div className='hidden h-screen lg:block'>
          <Sidebar />
        </div>
        <main className='flex-1 overflow-y-auto bg-[#F0F7FF]'>
          {/* StoryCircle faqat kerak bo‘lsa */}
          {!hideStoryCircle && (
            <div className='relative bg-white pl-3 select-none sm:pl-4'>
              {/* Scrollable qism */}
              <Swiper
                slidesPerView='auto'
                spaceBetween={4}
                freeMode={true}
                modules={[FreeMode]}
                className='px-6 pb-2'
              >
                {[...Array(20)].map((_, idx) => (
                  <SwiperSlide key={idx} className='!w-auto flex-shrink-0'>
                    <StoryCircle imageSrc={storyImage} videoSrc={storyVideo} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Gradient overlay: scrollable qismdan tashqarida */}
              <div className='pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-r from-transparent to-white sm:w-40'></div>
            </div>
          )}
          <div className='flex flex-col gap-2 px-4 pt-3 pb-12 sm:gap-4 sm:px-8 md:gap-6 md:px-12'>
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
