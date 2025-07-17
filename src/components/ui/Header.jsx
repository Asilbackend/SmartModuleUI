import { Checkbox, Dropdown, Input } from 'antd';
import { Bell, ChevronDown, House, Layers, Menu, University, UserRound, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/logo.svg';

const items = [
  { key: 'uz', label: 'UZ' },
  { key: 'ru', label: 'RU' },
  { key: 'en', label: 'EN' },
];

const NavItems = [
  { name: 'Bosh sahifa', href: '/home', icon: <House size={20} /> },
  { name: 'Marifat darslari', href: '/enlightenment', icon: <University size={20} /> },
  { name: 'Profil', href: '/profile', icon: <UserRound size={20} /> },
];

const moduleSubItems = [
  { name: 'Modul 1', id: 1 },
  { name: 'Modul 2', id: 2 },
  { name: 'Modul 3', id: 3 },
  { name: 'Modul 4', id: 4 },
];

const Header = () => {
  const [selectedLang, setSelectedLang] = useState('UZ');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const contentRef = useRef(null);

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLang(selectedItem.label);
    }
    setDropdownOpen(false);
  };

  return (
    <header className='w-full bg-white py-4 md:py-2'>
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

            <Bell className='text-[22px] text-[#172243]' />

            {/* MOBILE SIDEBAR */}
            <div
              className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className='flex items-center justify-between border-b p-4'>
                <div className='flex items-center gap-[6px]'>
                  <img src={logo} alt='Logo' className='h-12' />
                  <h3 className={`w-40 text-[9px] !font-medium text-[#172243]`}>
                    MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI
                  </h3>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} className='text-gray-700' />
                </button>
              </div>

              <nav className='space-y-3 p-4'>
                {NavItems.slice(0, 2).map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg p-2 text-gray-800 transition ${
                        isActive ? 'bg-[#F0F7FF]' : ''
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className='font-medium'>{item.name}</span>
                  </NavLink>
                ))}

                <div>
                  <button
                    onClick={() => setIsModulesOpen(!isModulesOpen)}
                    className='flex w-full items-center gap-3 rounded-lg p-2 text-gray-800 hover:bg-[#F0F7FF]'
                  >
                    <Layers size={20} />
                    <span className='font-medium'>Modullar</span>
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
                    }}
                    className='overflow-hidden transition-all duration-200 ease-in-out'
                  >
                    <div className='space-y-2 pt-1'>
                      {moduleSubItems.map((sub) => (
                        <NavLink
                          key={sub.id}
                          to={`/modules/${sub.id}`}
                          className={({ isActive }) =>
                            `flex items-center gap-2 rounded-lg px-4 py-2 text-base transition hover:bg-[#F0F7FF] ${
                              isActive ? 'bg-[#F0F7FF]' : ''
                            }`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          {({ isActive }) => (
                            <>
                              <Checkbox checked={isActive} className='my-custom-checkbox' />
                              <span>{sub.name}</span>
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <NavLink
                  to={'/profile'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg p-2 text-gray-800 transition ${
                      isActive ? 'bg-[#F0F7FF]' : ''
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <UserRound size={20} />
                  <span className='font-medium'>Profil</span>
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
