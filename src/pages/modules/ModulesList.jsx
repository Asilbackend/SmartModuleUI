import { Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { modules } from '../../data/moduleData';

export default function ModuleList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mod = modules.find((m) => m.id === Number(id));

  const STORAGE_KEY = `module_steps_${mod?.id}`; // `mod` bo‘lishi shart emas

  const [currentSteps, setCurrentSteps] = useState({});

  useEffect(() => {
    if (!mod) return; // hook ichida tekshiriladi
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCurrentSteps(JSON.parse(saved));
    } else {
      const initial = mod.sections.reduce((acc, section) => {
        acc[section.id] = 0;
        return acc;
      }, {});
      setCurrentSteps(initial);
    }
  }, [STORAGE_KEY, mod]);

  if (!mod) return <div className='p-8'>Modul topilmadi</div>;
  const handleStepClick = (sectionId, index, item) => {
    // Faqat navbatdagi stepni bosilganda currentSteps yangilanadi
    if (index === currentSteps[sectionId]) {
      const updated = { ...currentSteps, [sectionId]: currentSteps[sectionId] + 1 };
      setCurrentSteps(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    // Har holda sahifaga o‘tadi
    navigate(`/modules/${mod.id}/video/${item.id}`);
  };

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

          <Steps
            direction='vertical'
            current={currentSteps[section.id]}
            items={section.items.map((item, index) => ({
              // title: item.title,
              description: (
                <div className='mb-2 flex items-center justify-between gap-1'>
                  <div className='flex flex-col'>
                    <h3 className='text-[16px]'>{item.title}</h3>
                    <div className='flex gap-2 text-gray-500'>
                      <p className='text-sm'>{item.type}</p>
                      <p className='text-sm'>{item.duration}</p>
                    </div>
                  </div>
                  {index <= currentSteps[section.id] && (
                    <button
                      onClick={() => handleStepClick(section.id, index, item)}
                      className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                    >
                      Ko‘rish
                    </button>
                  )}
                </div>
              ),
            }))}
          />
        </div>
      ))}
    </div>
  );
}
