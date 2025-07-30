import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import MyCustomPlayer from '@/components/ui/CustomPlayer';

const NewsList = () => {
  const navigate = useNavigate(); // `useNavigate` ni chaqirasan

  const handleClose = () => {
    navigate(-1); // Bu tarixda bir qadam orqaga qaytaradi
  };

  return (
    <div className='mx-auto grid max-w-6xl grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6'>
      <div className='bg-opacity-80 fixed inset-0 z-70 flex items-center justify-center bg-gradient-to-b from-gray-800 to-blue-800'>
        <X
          size={40}
          strokeWidth={1}
          className='absolute top-2 right-3 cursor-pointer text-white sm:top-5 sm:right-10 md:top-15 md:right-30'
          onClick={handleClose}
        />
        <MyCustomPlayer />
      </div>
    </div>
  );
};

export default NewsList;
