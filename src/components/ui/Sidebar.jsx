import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Spin } from 'antd';
import { ArrowLeftToLine, BookCheck, ChevronDown, House, Layers, UserRound } from 'lucide-react';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllModules } from 'src/api/modules.api';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const contentRef = useRef(null);

  const otherNavItems = [
    { name: 'Bosh sahifa', href: '/home', icon: <House /> },
    { name: 'Marifat darslari', href: '/enlightenment', icon: <BookCheck /> },
  ];

  const { data, isPending, error } = useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const response = await getAllModules();
      return response.data.content || [];
    },
  });

  const modules = data || [];

  return (
    <aside className={`h-screen duration-200 ${isOpen ? 'w-64' : 'w-20'}`}>
      <nav className='space-y-3 px-4 pt-4'>
        <div className='mt-2 space-y-4'>
          <div className='w-max rounded-xl px-3 py-2 text-xl transition hover:bg-[#F0F7FF]'>
            <ArrowLeftToLine
              className={`cursor-pointer duration-100 ${!isOpen && 'rotate-180'}`}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

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
              className='group relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-xl transition hover:bg-[#F0F7FF]'
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

            {/* Katta holatda accordion */}
            {isOpen && (
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
            )}

            {!isOpen && isModulesOpen && (
              <div className='space-y-2 pt-1'>
                {isPending ? (
                  <p className='text-center text-sm'>...</p>
                ) : (
                  modules.map((mod) => (
                    <NavLink
                      key={mod.id}
                      to={`/modules/${mod.id}`}
                      onClick={() => setIsModulesOpen(false)}
                      className={({ isActive }) =>
                        `text-md flex items-center justify-center rounded-lg py-1 transition hover:bg-[#F0F7FF] ${
                          isActive ? 'bg-[#F0F7FF] shadow-xs' : ''
                        }`
                      }
                    >
                      {mod.id}
                    </NavLink>
                  ))
                )}
              </div>
            )}
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
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
