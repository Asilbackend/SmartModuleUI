import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Dropdown, Input, Spin } from 'antd';
import {
  Bell,
  BookCheck,
  ChevronDown,
  House,
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
  { name: 'Bosh sahifa', href: '/home', icon: <House size={20} /> },
  { name: 'Marifat darslari', href: '/enlightenment', icon: <BookCheck size={20} /> },
];

const Header = () => {
  const [selectedLang, setSelectedLang] = useState('UZ');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pushOpen, setpushOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
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

  const logOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className='w-full border-b border-gray-100 bg-white py-4 md:py-2'>
      <div className='px-6'>
        <div className='flex h-full items-center justify-between'>
          <div className='hidden items-center gap-[6px] lg:flex'>
            <img src={logo} alt='Logo' className='h-12' />
            <h3 className='w-40 text-[10px] font-medium text-[#172243]'>
              MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI
            </h3>
          </div>
          <button onClick={() => setIsOpen(true)} className='mr-4 text-gray-800 lg:hidden'>
            <Menu size={26} />
          </button>

          <Input
            size='large'
            placeholder='Qidiruv'
            prefix={<FiSearch size={22} color='#ACACAC' className='mx-0 lg:mx-1' />}
            className='mx-auto !rounded-3xl !border-none !bg-[#F0F7FF] !py-2 md:!w-[480px] md:!py-[4px] lg:!py-[10px] xl:!w-[600px]'
          />

          <div className='ml-4 flex items-center gap-2 lg:gap-[20px]'>
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              placement='bottomRight'
              open={dropdownOpen}
              onOpenChange={(visible) => setDropdownOpen(visible)}
              trigger={['click']}
            >
              <div className='flex cursor-pointer items-center gap-0.5 rounded-lg px-1 py-2'>
                <span className='text-[16px] font-semibold text-[#172243]'>{selectedLang}</span>
                <ChevronDown
                  className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </Dropdown>

            <Bell size={23} onClick={() => setpushOpen(true)} className='cursor-pointer' />

            <LogOut onClick={() => logOut()} size={22} className='cursor-pointer' />

            {/* Notification */}
            {pushOpen && (
              <div className='fixed top-16 right-14 z-50 w-80 rounded-lg bg-white p-4 shadow-sm'>
                <div className='mb-2 flex items-center justify-between'>
                  <span className='font-semibold text-[#172243]'>Push Notifications</span>
                  <button className='cursor-pointer' onClick={() => setpushOpen(false)}>
                    <X size={20} className='text-gray-700' />
                  </button>
                </div>
                <div className='text-sm text-gray-600'>
                  Sizda yangi bildirishnomalar mavjud emas
                </div>
              </div>
            )}

            {/* MOBILE SIDEBAR */}
            <div
              className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-[6px]'>
                  <img src={logo} alt='Logo' className='h-12' />
                  <h3 className='w-40 text-[9px] !font-medium text-[#172243]'>
                    MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI
                  </h3>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} className='text-gray-700' />
                </button>
              </div>

              <nav className='space-y-3 p-4'>
                {/* Bosh sahifa va Marifat darslari */}
                {NavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2 text-xl transition hover:bg-[#F0F7FF] ${
                        isActive ? 'bg-[#F0F7FF] shadow-xs' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}

                {/* Modullar */}
                <div>
                  <button
                    onClick={() => setIsModulesOpen(!isModulesOpen)}
                    className='flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xl transition hover:bg-[#F0F7FF]'
                  >
                    <Layers size={20} />
                    <span>Modullar</span>
                    <ChevronDown
                      className={`ml-auto transition-transform duration-200 ${
                        isModulesOpen ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </button>

                  <div
                    ref={contentRef}
                    style={{
                      height: isModulesOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                      maxHeight: isModulesOpen ? '380px' : '0px',
                      overflowY: 'auto',
                    }}
                    className='custom-scroll overflow-hidden scroll-auto transition-all duration-300 ease-in-out'
                  >
                    <div className='space-y-2 pt-1'>
                      {isPending && (
                        <span className='flex justify-center px-4 py-2'>
                          <Spin indicator={<LoadingOutlined spin />} />
                        </span>
                      )}

                      {error && <p className='px-4 py-2 text-sm text-red-500'>Xatolik</p>}

                      {!isPending && !error && modules.length === 0 && (
                        <p className='px-4 py-2 text-sm text-gray-500'>Modullar topilmadi</p>
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
                              `mr-2 flex items-center gap-2 rounded-lg px-3 py-2 text-base transition hover:bg-[#F0F7FF] ${
                                isActive ? 'bg-[#F0F7FF] shadow-xs' : ''
                              }`
                            }
                            onClick={() => setIsOpen(false)}
                          >
                            {({ isActive }) => (
                              <>
                                <Checkbox checked={isActive} className='my-custom-checkbox' />
                                <span>{mod.name}</span>
                              </>
                            )}
                          </NavLink>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Profil */}
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2 text-xl transition hover:bg-[#F0F7FF] ${
                      isActive ? 'bg-[#F0F7FF] shadow-xs' : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <UserRound size={20} />
                  <span>Profil</span>
                </NavLink>
              </nav>
            </div>

            {/* Overlay */}
            {isOpen && (
              <div className='fixed inset-0 z-40 bg-black/20' onClick={() => setIsOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
