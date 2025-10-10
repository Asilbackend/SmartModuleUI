import { Steps } from 'antd';
import { BookOpenText, TvMinimalPlay } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
      <div className='mb-4 rounded-2xl bg-[#008CFF0A] p-4 sm:mb-6 sm:p-6'>
        <h2 className='mb-4 text-2xl font-semibold'>Modullar video va matnlardan iborat.</h2>
        <p className='text-gray-700'>
          Har bir modulda bo‘limlar, bo‘limlarda esa darslar ketma-ketlikda.
        </p>
      </div>

      {mod.sections.map((section) => (
        <div key={section.id} className='mb-8 rounded-2xl bg-white p-4 shadow-sm sm:p-6'>
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold text-blue-900'>
              {section.id}. {section.title}
            </h2>
            <span className='rounded-2xl bg-[#FF00001A] px-4 py-0.5 text-[#FF0000]'>
              {section.type}
            </span>
          </div>

          <Steps
            direction='vertical'
            current={currentSteps[section.id]}
            items={section.items.map((item, index) => ({
              // title: item.title,
              description: (
                <div className='mb-2 flex items-center justify-between gap-1'>
                  <div className='flex items-start gap-3'>
                    <div className='min-w-[30px]'>
                      {item.type === 'video' ? (
                        <TvMinimalPlay size={32} />
                      ) : (
                        <BookOpenText size={32} />
                      )}
                    </div>
                    <div className='flex max-w-[200px] flex-col md:max-w-full'>
                      <h3 className='line-clamp-2 text-[16px] md:text-[20px]'>{item.text}</h3>
                      <div className='flex gap-2 text-gray-500'>
                        <p className='text-[16px]'>{item.type}</p>
                        <p className='text-[16px]'>{item.duration}</p>
                      </div>
                    </div>
                  </div>
                  {index == currentSteps[section.id] && (
                    <button
                      onClick={() => handleStepClick(section.id, index, item)}
                      className='cursor-pointer rounded-lg bg-blue-600 px-5.5 py-2 text-white hover:bg-blue-700'
                    >
                      Boshlash
                    </button>
                  )}
                  {index < currentSteps[section.id] && (
                    <button
                      onClick={() => handleStepClick(section.id, index, item)}
                      className='cursor-pointer rounded-lg bg-[#F0F7FF] px-3 py-2 text-[#008CFF]'
                    >
                      Tugallangan
                    </button>
                  )}
                </div>
              ),
            }))}
          />
        </div>
      ))}

      <Link to={`/modules/${mod.id}/test`}>
        <button className='mb-12 w-full cursor-pointer rounded-xl bg-[#008CFF] px-5.5 py-3 text-lg font-semibold text-white'>
          O‘zingizni sinab ko’ring
        </button>
      </Link>
    </div>
  );
}
