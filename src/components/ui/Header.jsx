import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Dropdown, Empty, Input, Spin } from 'antd';
import {
  AlertTriangle,
  Bell,
  BookCheck,
  ChevronDown,
  Home,
  Layers,
  LogOut,
  Menu,
  UserRound,
  X,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllModules } from 'src/api/modules.api';

import logo from '@/assets/logo.svg';

const items = [
  { key: 'uz', label: 'UZ' },
  { key: 'ru', label: 'RU' },
  { key: 'en', label: 'EN' },
];

const NavItems = [
  { name: 'Bosh sahifa', href: '/home', icon: <Home size={20} /> },
  { name: 'Marifat darslari', href: '/enlightenment', icon: <BookCheck size={20} /> },
];

const Header = () => {
  const [selectedLang, setSelectedLang] = useState('UZ');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pushOpen, setpushOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const contentRef = useRef(null);

  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const response = await getAllModules();
      return response.data.content || [];
    },
  });

  const modules = data || [];

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLang(selectedItem.label);
    }
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <header className='sticky top-0 z-40 w-full border-b border-gray-100 bg-white'>
        <div className='px-3 py-3 sm:px-6 sm:py-2'>
          <div className='flex items-center justify-between gap-4'>
            {/* Logo - Desktop */}
            <div className='hidden items-center gap-2 lg:flex'>
              <img src={logo} alt='Logo' className='h-11' />
              <h3 className='w-40 text-[10px] leading-tight font-semibold text-[#013464]'>
                MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI
              </h3>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className='rounded-xl p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden'
            >
              <Menu size={24} />
            </button>

            {/* Search Bar */}
            <Input
              size='large'
              placeholder='Qidiruv...'
              prefix={<FiSearch size={20} color='#9CA3AF' />}
              className='mx-auto !rounded-2xl !border-none !bg-[#F0F7FF] !py-2.5 md:!w-[480px] lg:!py-3 xl:!w-[600px]'
            />

            {/* Right Section */}
            <div className='flex items-center gap-2 sm:gap-4'>
              {/* Language Dropdown */}
              <Dropdown
                menu={{ items, onClick: handleMenuClick }}
                placement='bottomRight'
                open={dropdownOpen}
                onOpenChange={(visible) => setDropdownOpen(visible)}
                trigger={['click']}
              >
                <button className='flex items-center gap-1 rounded-xl px-2 py-1.5 font-semibold text-[#013464] transition-colors hover:bg-gray-100 sm:px-3 sm:py-2'>
                  <span className='text-sm sm:text-base'>{selectedLang}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </Dropdown>

              {/* Notifications */}
              <button
                onClick={() => setpushOpen(true)}
                className='relative rounded-xl p-2 text-gray-700 transition-colors hover:bg-gray-100'
              >
                <Bell size={22} />
                <span className='absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500'></span>
              </button>

              {/* Logout */}
              <button
                onClick={handleLogoutClick}
                className='rounded-xl p-2 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600'
              >
                <LogOut size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      {pushOpen && (
        <>
          <div className='fixed inset-0 z-40 bg-black/20' onClick={() => setpushOpen(false)}></div>
          <div className='fixed top-20 right-4 z-50 w-80 rounded-2xl bg-white p-4 shadow-2xl sm:right-8 sm:w-96'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Bell size={20} className='text-blue-600' />
                <span className='font-bold text-[#013464]'>Bildirishnomalar</span>
              </div>
              <button
                className='rounded-lg p-1 transition-colors hover:bg-gray-100'
                onClick={() => setpushOpen(false)}
              >
                <X size={20} className='text-gray-700' />
              </button>
            </div>
            <div className='rounded-xl bg-gray-50 p-8 text-center'>
              <Bell size={32} className='mx-auto mb-2 text-gray-300' />
              <p className='text-sm text-gray-500'>Yangi bildirishnomalar yoq</p>
            </div>
          </div>
        </>
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 transform overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className='sticky top-0 z-10 border-b border-gray-100 bg-white p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img src={logo} alt='Logo' className='h-10' />
              <h3 className='w-36 text-[9px] leading-tight font-semibold text-[#013464]'>
                MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className='rounded-lg p-1.5 transition-colors hover:bg-gray-100'
            >
              <X size={22} className='text-gray-700' />
            </button>
          </div>
        </div>

        {/* Sidebar Content */}
        <nav className='space-y-1 p-3'>
          {NavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                  isActive
                    ? 'bg-[#F0F7FF] text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className='absolute left-0 h-8 w-1 rounded-r-full bg-blue-600' />
                  )}
                  {item.icon}
                  <span className='font-medium'>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Modullar Accordion */}
          <div className='pt-2'>
            <button
              onClick={() => setIsModulesOpen(!isModulesOpen)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                isModulesOpen ? 'bg-[#F0F7FF] text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Layers size={20} />
              <span className='font-medium'>Modullar</span>
              <ChevronDown
                className={`ml-auto transition-transform duration-300 ${
                  isModulesOpen ? 'rotate-180' : ''
                }`}
                size={18}
              />
            </button>

            <div
              ref={contentRef}
              style={{
                height: isModulesOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                maxHeight: isModulesOpen ? '400px' : '0px',
              }}
              className='custom-scroll overflow-hidden overflow-y-auto transition-all duration-300'
            >
              <div className='space-y-1 py-2'>
                {isPending && (
                  <div className='flex justify-center py-4'>
                    <Spin indicator={<LoadingOutlined spin />} size='small' />
                  </div>
                )}

                {error && (
                  <div className='rounded-lg bg-red-50 px-3 py-2'>
                    <p className='text-xs text-red-600'>Xatolik yuz berdi</p>
                  </div>
                )}

                {!isPending && !error && modules.length === 0 && (
                  <div className='py-4'>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<span className='text-xs text-gray-500'>Modullar yoq</span>}
                    />
                  </div>
                )}

                {!isPending &&
                  !error &&
                  modules.length > 0 &&
                  modules.map((mod) => (
                    <NavLink
                      key={mod.id}
                      state={{ title: mod.name, desc: mod.description }}
                      to={`/modules/${mod.id}`}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                          isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {({ isActive }) => (
                        <>
                          <Checkbox
                            checked={isActive}
                            className='my-custom-checkbox pointer-events-none'
                          />
                          <span className='truncate font-medium'>{mod.name}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
              </div>
            </div>
          </div>

          {/* Profil */}
          <div className='border-t border-gray-100 pt-2'>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                  isActive
                    ? 'bg-[#F0F7FF] text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className='absolute left-0 h-8 w-1 rounded-r-full bg-blue-600' />
                  )}
                  <UserRound size={20} />
                  <span className='font-medium'>Profil</span>
                </>
              )}
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {logoutModalOpen && (
        <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
          <div className='animate-in fade-in zoom-in w-full max-w-md duration-200'>
            <div className='rounded-2xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8'>
              <div className='mb-6 flex items-center justify-center'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100 sm:h-20 sm:w-20'>
                  <AlertTriangle size={36} className='text-red-600 sm:h-10 sm:w-10' />
                </div>
              </div>

              <h2 className='mb-3 text-center text-xl font-bold text-[#013464] sm:text-2xl'>
                Tizimdan chiqish
              </h2>
              <p className='mb-8 text-center text-sm text-gray-600 sm:text-base'>
                Rostdan ham tizimdan chiqmoqchimisiz? Qayta kirish uchun login va parolingizni
                kiritishingiz kerak boladi.
              </p>

              <div className='flex gap-3'>
                <button
                  onClick={cancelLogout}
                  className='flex-1 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95'
                >
                  Bekor qilish
                </button>
                <button
                  onClick={confirmLogout}
                  className='flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl active:scale-95'
                >
                  Chiqish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
