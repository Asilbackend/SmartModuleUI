import { Dropdown, Input } from 'antd';
import { Bell } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import {
  AlignStartVertical,
  House,
  Layers,
  Menu,
  Newspaper,
  Trophy,
  University,
  UserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';
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
  { name: 'Modullar', href: '/modules', icon: <Layers size={20} /> },
  {
    name: 'Tavsiya qilingan modullar',
    href: '/recommended',
    icon: <AlignStartVertical size={20} />,
  },
  { name: 'Yangiliklar', href: '/news', icon: <Newspaper size={20} /> },
  { name: 'Sertifikatlar', href: '/certificates', icon: <Trophy size={20} /> },
  { name: 'Profil', href: '/profile', icon: <UserRound size={20} /> },
];

const Header = () => {
  const [selectedLang, setSelectedLang] = useState('UZ');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          <div className='hidden items-center justify-between gap-[6px] lg:flex'>
            <img src={logo} alt='Logo' className='h-12' />
            <h3 className={`w-40 text-[10px] !font-medium text-[#172243]`}>
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

          <div className='ml-4 flex items-center justify-center gap-2 sm:ml-2 lg:ml-0 lg:gap-[20px]'>
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              placement='bottomRight'
              open={dropdownOpen}
              onOpenChange={(visible) => setDropdownOpen(visible)}
              trigger={['click']}
            >
              <div className='flex cursor-pointer items-center gap-0.5 rounded-lg px-1 py-2 transition-all duration-300 md:gap-2'>
                <span className='text-[16px] font-semibold text-[#172243]'>{selectedLang}</span>
                <span
                  className={`transform transition-transform duration-300 ease-in-out ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className='text-[14px] text-gray-800' />
                </span>
              </div>
            </Dropdown>
            <div className='relative cursor-pointer'>
              <Bell className='text-[22px] !text-[#172243]' />
              {/* <span className='absolute -top-1 -right-1 rounded-full bg-red-500 px-[6px] text-[10px] text-white'>
                3
              </span> */}
            </div>

            <div
              className={`fixed top-0 left-0 z-50 h-full w-68 transform bg-white shadow-lg transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className='flex items-center justify-between border-b p-4'>
                <div className='flex items-center justify-between gap-[6px]'>
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
                {NavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg p-2 text-gray-800 transition ${isActive ? 'bg-[#F0F7FF]' : ''}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className='font-medium'>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
