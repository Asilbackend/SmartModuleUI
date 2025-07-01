import Breadcrumbs from '@components/ui/Breadcrumbs';
import Header from '@components/ui/Header';
import Sidebar from '@components/ui/Sidebar';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
  return (
    <div className='flex'>
      <div className='fixed top-0 left-0 z-50 h-screen w-[250px] bg-white'>
        <Sidebar />
      </div>

      <div className='ml-[250px] flex min-h-screen flex-1 flex-col'>
        <div className='sticky top-0 z-40 bg-white'>
          <Header />
        </div>

        <main className='flex-1 overflow-y-auto bg-[#F0F7FF] px-12 pt-3 pb-12'>
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default MainLayout;
