import { Dropdown, Input } from 'antd';
import { Bell } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const items = [
  { key: 'uz', label: 'UZ' },
  { key: 'ru', label: 'RU' },
  { key: 'en', label: 'EN' },
];

const Header = () => {
  const [selectedLang, setSelectedLang] = useState('UZ');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLang(selectedItem.label);
    }
    setDropdownOpen(false);
  };

  return (
    <header className='w-full bg-white py-6'>
      <div className='px-12'>
        <div className='flex h-full items-center justify-between'>
          <Input
            size='large'
            placeholder='Qidiruv'
            prefix={<FiSearch size={22} color='#ACACAC' className='mx-1' />}
            className='mx-auto !w-[600px] !rounded-3xl !border-none !bg-[#F0F7FF] !py-[10px]'
          />

          <div className='flex items-center justify-center gap-[20px]'>
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              placement='bottomRight'
              open={dropdownOpen}
              onOpenChange={(visible) => setDropdownOpen(visible)}
              trigger={['click']}
            >
              <div className='flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300'>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
