import 'react';

import { Link } from 'react-router-dom';

const Contents = () => {
  const modules = [
    {
      id: 1,
      category: 'Universitet ichki qoidalari',
      items: [
        { id: 1, title: 'Video: Unvertitet qoidalari', duration: '3-min' },
        { id: 2, title: 'Video: Unvertitet qoidalari', duration: '3-min' },
        { id: 3, title: 'Video: Unvertitet qoidalari', duration: '3-min' },
      ],
    },
    {
      id: 2,
      category: 'Universitet ichki qoidalari',
      items: [
        { id: 4, title: 'Video: Unvertitet qoidalari', duration: '3-min' },
        { id: 5, title: 'Video: Unvertitet qoidalari', duration: '3-min' },
        { id: 6, title: 'Video: Unvertitet qoidalari', duration: '3-min' },
      ],
    },
    {
      id: 3,
      category: 'Universitet ichki qoidalari',
      items: [{ id: 7, title: 'Video: Unvertitet qoidalari', duration: '3-min' }],
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='mb-6 rounded-lg bg-white p-6 shadow-md'>
        <h1 className='text-xl font-bold text-gray-900'>
          Modul/Modul 1: Universitet ichki tartib qoidalari
        </h1>
        <p className='mt-2 text-sm text-gray-600'>
          Mazmuni: Dars jadvali, baholash tizimi, imtihon qoidalari, kredit tizimi, dars o‘qirish va
          akademik intizom haqida ma’lumotlar.
        </p>
      </div>

      <div className='mb-6 rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-lg font-semibold text-gray-900'>Majburiy</h2>
        {modules.map((module) => (
          <div key={module.id} className='mb-6'>
            <h3 className='text-md mb-2 font-medium text-gray-800'>{module.category}</h3>
            {module.items.map((item) => (
              <div
                key={item.id}
                className='flex items-center justify-between border-b border-gray-200 py-2'
              >
                <div className='flex items-center space-x-2'>
                  {/* Placeholder for icon (e.g., play button) - Use Unicode or replace with an icon library */}
                  <span role='img' aria-label='play' className='text-blue-500'>
                    ▶
                  </span>
                  <span className='text-sm text-gray-700'>{item.title}</span>
                </div>
                <span className='text-xs text-gray-500'>{item.duration}</span>
                <Link
                  to={`/module/${item.id}`}
                  className='ml-4 rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600'
                >
                  Boshlash
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
