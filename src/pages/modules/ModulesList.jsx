import { useQuery } from '@tanstack/react-query';
import { Steps } from 'antd';
import { BookOpenText, TvMinimalPlay } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getModuleById } from 'src/api/modules.api';

export default function ModuleList() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isPending, error } = useQuery({
    queryKey: ['module-content', id],
    queryFn: async () => {
      const res = await getModuleById(id);
      return res.data || [];
    },
    enabled: !!id,
  });

  const moduleData = data || [];

  // 2️⃣ Step progressni saqlash uchun localStorage kaliti
  const STORAGE_KEY = `module_steps_${id}`;
  const [currentSteps, setCurrentSteps] = useState({});

  // 3️⃣ Boshlang‘ich qiymatni localStorage yoki API dan olish
  useEffect(() => {
    if (!moduleData.length) return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCurrentSteps(JSON.parse(saved));
    } else {
      // Har bir section uchun 0-dan boshlaymiz
      const initial = moduleData.reduce((acc, section) => {
        acc[section.contentId] = 0;
        return acc;
      }, {});
      setCurrentSteps(initial);
    }
  }, [moduleData, STORAGE_KEY]);

  const handleStepClick = (sectionId, index, item) => {
    if (index === currentSteps[sectionId]) {
      const updated = { ...currentSteps, [sectionId]: currentSteps[sectionId] + 1 };
      setCurrentSteps(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    navigate(`/modules/${id}/video/${item.attachmentId}`);
  };

  if (isPending) return <div className='p-8 text-lg'>Yuklanmoqda...</div>;
  if (error) return <div className='p-8 text-red-500'>Xatolik: {error.message}</div>;
  if (!moduleData.length) return <div className='p-8'>Ma’lumot topilmadi</div>;
  const { title, desc } = location.state || {};

  return (
    <div className='py-3 sm:px-4 sm:py-6 md:px-8'>
      <div className='mb-4 rounded-2xl bg-[#008CFF0A] p-4 sm:mb-6 sm:p-6'>
        <h2 className='mb-4 text-2xl font-semibold'>{title}</h2>
        <p className='text-gray-700'>{desc}</p>
      </div>

      {moduleData.map((section, i) => (
        <div key={section.contentId} className='mb-8 rounded-2xl bg-white p-4 shadow-sm sm:p-6'>
          <div className='mb-8 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold text-blue-900'>
              {i + 1}. {section.contentTitle}
            </h2>
            <span className='rounded-2xl bg-[#FF00001A] px-4 py-0.5 text-[#FF0000]'>
              {section.isRequiredContent ? 'Majburiy' : 'Ixtiyoriy'}
            </span>
          </div>

          <Steps
            direction='vertical'
            current={currentSteps[section.contentId]}
            items={section.attachmentDetails.map((item, index) => ({
              description: (
                <div className='mb-2 flex items-center justify-between gap-1'>
                  <div className='flex items-start gap-3'>
                    <div className='min-w-[30px]'>
                      {item.contentType === 'VIDEO' ? (
                        <TvMinimalPlay size={32} />
                      ) : (
                        <BookOpenText size={32} />
                      )}
                    </div>
                    <div className='flex max-w-[200px] flex-col md:max-w-full'>
                      <h3 className='line-clamp-2 text-[16px] md:text-[20px]'>{item.title}</h3>
                      <div className='flex gap-2 text-gray-500'>
                        <p className='text-[16px]'>{item.contentType}</p>
                        {item.videoDuration && <p className='text-[16px]'>{item.videoDuration}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Step tugmasi */}
                  {index === currentSteps[section.contentId] && (
                    <button
                      onClick={() => handleStepClick(section.contentId, index, item)}
                      className='cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700'
                    >
                      Boshlash
                    </button>
                  )}
                  {index < currentSteps[section.contentId] && (
                    <button
                      onClick={() => handleStepClick(section.contentId, index, item)}
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

      <Link to={`/modules/${id}/test`}>
        <button className='mb-12 w-full cursor-pointer rounded-xl bg-[#008CFF] px-5.5 py-3 text-lg font-semibold text-white'>
          O‘zingizni sinab ko’ring
        </button>
      </Link>
    </div>
  );
}
