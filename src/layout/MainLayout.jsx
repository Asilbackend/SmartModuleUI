import 'swiper/css';

// import Breadcrumbs from '@components/ui/Breadcrumbs';
import Header from '@components/ui/Header';
import Sidebar from '@components/ui/Sidebar';
import StorySection from '@components/ui/StorySection';
import { Outlet, useLocation } from 'react-router-dom';

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
          {!hideStoryCircle && <StorySection />}
          <div className='flex flex-col gap-2 px-2 pt-2 pb-1 md:px-10'>
            {/* <Breadcrumbs /> */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
