import { Checkbox } from 'antd';
import { ArrowLeftToLine, ChevronDown, House, Layers, University, UserRound } from 'lucide-react';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const contentRef = useRef(null);

  const otherNavItems = [
    { name: 'Bosh sahifa', href: '/home', icon: <House /> },
    { name: 'Marifat darslari', href: '/enlightenment', icon: <University /> },
  ];

  const moduleSubItems = [
    { name: 'Modul 1', id: 1 },
    { name: 'Modul 2', id: 2 },
    { name: 'Modul 3', id: 3 },
    { name: 'Modul 4', id: 4 },
  ];

  return (
    <aside className={`h-screen duration-200 ${isOpen ? 'w-64' : 'w-20'}`}>
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
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'max-w-[200px] translate-x-0 opacity-100'
                    : 'max-w-0 -translate-x-4 opacity-0'
                } `}
              >
                {item.name}
              </p>
            </NavLink>
          ))}

          {/* Modullar */}
          <div>
            <button
              onClick={() => setIsModulesOpen(!isModulesOpen)}
              className='group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xl transition hover:bg-[#F0F7FF]'
            >
              <span className='text-xl'>
                <Layers />
              </span>
              <p
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  isOpen
                    ? 'max-w-[200px] translate-x-0 opacity-100'
                    : 'max-w-0 -translate-x-4 opacity-0'
                }`}
              >
                Modullar
              </p>
              {isOpen && (
                <ChevronDown
                  className={`ml-auto transition-transform duration-200 ${isModulesOpen ? 'rotate-180' : ''}`}
                  size={20}
                />
              )}
            </button>

            {/* Smooth Accordion */}
            <div
              ref={contentRef}
              style={{
                height: isModulesOpen && isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
              }}
              className='overflow-hidden transition-all duration-300 ease-in-out'
            >
              <div className='space-y-2 pt-1'>
                {moduleSubItems.map((sub) => (
                  <NavLink
                    key={sub.id}
                    to={`/modules/${sub.id}`}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-4 py-2 text-base transition hover:bg-[#F0F7FF] ${
                        isActive ? 'bg-[#F0F7FF] shadow-xs' : ''
                      }`
                    }
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

          {/* Profil */}
          <div className={`flex items-center justify-between gap-2 ${!isOpen && 'flex-col gap-4'}`}>
            <NavLink
              to={'/profile'}
              className={({ isActive }) =>
                `group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xl transition hover:bg-[#F0F7FF] ${
                  isActive ? `${isOpen && 'ml-4'} bg-[#F0F7FF] shadow-xs` : ''
                }`
              }
            >
              <span className='text-xl'>
                <UserRound />
              </span>
              <p
                className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                  isOpen
                    ? 'max-w-[200px] translate-x-0 opacity-100'
                    : 'max-w-0 -translate-x-4 opacity-0'
                }`}
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
