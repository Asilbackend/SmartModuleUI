import Breadcrumbs from '@components/ui/Breadcrumbs';
import Header from '@components/ui/Header';
import Sidebar from '@components/ui/Sidebar';
import StoryCircle from '@components/ui/StoryCircle';
import { Outlet, useLocation } from 'react-router-dom';

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
            <div className='overflow-x-auto bg-white'>
              <div className='flex w-max gap-4 px-6 py-2'>
                {[...Array(10)].map((_, idx) => (
                  <div key={idx} className='flex-shrink-0'>
                    <StoryCircle imageSrc={storyImage} videoSrc={storyVideo} />
                  </div>
                ))}
              </div>
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
