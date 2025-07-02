import Breadcrumbs from '@components/ui/Breadcrumbs';
import Header from '@components/ui/Header';
import Sidebar from '@components/ui/Sidebar';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
    <div className='flex h-screen flex-col'>
      <div className='sticky top-0 z-60 w-full bg-white'>
        <Header />
      </div>
      <div className='flex flex-1 overflow-hidden'>
        <div className='h-screen'>
          <Sidebar />
        </div>
        <main className='flex-1 overflow-y-auto bg-[#F0F7FF] px-4 pt-3 pb-12 sm:px-8 md:px-12'>
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
