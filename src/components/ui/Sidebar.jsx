import {
  AlignStartVertical,
  House,
  Layers,
  Newspaper,
  Trophy,
  University,
  UserRound,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import logo from './../../assets/Logo (2).svg';

const Sidebar = () => {
  const otherNavItems = [
    { name: 'Modullar', href: '/modules', icon: <Layers /> },
    { name: 'Marifat darslari', href: '/enlightenment', icon: <University /> },
    { name: 'Tavsiya qilingan modullar', href: '/recommended', icon: <AlignStartVertical /> },
    { name: 'Yangiliklar', href: '/news', icon: <Newspaper /> },
    { name: 'Sertifikatlar', href: '/certificates', icon: <Trophy /> },
    { name: 'Profil', href: '/profile', icon: <UserRound /> },
  ];

  return (
    <aside className='fixed h-screen w-68 border-r border-white bg-white'>
      <div className='mx-[18px] my-[15px] flex h-16 items-center justify-center gap-[6px]'>
        <img src={logo} alt='Logo' />
        <h3 className='text-[10px] !font-medium text-[#172243]'>
          MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI
        </h3>
      </div>
      <nav className='mt-9 space-y-1 px-4'>
        <NavLink
          to='/home'
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2 text-xl transition-all duration-100 hover:bg-[#F0F7FF] ${
              isActive ? 'ml-4 bg-[#F0F7FF] font-semibold text-[#172243]' : ''
            }`
          }
        >
          <House className='text-xl' />
          Bosh sahifa
        </NavLink>

        <div className='mt-4 space-y-2'>
          {otherNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 text-xl transition-all duration-100 hover:bg-[#F0F7FF] ${
                  isActive ? 'ml-4 bg-[#F0F7FF] font-semibold text-[#172243]' : ''
                }`
              }
            >
              <span className='text-xl'>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
