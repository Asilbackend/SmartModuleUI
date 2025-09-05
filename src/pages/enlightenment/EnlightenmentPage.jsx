import { modules } from '@/data/moduleData.js';

export default function ModuleList() {
  const mod = modules.find((m) => m.id === 1);

  return (
    <div className='py-3 sm:px-4 sm:py-6 md:px-8'>
      <div className='mb-4 rounded-2xl bg-white p-4 shadow-sm sm:mb-6 sm:p-6'>
        <h2 className='mb-4 text-2xl font-semibold'>Modullar video va matnlardan iborat.</h2>
        <p className='text-gray-700'>
          Har bir modulda bo‘limlar, bo‘limlarda esa darslar ketma-ketlikda.
        </p>
      </div>

      {mod.sections.map((section) => (
        <div key={section.id} className='mb-8 rounded-2xl bg-white p-4 shadow-sm sm:p-6'>
          <h2 className='mb-4 text-2xl font-semibold text-blue-900'>
            {section.id}. {section.title}
          </h2>
          {section.items.map((item) => (
            <div key={item.id} className='mb-2 flex items-center justify-between gap-1'>
              <div className='flex flex-col'>
                <h3 className='text-[16px]'>{item.title}</h3>
                <div className='flex gap-2 text-gray-500'>
                  <p className='text-sm'>{item.type}</p>
                  <p className='text-sm'>{item.duration}</p>
                </div>
              </div>
              <button className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
                Ko‘rish
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
