import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Empty, Spin } from 'antd';
import { ArrowLeftToLine, BookCheck, ChevronDown, House, Layers, UserRound } from 'lucide-react';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllModules } from 'src/api/modules.api';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const contentRef = useRef(null);

  const otherNavItems = [
    { name: 'Bosh sahifa', href: '/home', icon: <House size={20} /> },
    { name: 'Marifat darslari', href: '/enlightenment', icon: <BookCheck size={20} /> },
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
    <aside
      className={`h-screen border-r border-gray-100 bg-white shadow-sm transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <nav className='space-y-2 p-3 sm:p-4'>
        {/* Toggle Button */}
        <div className='mb-4 flex justify-start'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='group flex items-center justify-center rounded-xl p-2.5 text-gray-700 transition-all hover:bg-[#F0F7FF] hover:text-blue-600'
          >
            <ArrowLeftToLine
              size={20}
              className={`transition-transform duration-300 ${!isOpen && 'rotate-180'}`}
            />
          </button>
        </div>

        {/* Navigation Items */}
        <div className='space-y-1'>
          {otherNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#F0F7FF] text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator */}
                  {isActive && isOpen && (
                    <div className='absolute left-0 h-8 w-1 rounded-r-full bg-blue-600' />
                  )}

                  <span className={`flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`}>
                    {item.icon}
                  </span>

                  <p
                    className={`overflow-hidden font-medium whitespace-nowrap transition-all duration-300 ${
                      isOpen
                        ? 'max-w-[200px] translate-x-0 opacity-100'
                        : 'max-w-0 -translate-x-4 opacity-0'
                    }`}
                  >
                    {item.name}
                  </p>
                </>
              )}
            </NavLink>
          ))}

          {/* Modullar Section */}
          <div className='relative pt-2'>
            <button
              onClick={() => setIsModulesOpen(!isModulesOpen)}
              className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                isModulesOpen
                  ? 'bg-[#F0F7FF] text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Layers
                size={20}
                className={`flex-shrink-0 ${isModulesOpen ? 'text-blue-600' : ''}`}
              />

              <p
                className={`overflow-hidden font-medium whitespace-nowrap transition-all duration-300 ${
                  isOpen
                    ? 'max-w-[200px] translate-x-0 opacity-100'
                    : 'max-w-0 -translate-x-4 opacity-0'
                }`}
              >
                Modullar
              </p>

              {isOpen && (
                <ChevronDown
                  size={18}
                  className={`ml-auto transition-transform duration-300 ${
                    isModulesOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {/* Modules Accordion - Open Sidebar */}
            {isOpen && (
              <div
                ref={contentRef}
                style={{
                  height: isModulesOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                  maxHeight: isModulesOpen ? '400px' : '0px',
                }}
                className='custom-scroll overflow-hidden overflow-y-auto transition-all duration-300'
              >
                <div className='space-y-1 py-2'>
                  {/* Loading State */}
                  {isPending && (
                    <div className='flex justify-center py-4'>
                      <Spin indicator={<LoadingOutlined spin />} size='small' />
                    </div>
                  )}

                  {/* Error State */}
                  {error && (
                    <div className='rounded-lg bg-red-50 px-3 py-2'>
                      <p className='text-xs text-red-600 sm:text-sm'>Xatolik yuz berdi</p>
                    </div>
                  )}

                  {/* Empty State */}
                  {!isPending && !error && modules.length === 0 && (
                    <div className='py-4'>
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={
                          <span className='text-xs text-gray-500'>Modullar topilmadi</span>
                        }
                      />
                    </div>
                  )}

                  {/* Modules List */}
                  {!isPending &&
                    !error &&
                    modules.length > 0 &&
                    modules.map((mod) => (
                      <NavLink
                        key={mod.id}
                        state={{ title: mod.name, desc: mod.description }}
                        to={`/modules/${mod.id}`}
                        className={({ isActive }) =>
                          `group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                            isActive
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`
                        }
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
            )}

            {/* Modules Popup - Closed Sidebar */}
            {!isOpen && isModulesOpen && (
              <div className='absolute top-2 left-full z-50 ml-5 w-48 rounded-xl border border-gray-200 bg-white shadow-xl'>
                <div className='p-3'>
                  <div className='mb-3 flex items-center justify-between border-b border-gray-100 pb-2'>
                    <h3 className='text-sm font-semibold text-gray-900'>Modullar</h3>
                    <button
                      onClick={() => setIsModulesOpen(false)}
                      className='rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600'
                    >
                      <svg
                        className='h-4 w-4'
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path d='M6 18L18 6M6 6l12 12'></path>
                      </svg>
                    </button>
                  </div>

                  <div className='custom-scroll max-h-96 space-y-1 overflow-y-auto'>
                    {/* Loading State */}
                    {isPending && (
                      <div className='flex justify-center py-4'>
                        <Spin indicator={<LoadingOutlined spin />} size='small' />
                      </div>
                    )}

                    {/* Error State */}
                    {error && (
                      <div className='rounded-lg bg-red-50 px-3 py-2'>
                        <p className='text-xs text-red-600'>Xatolik yuz berdi</p>
                      </div>
                    )}

                    {/* Empty State */}
                    {!isPending && !error && modules.length === 0 && (
                      <div className='py-4'>
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={
                            <span className='text-xs text-gray-500'>Modullar topilmadi</span>
                          }
                        />
                      </div>
                    )}

                    {/* Modules List */}
                    {!isPending &&
                      !error &&
                      modules.length > 0 &&
                      modules.map((mod) => (
                        <NavLink
                          key={mod.id}
                          to={`/modules/${mod.id}`}
                          state={{ title: mod.name, desc: mod.description }}
                          onClick={() => setIsModulesOpen(false)}
                          className={({ isActive }) =>
                            `group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                              isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <Checkbox
                                checked={isActive}
                                className='my-custom-checkbox pointer-events-none flex-shrink-0'
                              />
                              <span className='truncate font-medium'>{mod.name}</span>
                            </>
                          )}
                        </NavLink>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profil */}
          <div className='border-t border-gray-100 pt-2'>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#F0F7FF] text-blue-600 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && isOpen && (
                    <div className='absolute left-0 h-8 w-1 rounded-r-full bg-blue-600' />
                  )}

                  <UserRound
                    size={20}
                    className={`flex-shrink-0 ${isActive ? 'text-blue-600' : ''}`}
                  />

                  <p
                    className={`overflow-hidden font-medium whitespace-nowrap transition-all duration-300 ${
                      isOpen
                        ? 'max-w-[200px] translate-x-0 opacity-100'
                        : 'max-w-0 -translate-x-4 opacity-0'
                    }`}
                  >
                    Profil
                  </p>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
