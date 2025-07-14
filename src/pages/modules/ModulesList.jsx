import { Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { modules } from '../../data/moduleData';

export default function ModuleList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mod = modules.find((m) => m.id === Number(id));

  if (!mod) return <div className='p-8'>Modul topilmadi</div>;

  const STORAGE_KEY = `module_steps_${mod.id}`;
  const [currentSteps, setCurrentSteps] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCurrentSteps(JSON.parse(saved));
    } else {
      const initial = mod.sections.reduce((acc, section) => {
        acc[section.id] = 0; // faqat birinchi step ochiq
        return acc;
      }, {});
      setCurrentSteps(initial);
    }
  }, [id]);

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
    <div className='px-8 py-6'>
      <div className='mb-6 rounded-2xl bg-white p-6 shadow-sm'>
        <h2 className='mb-4 text-2xl font-semibold'>Modullar video va matnlardan iborat.</h2>
        <p className='text-gray-700'>
          Har bir modulda bo‘limlar, bo‘limlarda esa darslar ketma-ketlikda.
        </p>
      </div>

      {mod.sections.map((section) => (
        <div key={section.id} className='mb-8 rounded-2xl bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-2xl font-semibold text-blue-900'>
            {section.id}. {section.title}
          </h2>

          <Steps
            direction='vertical'
            current={currentSteps[section.id]}
            items={section.items.map((item, index) => ({
              title: item.title,
              description: (
                <div className='flex items-center justify-between'>
                  <div className='flex gap-2 text-gray-500'>
                    <p className='text-sm'>{item.type}</p>
                    <p className='text-sm'>{item.duration}</p>
                  </div>
                  {/* 🔑 Qoidani shu yerda tekshiramiz:
                        - Agar step index <= current => tugma ko‘rinadi
                        - Faqat keyingi step tugmasi ko‘rinmaydi */}
                  {index <= currentSteps[section.id] && (
                    <button
                      onClick={() => handleStepClick(section.id, index, item)}
                      className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
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
