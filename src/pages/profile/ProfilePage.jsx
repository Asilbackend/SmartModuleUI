import { Button, Flex, Progress } from 'antd';
import { Check, Eye, X } from 'lucide-react';
import { useState } from 'react';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const student = {
    ism: 'Abubakir',
    familiya: 'Yoqubjonov',
    yonalish: 'Suniy Intelekt',
    oqishTili: 'Uz',
    kurs: 2,
    guruh: '261-23',
    daraja: 'Bakalavr',
    talimShakli: 'Kunduzgi',
    stipendiya: 'Yo‘q',
  };

  const leftInfo = [
    { label: 'Ism', value: student.ism },
    { label: 'Familiya', value: student.familiya },
    { label: 'Yo’nalish', value: student.yonalish },
    { label: 'O’qish tili', value: student.oqishTili },
    { label: 'Kurs', value: student.kurs },
    { label: 'Guruh', value: student.guruh },
  ];

  const rightInfo = [
    { label: 'Darajasi', value: student.daraja },
    { label: 'Ta’lim shakli', value: student.talimShakli },
    { label: 'Stipendiya', value: student.stipendiya },
  ];

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='gap-4 sm:gap-6 md:gap-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12'>
          {/* Video Block */}
          <div className='rounded-3xl bg-white shadow-xs lg:col-span-5'>
            <video
              controls
              poster='/news-image.png'
              className='mx-auto mb-4 h-auto w-full rounded-3xl object-cover md:h-[280px]'
            >
              <source src='./123.mp4' type='video/mp4' />
              Sizning browser videoni qo‘llab-quvvatlamaydi.
            </video>
            <div className='px-4 pb-4'>
              <h3 className='mb-2 text-xl font-bold text-[#013464] md:text-2xl'>
                Digital Science jurnali endi TATUda
              </h3>
              <p>
                TATUda yangi ilmiy jurnal - Digital Science chop etilmoqda. Unda talabalar va
                o‘qituvchilar o‘z maqolalari bilan qatnashishlari mumkin.
              </p>
            </div>
          </div>

          {/* Info Block */}
          <div className='rounded-3xl bg-white p-2 shadow-xs lg:col-span-7'>
            <div className='flex flex-col rounded-lg md:flex-row'>
              <div className='flex items-center justify-center p-2 sm:p-4 md:w-1/3'>
                <img
                  src='./image.png'
                  alt='Talaba rasmi'
                  className='w-full rounded-lg object-cover md:h-60'
                />
              </div>
              <div className='p-2 md:w-2/3'>
                <div className='grid grid-cols-1 sm:gap-4 md:grid-cols-2'>
                  <div className='md:border-r md:pr-4'>
                    {leftInfo.map((item) => (
                      <p key={item.label} className='py-1 md:text-base'>
                        <span className='font-semibold'>{item.label}:</span> {item.value}
                      </p>
                    ))}
                  </div>
                  <div className='md:pl-4'>
                    {rightInfo.map((item) => (
                      <p key={item.label} className='py-1 md:text-base'>
                        <span className='font-semibold'>{item.label}:</span> {item.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-span-12 md:col-span-6 lg:col-span-7'>
          {/* Card 1 */}
          <div className='mt-4 rounded-2xl bg-white px-4 pt-4 pb-6 shadow-xs md:mt-8'>
            <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-start'>
              <div className='flex-1'>
                <h2 className='mb-2 text-xl font-semibold md:text-2xl'>
                  1. Universitet tarixi va tashkiliy tuzilmasi (Required)
                </h2>
                <p className='text-base md:text-lg'>
                  Universitetning istiqbolli yo’nalishlari (Matn)
                </p>
              </div>
              <div className='flex flex-col items-start gap-2 md:ml-auto md:items-end'>
                <Button
                  type='primary'
                  icon={<Check strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                  ghost
                >
                  Tugallangan
                </Button>
                <Button
                  onClick={handleClick}
                  type='primary'
                  icon={<Eye strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                >
                  Sertifikatni ko‘rish
                </Button>
              </div>
            </div>
            <Flex gap='small' vertical>
              <Progress
                percent={60}
                percentPosition={{ align: 'center', type: 'inner' }}
                style={{ width: '100%' }}
                strokeWidth={20}
                strokeColor='#008CFF'
              />
            </Flex>
          </div>

          {/* Card 2 */}
          <div className='mt-4 rounded-2xl bg-white px-4 pt-4 pb-6 shadow-xs md:mt-8'>
            <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-start'>
              <div className='flex-1'>
                <h2 className='mb-2 text-xl font-semibold md:text-2xl'>
                  2. Universitet tarixi va tashkiliy tuzilmasi (Required)
                </h2>
                <p className='text-base md:text-lg'>
                  Universitetning istiqbolli yo’nalishlari (Matn)
                </p>
              </div>
              <div className='flex flex-col items-start gap-2 md:ml-auto md:items-end'>
                <Button
                  type='primary'
                  icon={<Check strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                  ghost
                >
                  Tugallangan
                </Button>
                <Button
                  onClick={handleClick}
                  type='primary'
                  icon={<Eye strokeWidth={1.5} />}
                  size='large'
                  iconPosition='end'
                >
                  Sertifikatni ko‘rish
                </Button>
              </div>
            </div>
            <Flex gap='small' vertical>
              <Progress
                percent={80}
                percentPosition={{ align: 'center', type: 'inner' }}
                style={{ width: '100%' }}
                strokeWidth={20}
                strokeColor='#008CFF'
              />
            </Flex>
          </div>
        </div>

        {isOpen && (
          <div className='bg-opacity-80 fixed inset-0 z-70 flex items-center justify-center bg-gradient-to-b from-gray-800 to-blue-700'>
            <X
              size={40}
              strokeWidth={1}
              className='absolute top-10 right-5 cursor-pointer text-white sm:top-20 sm:right-20'
              onClick={handleClose}
            />
            <img src='/sertifikat.png' className='w-[90%] max-w-4xl select-none sm:w-[80%]' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
