import { Checkbox } from 'antd';
import { ArrowLeftToLine, ChevronDown, House, Layers, University, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllMoudles } from 'src/api/modules.api';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const contentRef = useRef(null);
  const [modules, setModules] = useState([]); // ✅ Bo'sh array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const otherNavItems = [
    { name: 'Bosh sahifa', href: '/home', icon: <House /> },
    { name: 'Marifat darslari', href: '/enlightenment', icon: <University /> },
  ];

  // ✅ Modullarni yuklash
  async function fetchModules() {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllMoudles();

      console.log('API Response:', response.data);

      // API response: { content: [...], pageable: {...} }
      if (response.data?.content && Array.isArray(response.data.content)) {
        setModules(response.data.content);
      } else {
        console.error('Unexpected API response format:', response.data);
        setModules([]);
      }
    } catch (error) {
      console.error('Error fetching modules:', error);
      setError(error.message);
      setModules([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchModules();
  }, []);

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

            {/* Katta holatda accordion */}
            {isOpen && (
              <div
                ref={contentRef}
                style={{
                  height: isModulesOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                }}
                className='overflow-hidden transition-all duration-300 ease-in-out'
              >
                <div className='space-y-2 pt-1'>
                  {/* ✅ Loading holati */}
                  {loading && <p className='px-4 py-2 text-sm text-gray-500'>Yuklanmoqda...</p>}

                  {/* ✅ Error holati */}
                  {error && <p className='px-4 py-2 text-sm text-red-500'>Xatolik: {error}</p>}

                  {/* ✅ Modullarni ko'rsatish */}
                  {!loading && !error && modules.length === 0 && (
                    <p className='px-4 py-2 text-sm text-gray-500'>Modullar topilmadi</p>
                  )}

                  {!loading &&
                    !error &&
                    modules.length > 0 &&
                    modules.map((mod) => (
                      <NavLink
                        key={mod.id}
                        to={`/modules/${mod.id}`}
                        className={({ isActive }) =>
                          `flex items-center gap-2 rounded-lg px-4 py-2 text-base transition hover:bg-[#F0F7FF] ${
                            isActive ? 'bg-[#F0F7FF] shadow-xs' : ''
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Checkbox checked={isActive} className='my-custom-checkbox' />
                            <span>{mod.name || mod.title || `Modul ${mod.id}`}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                </div>
              </div>
            )}

            {/* Kichik holatda oddiy ID list */}
            {!isOpen && isModulesOpen && (
              <div className='space-y-2 pt-1'>
                {modules.map((mod) => (
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
                ))}
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
