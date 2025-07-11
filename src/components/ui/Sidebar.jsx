import {
  AlignStartVertical,
  ArrowLeftToLine,
  House,
  Layers,
  Newspaper,
  Trophy,
  University,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const otherNavItems = [
    { name: 'Bosh sahifa', href: '/home', icon: <House /> },
    { name: 'Marifat darslari', href: '/enlightenment', icon: <University /> },
    { name: 'Modullar', href: '/modules', icon: <Layers /> },
    { name: 'Tavsiya qilingan modullar', href: '/recommended', icon: <AlignStartVertical /> },
    { name: 'Yangiliklar', href: '/news', icon: <Newspaper /> },
    { name: 'Sertifikatlar', href: '/certificates', icon: <Trophy /> },
    // { name: 'Profil', href: '/profile', icon: <UserRound /> },
  ];

  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`h-screen duration-200 ${isOpen ? 'w-64' : 'w-20'} `}>
      <nav className='space-y-3 px-4 pt-4'>
        <div className='mt-2 space-y-4'>
          {otherNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-xl transition-all duration-100 select-none hover:bg-[#F0F7FF] ${
                  isActive ? `${isOpen && 'ml-4'} bg-[#F0F7FF] shadow-xs` : ''
                }`
              }
            >
              <span className='text-xl'>{item.icon}</span>
              <p
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isOpen ? 'max-w-[200px] translate-x-0 opacity-100' : 'max-w-0 -translate-x-4 opacity-0'} `}
              >
                {item.name}
              </p>
              <p
                className={`${isOpen && 'hidden'} absolute left-18 max-w-[200px] scale-y-0 transform overflow-hidden rounded-md bg-white p-0 whitespace-nowrap shadow-xs duration-200 group-hover:scale-90 group-hover:p-2`}
              >
                {item.name}
              </p>
            </NavLink>
          ))}
          <div className={`flex items-center justify-between gap-2 ${!isOpen && 'flex-col gap-4'}`}>
            <NavLink
              to={'/profile'}
              className={({ isActive }) =>
                `group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xl transition-all duration-100 select-none hover:bg-[#F0F7FF] ${
                  isActive ? `${isOpen && 'ml-4'} bg-[#F0F7FF] shadow-xs` : ''
                }`
              }
            >
              <span className='text-xl'>
                <UserRound />
              </span>
              <p
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isOpen ? 'max-w-[200px] translate-x-0 opacity-100' : 'max-w-0 -translate-x-4 opacity-0'} `}
              >
                Profil
              </p>
              <p
                className={`${isOpen && 'hidden'} absolute left-18 max-w-[200px] scale-y-0 transform overflow-hidden rounded-md bg-white p-0 whitespace-nowrap shadow-xs duration-200 group-hover:scale-90 group-hover:p-2`}
              >
                Profil
              </p>
            </NavLink>
            <div className='flex items-center justify-end px-3'>
              <ArrowLeftToLine
                className={`cursor-pointer duration-200 ${!isOpen && 'rotate-180'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
